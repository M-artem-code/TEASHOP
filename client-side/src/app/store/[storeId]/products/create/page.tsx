import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { CreateProducts } from './create-products'

export const metadata: Metadata = {
	title: 'Создание товара',
	...NO_INDEX_PAGE
}

export default function CreateProdutcPage() {
	return <CreateProducts />
}
