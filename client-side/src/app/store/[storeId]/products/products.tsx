'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { STORE_URL } from '@/app/config/url.config'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table/data-table'
import { DataTableLoading } from '@/components/ui/data-table/data-table-loading'
import { Heading } from '@/components/ui/heading'

import { useGetProducts } from '@/hooks/queries/products/useGetProducts'

import { formatPrice } from '@/utils/string/format-price'

import { IProductColumn, columns } from './product-columns'

export function Products() {
	const params = useParams<{ storeId: string }>()

	const { products, isLoading } = useGetProducts()

	const formattedProducts: IProductColumn[] = products
		? products.map(product => ({
				id: product.id,
				title: product.title,
				price: formatPrice(product.price),
				category: product.category?.title ?? '—',
				color: product.color?.value ?? '',
				storeId: params.storeId
			}))
		: []

	return (
		<div className='p-6'>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<div className='space-y-6'>
					<div className='flex items-center justify-between'>
						<Heading
							title={`Товары (${products?.length || 0})`}
							description='Все товары вашего магазина'
						/>
						<Link href={STORE_URL.productCreate(params.storeId)}>
							<Button variant='default' className='gap-2'>
								<Plus className='h-4 w-4' />
								Создать
							</Button>
						</Link>
					</div>
					<div>
						<DataTable
							columns={columns}
							data={formattedProducts}
							filterKey='title'
						/>
					</div>
				</div>
			)}
		</div>
	)
}
