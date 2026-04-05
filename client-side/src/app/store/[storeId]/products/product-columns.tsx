import { ColumnDef } from '@tanstack/react-table'
import {
	ArrowUpDown,
	Edit,
	ExternalLink,
	MoreHorizontal,
	Trash
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
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
			<div
				className='flex items-center gap-x-3'
				style={{ backgroundColor: row.original.color }}
			>
				{row.original.color}
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
					<DropdownMenuItem
						onClick={() =>
							navigator.clipboard.writeText(row.original.id)
						}
					>
						<ExternalLink className='mr-2 h-4 w-4' />
						Ссылка на товар
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							navigator.clipboard.writeText(row.original.id)
						}
					>
						<Edit className='mr-2 h-4 w-4' />
						Редактировать
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							navigator.clipboard.writeText(row.original.id)
						}
					>
						<Trash className='mr-2 h-4 w-4' />
						Удалить
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
