'use client'

import { Plus, Trash } from 'lucide-react'
import Image from 'next/image'

import { IProduct } from '@/app/shared/types/product.interface'

import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { ReviewModal } from '@/components/ui/modals/ReviewModal'

import { useDeleteReview } from '@/hooks/queries/reviews/useDeleteReviews'
import { useProfile } from '@/hooks/useProfile'

interface ProductReviewsProps {
	product: IProduct
}

export function ProductReviews({ product }: ProductReviewsProps) {
	const { user } = useProfile()
	const { deleteReview } = useDeleteReview()

	const reviews = product?.reviews ?? []
	const storeId =
		product?.store?.id ||
		(product as unknown as { storeId?: string })?.storeId ||
		''

	return (
		<section className='mt-10'>
			<div className='flex items-center justify-between gap-3'>
				<h2 className='text-lg font-bold'>Отзывы</h2>
				{user && (
					<ReviewModal storeId={storeId}>
						<Button variant='ghost'>
							<Plus />
							Добавить отзыв
						</Button>
					</ReviewModal>
				)}
			</div>
			<div className='mt-4 space-y-3'>
				{reviews.length ? (
					reviews.map(review => (
						<div
							className='rounded-xl border border-border bg-white p-4'
							key={review.id}
						>
							<div className='flex items-center justify-between gap-3'>
								<div className='flex items-center gap-3'>
									<Image
										src={
											review.user?.picture ||
											'/images/auth.svg'
										}
										alt={
											review.user?.name || 'Пользователь'
										}
										width={40}
										height={40}
										className='w-10 h-10 rounded-full object-cover border border-border'
									/>
									<div className='text-sm font-semibold'>
										{review.user?.name || 'Покупатель'}
									</div>
								</div>
								{review.user?.id === user?.id && (
									<ConfirmModal
										handleClick={() =>
											deleteReview(review.id)
										}
									>
										<button
											type='button'
											className='text-muted-foreground hover:text-destructive transition-colors'
										>
											<Trash />
										</button>
									</ConfirmModal>
								)}
							</div>
							<div className='mt-2 flex gap-1'>
								{[1, 2, 3, 4, 5].map(star => (
									<span
										key={star}
										className={`text-xl ${
											star <= review.rating
												? 'text-yellow-500'
												: 'text-gray-300'
										}`}
									>
										★
									</span>
								))}
							</div>
							<div className='mt-2 text-sm text-muted-foreground'>
								{review.text}
							</div>
						</div>
					))
				) : (
					<div className='text-sm text-muted-foreground'>
						У этого товара нет отзывов
					</div>
				)}
			</div>
		</section>
	)
}
