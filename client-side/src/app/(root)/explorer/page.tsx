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
// import { useEffect, useState } from 'react'

// type Post = {
// 	id: number
// 	title: string
// }

// export default function ExplorerPage() {
// 	const [data, setData] = useState<Post[]>([])
// 	const [loading, setLoading] = useState(true)
// 	const [value, setValue] = useState('')
// 	const debouncedValue = useDebounce(value, 500)

// 	useEffect(() => {
// 		const getData = async () => {
// 			try {
// 				const res = await fetch(
// 					'https://jsonplaceholder.typicode.com/posts'
// 				)
// 				const data = await res.json()
// 				setData(data)
// 			} catch (e) {
// 				console.error(e)
// 			} finally {
// 				setLoading(false)
// 			}
// 		}

// 		getData()
// 	}, [])

// 	return (
// 		<div className='my-6'>
// 			<div className='my-6'>
// 				{data.slice(0, 5).map(post => (
// 					<div key={post.id}>{post.title}</div>
// 				))}
// 			</div>
// 		</div>
// 	)
// }

// function useDebounce(value, delay) {
// 	const [debounce, setDebounce] = useState(value)

// 	useEffect(() => {
// 		const t = setTimeout(() => {
// 			setDebounce(value)
// 		}, delay)

// 		return () => {
// 			clearTimeout(t)
// 		}
// 	}, [value, delay])

// 	return debounce
// }
