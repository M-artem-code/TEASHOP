import type { Metadata } from 'next'

import { productService } from '@/services/product.service'

import { Home } from './Home'

export const metadata: Metadata = {
	title: 'Шоппинг'
}

export const dynamic = 'force-dynamic'

async function getProducts() {
	const data = (await productService.getAll()).slice(0, 6)

	return data
}

export default async function HomePage() {
	const data = await getProducts()

	return <Home products={data} />
}
