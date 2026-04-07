'use client'

import { IReview } from '@/app/shared/types/review.interface'

import { Heading } from '@/components/ui/heading'

interface ReviewFormProps {
	review: IReview | null
}

export function ReviewForm({ review }: ReviewFormProps) {
	if (!review) {
		return (
			<div className='p-6'>
				<Heading title='Отзыв не найден' />
			</div>
		)
	}

	return (
		<div className='p-6'>
			<Heading title='Просмотр отзыва' />

			<div className='space-y-6 mt-6'>
				<div>
					<h3 className='text-lg font-medium mb-2'>Текст отзыва</h3>
					<p className='text-gray-700 bg-gray-50 p-4 rounded-lg'>
						{review.text}
					</p>
				</div>

				<div>
					<h3 className='text-lg font-medium mb-2'>Рейтинг</h3>
					<div className='flex gap-1'>
						{[1, 2, 3, 4, 5].map(star => (
							<span
								key={star}
								className={`text-3xl ${
									star <= review.rating
										? 'text-yellow-500'
										: 'text-gray-300'
								}`}
							>
								★
							</span>
						))}
					</div>
				</div>

				<div>
					<h3 className='text-lg font-medium mb-2'>Автор</h3>
					<p className='text-gray-700'>
						{review.user?.name || 'Аноним'}
					</p>
				</div>
			</div>
		</div>
	)
}
