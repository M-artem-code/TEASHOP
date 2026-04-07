import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { STORE_URL } from '@/app/config/url.config'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export interface IReviewColumn {
	id: string
	createdAt: string
	rating: number
	username: string
}

export const columns: ColumnDef<IReviewColumn>[] = [
	{
		accessorKey: 'username',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Пользователь
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className='flex items-center gap-2'>
				<span className='text-sm max-w-xs truncate'>
					{row.getValue('username')}
				</span>
			</div>
		)
	},
	{
		accessorKey: 'rating',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Рейтинг
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const rating = row.getValue('rating') as number
			return (
				<span className='text-lg text-yellow-500'>
					{'★'.repeat(rating)}
					<span className='text-gray-300'>
						{'☆'.repeat(5 - rating)}
					</span>
				</span>
			)
		}
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
	}
]
