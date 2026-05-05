import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICapturePayment, YooCheckout } from '@a2seven/yoo-checkout';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment.status.dto';
import { EnumOrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  private readonly checkout: YooCheckout;
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const shopId = this.configService.get<string>('YOUKASSA_SHOP_ID');
    const secretKey = this.configService.get<string>('YOUKASSA_SECRET_KEY');
    if (!shopId || !secretKey) {
      throw new Error('YooKassa credentials are not configured');
    }
    this.checkout = new YooCheckout({ shopId, secretKey });
  }

  async createOrder(dto: OrderDto, userId: string) {
    if (!dto.items || dto.items.length === 0) {
      throw new Error('Order items are required');
    }

    const productIds = dto.items.map((i) => i.productId);
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        price: true,
        storeId: true,
      },
    });

    if (products.length !== productIds.length) {
      throw new Error('Some products were not found');
    }

    const storeId = products[0]?.storeId;
    if (!storeId) {
      throw new Error('storeId is missing for product');
    }

    const hasDifferentStore = products.some((p) => p.storeId !== storeId);
    if (hasDifferentStore) {
      throw new Error('All order items must belong to the same store');
    }

    const productById = new Map(products.map((p) => [p.id, p]));

    const orderItem = dto.items.map((item) => {
      const product = productById.get(item.productId);
      if (!product) {
        throw new Error('Product not found: ' + item.productId);
      }
      return {
        quantity: item.quantity,
        price: product.price,
        product: {
          connect: {
            id: item.productId,
          },
        },
      };
    });

    const total = dto.items.reduce((sum, item) => {
      const product = productById.get(item.productId);
      if (!product) return sum;
      return sum + product.price * item.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: {
        total,
        delivery: dto.delivery,
        store: {
          connect: {
            id: storeId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        items: {
          create: orderItem,
        },
      },
    });

    const payment = await this.checkout.createPayment({
      amount: {
        value: total,
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: (() => {
          const clientUrl = this.configService
            .get<string>('CLIENT_URL')
            ?.replace(/\/$/, '');
          return clientUrl
            ? `${clientUrl}/thanks`
            : 'http://localhost:3000/thanks';
        })(),
      },
      description: 'Order #' + order.id,
    });

    return payment;
  }
  async updateStatus(dto: PaymentStatusDto) {
    if (dto.event === 'payment.waiting_for_capture') {
      const capturePayment: ICapturePayment = {
        amount: {
          value: dto.object.amount.value,
          currency: dto.object.amount.currency,
        },
      };
      const result = await this.checkout.capturePayment(
        dto.object.id,
        capturePayment,
      );
      return result;
    }
    if (dto.event === 'payment.succeeded') {
      const description = dto.object.description;
      const match = description?.match(/Order #(.+)/);
      const orderId = match ? match[1] : description?.split('#')[1];
      if (!orderId) {
        throw new Error('Invalid order description');
      }
      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: EnumOrderStatus.PAYED },
      });
      return true;
    }
    return true;
  }
}
