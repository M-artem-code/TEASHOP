'use client'

import Link from 'next/link'

import { PUBLIC_URL } from '@/app/config/url.config'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTrigger
} from '@/components/ui/sheet'

import { getCartTotal, useCartStore } from '@/store/cart.store'

export function HeaderCart() {
	const items = useCartStore(s => s.items)
	const removeItem = useCartStore(s => s.removeItem)
	const setQuantity = useCartStore(s => s.setQuantity)
	const total = getCartTotal(items)
	const totalCount = items.reduce((sum, i) => sum + i.quantity, 0)

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost'>
					Корзина{totalCount > 0 ? ` (${totalCount})` : ''}
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<Heading title='Корзина товаров' className='text-xl' />
				</SheetHeader>

				{items.length === 0 ? (
					<div className='px-4 text-sm text-muted-foreground'>
						Корзина пуста
					</div>
				) : (
					<div className='flex flex-col gap-3 px-4'>
						{items.map(item => (
							<div
								key={item.id}
								className='flex items-center gap-3'
							>
								<img
									src={item.product.images?.[0]}
									alt={item.product.title}
									width={48}
									height={48}
									className='rounded-md object-cover'
								/>
								<div className='min-w-0 flex-1'>
									<div className='truncate text-sm font-medium'>
										{item.product.title}
									</div>
									<div className='text-xs text-muted-foreground'>
										{item.product.store.title}
									</div>
									<div className='text-sm'>
										{item.price} ₽
									</div>
								</div>
								<div className='flex items-center gap-2'>
									<Button
										variant='ghost'
										size='icon-sm'
										onClick={() =>
											setQuantity(
												item.id,
												Math.max(1, item.quantity - 1)
											)
										}
									>
										-
									</Button>
									<div className='w-6 text-center text-sm'>
										{item.quantity}
									</div>
									<Button
										variant='ghost'
										size='icon-sm'
										onClick={() =>
											setQuantity(
												item.id,
												item.quantity + 1
											)
										}
									>
										+
									</Button>
									<Button
										variant='ghost'
										size='icon-sm'
										onClick={() => removeItem(item.id)}
									>
										×
									</Button>
								</div>
							</div>
						))}
					</div>
				)}

				<SheetFooter>
					<div className='flex items-center justify-between text-sm'>
						<div className='text-muted-foreground'>Итого</div>
						<div className='font-semibold'>{total} ₽</div>
					</div>
					<Link href={PUBLIC_URL.checkout()}>
						<Button
							className='w-full'
							disabled={items.length === 0}
						>
							Оформить
						</Button>
					</Link>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
