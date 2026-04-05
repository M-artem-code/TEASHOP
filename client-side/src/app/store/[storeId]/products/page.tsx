import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Products } from './products'

export const metadata: Metadata = {
	title: 'Продукты магазина',
	...NO_INDEX_PAGE
}

export default function ProductsPage() {
	return <Products />
}
