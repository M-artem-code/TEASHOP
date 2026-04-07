'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { STORE_URL } from '@/app/config/url.config'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table/data-table'
import { DataTableLoading } from '@/components/ui/data-table/data-table-loading'
import { Heading } from '@/components/ui/heading'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'

import { formatDate } from '@/utils/date/format-date'

import { ICategoryColumn, columns } from './category-columns'

export function Categories() {
	const params = useParams<{ storeId: string }>()

	const { categories, isLoading } = useGetCategories()

	const formattedCategories: ICategoryColumn[] = categories
		? categories.map(category => ({
				id: category.id,
				title: category.title,
				createdAt: formatDate(category.createdAt),
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
							title={`Категории (${categories?.length || 0})`}
							description='Все категории вашего магазина'
						/>
						<Link href={STORE_URL.categoryCreate(params.storeId)}>
							<Button variant='default' className='gap-2'>
								<Plus className='h-4 w-4' />
								Создать
							</Button>
						</Link>
					</div>
					<div>
						<DataTable
							columns={columns}
							data={formattedCategories}
							filterKey='title'
						/>
					</div>
				</div>
			)}
		</div>
	)
}
