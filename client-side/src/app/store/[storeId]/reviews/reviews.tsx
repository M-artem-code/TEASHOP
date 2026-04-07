'use client'

import { useParams } from 'next/navigation'

import { IReview } from '@/app/shared/types/review.interface'

import { DataTable } from '@/components/ui/data-table/data-table'
import { DataTableLoading } from '@/components/ui/data-table/data-table-loading'
import { Heading } from '@/components/ui/heading'


import { formatDate } from '@/utils/date/format-date'

import { IReviewColumn, columns } from './review-columns'
import { useGetReviews } from '@/hooks/queries/reviews/reviews.'

export function Reviews() {
	const params = useParams<{ storeId: string }>()

	const { reviews, isLoading } = useGetReviews()

	const formattedReviews: IReviewColumn[] = reviews
		? reviews.map((review: IReview) => ({
				id: review.id,
				createdAt: formatDate(review.createdAt),
				rating: review.rating,
				username: review.user.name
			}))
		: []

	return (
		<div className='p-6'>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<div className='space-y-6'>
					<div className='flex items-center justify-between'>
						<Heading
							title={`Отзывы (${reviews?.length || 0})`}
							description='Все отзывы вашего магазина'
						/>
					</div>
					<div>
						<DataTable
							columns={columns}
							data={formattedReviews}
							filterKey='text'
						/>
					</div>
				</div>
			)}
		</div>
	)
}
