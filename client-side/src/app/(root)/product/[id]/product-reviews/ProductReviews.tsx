'use client'

import { IProduct } from '@/app/shared/types/product.interface'

interface ProductReviewsProps {
	product: IProduct
}

export function ProductReviews({ product }: ProductReviewsProps) {
	const reviews = (product as any)?.reviews ?? (product as any)?.rewiews ?? []

	return (
		<section className='mt-10'>
			<h2 className='text-lg font-bold'>Отзывы</h2>
			{Array.isArray(reviews) && reviews.length ? (
				<div className='mt-4 space-y-3'>
					{reviews.map((review: any) => (
						<div
							key={review?.id || Math.random()}
							className='rounded-xl border border-border bg-white p-4'
						>
							<div className='text-sm font-semibold'>
								{review?.user?.name || 'Покупатель'}
							</div>
							{review?.text && (
								<div className='mt-2 text-sm text-muted-foreground'>{review.text}</div>
							)}
						</div>
					))}
				</div>
			) : (
				<div className='mt-4 text-sm text-muted-foreground'>Пока нет отзывов</div>
			)}
		</section>
	)
}
