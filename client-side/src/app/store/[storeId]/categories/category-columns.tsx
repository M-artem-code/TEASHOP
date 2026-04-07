import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, MoreHorizontal } from 'lucide-react'

import { STORE_URL } from '@/app/config/url.config'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export interface ICategoryColumn {
	id: string
	createdAt: string
	title: string
	storeId: string
}

export const columns: ColumnDef<ICategoryColumn>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Название
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className='flex items-center gap-2'>
				<div />
				<span className='text-sm'>{row.getValue('title')}</span>
			</div>
		)
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Дата создания
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => (
			<span className='text-sm'>{row.getValue('createdAt')}</span>
		)
	},
	{
		accessorKey: 'action',
		header: 'Действия',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='size-8 p-0'>
						<span className='sr-only'>Открыть меню</span>
						<MoreHorizontal className='size-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Действия</DropdownMenuLabel>
					<DropdownMenuItem asChild>
						<Link href={'#'}>
							<Edit className='mr-2 h-4 w-4' />
							Страница категории
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link
							href={STORE_URL.categoryEdit(
								row.original.storeId,
								row.original.id
							)}
						>
							<Edit className='mr-2 h-4 w-4' />
							Изменить
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
