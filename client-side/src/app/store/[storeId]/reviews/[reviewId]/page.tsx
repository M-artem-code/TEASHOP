import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ReviewEdit } from './reviewEdit'

export const metadata: Metadata = {
	title: 'Настройки отзыва',
	...NO_INDEX_PAGE
}

export default function ReviewEditPage() {
	return <ReviewEdit />
}
