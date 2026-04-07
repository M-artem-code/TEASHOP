import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, ExternalLink, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

import { PUBLIC_URL, STORE_URL } from '@/app/config/url.config'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export interface IProductColumn {
	id: string
	title: string
	price: string
	category: string
	color: string
	storeId: string
}

export const columns: ColumnDef<IProductColumn>[] = [
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
		}
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Цена
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'category',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Категория
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'color',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Цвет
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className='flex items-center gap-2'>
				<div
					className='size-5 rounded-full border border-border shadow-sm ring-2 ring-offset-1 ring-offset-background'
					style={{ backgroundColor: row.original.color }}
				/>
				<span className='text-sm'>{row.original.color}</span>
			</div>
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
					<Link
						href={STORE_URL.productEdit(
							row.original.storeId,
							row.original.id
						)}
					>
						<Edit className='mr-2 h-4 w-4' />
						Редактировать
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
