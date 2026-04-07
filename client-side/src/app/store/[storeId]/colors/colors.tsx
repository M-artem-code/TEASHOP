'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { STORE_URL } from '@/app/config/url.config'
import { IColor } from '@/app/shared/types/color.interface'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table/data-table'
import { DataTableLoading } from '@/components/ui/data-table/data-table-loading'
import { Heading } from '@/components/ui/heading'

import { useGetColors } from '@/hooks/queries/colors/useGetColors'

import { formatDate } from '@/utils/date/format-date'

import { columns } from './color-columns'

export function Colors() {
	const params = useParams<{ storeId: string }>()

	const { colors, isLoading } = useGetColors()

	const formattedСolors: IColor[] = colors
		? colors.map(color => ({
				id: color.id,
				createdAt: formatDate(color.createdAt),
				name: color.name,
				value: color.value,
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
							title={`Цвета (${colors?.length || 0})`}
							description='Все Цвета вашего магазина'
						/>
						<Link href={STORE_URL.colorCreate(params.storeId)}>
							<Button variant='default' className='gap-2'>
								<Plus className='h-4 w-4' />
								Создать
							</Button>
						</Link>
					</div>
					<div>
						<DataTable
							columns={columns}
							data={formattedСolors}
							filterKey='name'
						/>
					</div>
				</div>
			)}
		</div>
	)
}
