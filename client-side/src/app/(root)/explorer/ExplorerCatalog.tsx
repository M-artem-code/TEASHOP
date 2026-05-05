'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { VirtuosoGrid } from 'react-virtuoso'

import { ProductCard } from '@/components/ui/catalog/product-card/ProductCard'

import { productService } from '@/services/product.service'

interface ExplorerCatalogProps {
	search?: string
}

const PAGE_SIZE = 24

export function ExplorerCatalog({ search }: ExplorerCatalogProps) {
	const searchTerm = search?.trim() || undefined

	const query = useInfiniteQuery({
		queryKey: ['products', 'explorer', { searchTerm }],
		initialPageParam: null as string | null,
		queryFn: ({ pageParam }) =>
			productService.getPage({
				searchTerm,
				cursor: pageParam,
				take: PAGE_SIZE
			}),
		getNextPageParam: lastPage => lastPage.nextCursor
	})

	const items = query.data?.pages.flatMap(p => p.items) ?? []
	const hasMore = Boolean(query.hasNextPage)

	return (
		<div className='py-12 px-4 max-w-[1400px] mx-auto'>
			<VirtuosoGrid
				useWindowScroll
				totalCount={items.length}
				endReached={() => {
					if (hasMore && !query.isFetchingNextPage) {
						query.fetchNextPage()
					}
				}}
				components={{
					List: props => (
						<div
							{...props}
							className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'
						/>
					),
					Item: props => <div {...props} className='w-full' />
				}}
				itemContent={index => {
					const product = items[index]
					if (!product) return null
					return (
						<div className='w-full'>
							<ProductCard product={product} variant='grid' />
						</div>
					)
				}}
			/>

			{query.isLoading && (
				<div className='py-10 text-center text-muted-foreground'>
					Загрузка...
				</div>
			)}

			{!query.isLoading && items.length === 0 && (
				<div className='py-20 text-center text-xl text-muted-foreground'>
					Товары не найдены
				</div>
			)}

			{query.isFetchingNextPage && (
				<div className='py-10 text-center text-muted-foreground'>
					Загружаю ещё...
				</div>
			)}
		</div>
	)
}
