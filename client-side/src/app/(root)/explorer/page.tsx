import type { Metadata } from 'next'

import { Catalog } from '@/components/ui/catalog/catalog'

import { productService } from '@/services/product.service'

export const metadata: Metadata = {
	title: 'Каталог'
}

export const dynamic = 'force-dynamic'

async function getProducts(searchParams: { search?: string }) {
	const searchTerm = searchParams.search?.trim()

	return productService.getAll(searchTerm ? searchTerm : null)
}

export default async function ExplorerPage({
	searchParams
}: {
	searchParams: Promise<{ search?: string }>
}) {
	const params = await searchParams
	const products = await getProducts(params)
	const hasSearch = Boolean(params.search?.trim())

	return (
		<div className='my-6'>
			<Catalog
				title={
					hasSearch
						? `Результаты по запросу: ${params.search}`
						: 'Каталог'
				}
				description={
					hasSearch
						? 'Найденные товары по вашему запросу.'
						: 'Все товары нашего магазина.'
				}
				products={products}
			/>
		</div>
	)
}
