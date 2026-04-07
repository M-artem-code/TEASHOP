'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { reviewService } from '@/services/review.service'
import { ReviewForm } from '../reviewForm'


export function ReviewEdit() {
	const params = useParams<{ reviewId: string }>()

	const { data } = useQuery({
		queryKey: ['get-review', params.reviewId],
		queryFn: () => reviewService.getById(params.reviewId)
	})

	return <ReviewForm review={data || null} />
}
