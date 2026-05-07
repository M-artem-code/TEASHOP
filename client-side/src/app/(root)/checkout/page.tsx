'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { PUBLIC_URL } from '@/app/config/url.config'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { useProfile } from '@/hooks/useProfile'

import { orderService } from '@/services/order.service'

import { groupCartByStore, useCartStore } from '@/store/cart.store'

export default function CheckoutPage() {
	const { user, isLoading } = useProfile()
	const items = useCartStore(s => s.items)
	const clearStore = useCartStore(s => s.clearStore)

	const grouped = useMemo(() => groupCartByStore(items), [items])
	const storeIds = useMemo(() => Object.keys(grouped), [grouped])
	const [selectedStoreId, setSelectedStoreId] = useState<string>(
		storeIds[0] ?? ''
	)
	const [delivery, setDelivery] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const selectedItems = selectedStoreId
		? (grouped[selectedStoreId] ?? [])
		: []

	const storeTitle = selectedItems[0]?.product.store.title

	const total = selectedItems.reduce(
		(sum, i) => sum + i.price * i.quantity,
		0
	)

	const canCheckout =
		selectedItems.length > 0 && delivery.trim().length > 0 && !!user

	async function handleCheckout() {
		if (!user) {
			toast.error('Войдите, чтобы оформить заказ')
			return
		}
		if (!selectedStoreId) {
			toast.error('Выберите магазин')
			return
		}
		if (delivery.trim().length === 0) {
			toast.error('Укажите доставку')
			return
		}

		try {
			setIsSubmitting(true)
			const dto = {
				delivery,
				items: selectedItems.map(i => ({
					productId: i.product.id,
					quantity: i.quantity
				}))
			}

			const response = await orderService.checkout(dto)
			const confirmationUrl = response.data.confirmation?.confirmation_url
			if (!confirmationUrl) {
				throw new Error('Missing confirmation_url')
			}

			clearStore(selectedStoreId)
			window.location.href = confirmationUrl
		} catch (e: unknown) {
			const err = e as {
				response?: { data?: { message?: unknown; error?: unknown } }
				message?: unknown
			}
			const message =
				err?.response?.data?.message ||
				err?.response?.data?.error ||
				err?.message ||
				'Не удалось создать оплату'

			console.error('Checkout error:', err?.response?.data || err)
			toast.error(String(message))
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className='py-10'>
			<div className='container mx-auto px-4 max-w-3xl'>
				<Heading title='Оформление заказа' className='text-2xl mb-6' />

				{isLoading ? (
					<div className='text-sm text-muted-foreground'>
						Загрузка...
					</div>
				) : !user ? (
					<div className='rounded-lg border p-4'>
						<div className='text-sm mb-3'>
							Чтобы оплатить, нужно войти.
						</div>
						<Link href={PUBLIC_URL.auth()}>
							<Button>Войти</Button>
						</Link>
					</div>
				) : null}

				{storeIds.length > 1 && (
					<div className='mb-6'>
						<div className='text-sm mb-2 text-muted-foreground'>
							Магазин
						</div>
						<Select
							value={selectedStoreId}
							onValueChange={setSelectedStoreId}
						>
							<SelectTrigger>
								<SelectValue placeholder='Выберите магазин' />
							</SelectTrigger>
							<SelectContent>
								{storeIds.map(storeId => (
									<SelectItem key={storeId} value={storeId}>
										{grouped[storeId][0]?.product.store
											.title ?? storeId}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}

				<div className='rounded-lg border p-4 mb-6'>
					<div className='font-medium mb-2'>
						Товары{storeTitle ? ` — ${storeTitle}` : ''}
					</div>
					{selectedItems.length === 0 ? (
						<div className='text-sm text-muted-foreground'>
							Выберите магазин или добавьте товары в корзину
						</div>
					) : (
						<div className='flex flex-col gap-2'>
							{selectedItems.map(i => (
								<div
									key={i.id}
									className='flex items-center justify-between gap-3'
								>
									<div className='min-w-0'>
										<div className='truncate text-sm font-medium'>
											{i.product.title}
										</div>
										<div className='text-xs text-muted-foreground'>
											x{i.quantity}
										</div>
									</div>
									<div className='text-sm'>
										{i.price * i.quantity} ₽
									</div>
								</div>
							))}
							<div className='pt-2 border-t flex items-center justify-between'>
								<div className='text-sm text-muted-foreground'>
									Итого
								</div>
								<div className='font-semibold'>{total} ₽</div>
							</div>
						</div>
					)}
				</div>

				<div className='rounded-lg border p-4 mb-6'>
					<div className='font-medium mb-2'>Доставка</div>
					<Textarea
						value={delivery}
						onChange={e => setDelivery(e.target.value)}
						placeholder='Например: Адрес, подъезд, этаж, домофон'
					/>
				</div>

				<Button
					className='w-full'
					disabled={!canCheckout || isSubmitting}
					onClick={handleCheckout}
				>
					{isSubmitting ? 'Создаём оплату...' : 'Перейти к оплате'}
				</Button>
			</div>
		</section>
	)
}
