import type { Metadata } from 'next'

import { ExplorerCatalog } from './ExplorerCatalog'

export const metadata: Metadata = {
	title: 'Каталог'
}
export const dynamic = 'force-dynamic'
export default async function ExplorerPage({
	searchParams
}: {
	searchParams: Promise<{ search?: string }>
}) {
	const params = await searchParams
	const hasSearch = Boolean(params.search?.trim())
	return (
		<div className='my-6'>
			<section className='px-4 max-w-[1400px] mx-auto'>
				<div className='max-w-2xl pt-12'>
					<h1 className='text-3xl md:text-4xl font-bold tracking-tight text-black mb-3'>
						{hasSearch
							? `Результаты по запросу: ${params.search}`
							: 'Каталог'}
					</h1>
					<p className='text-lg text-muted-foreground leading-relaxed'>
						{hasSearch
							? 'Найденные товары по вашему запросу.'
							: 'Все товары нашего магазина.'}
					</p>
				</div>
			</section>
			<ExplorerCatalog search={params.search} />
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
