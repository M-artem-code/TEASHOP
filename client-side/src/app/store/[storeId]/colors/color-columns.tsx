import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, ExternalLink, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

import { PUBLIC_URL, STORE_URL } from '@/app/config/url.config'
import { IColor } from '@/app/shared/types/color.interface'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<IColor>[] = [
	{
		accessorKey: 'name',
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
				<span className='text-sm'>{row.getValue('name')}</span>
			</div>
		)
	},
	{
		accessorKey: 'value',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Значение
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className='flex items-center gap-2'>
				<div
					className='size-5 rounded-md border border-border shadow-sm'
					style={{ backgroundColor: row.original.value }}
				/>
				<code className='text-sm'>{row.original.value}</code>
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
					<Link
						href={STORE_URL.colorEdit(
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
