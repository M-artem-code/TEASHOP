import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { CreateCategory } from './create-colors'

export const metadata: Metadata = {
	title: 'Создание категории',
	...NO_INDEX_PAGE
}

export default function CreateCategoryPage() {
	return <CreateCategory />
}
