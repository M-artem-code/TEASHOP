import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export interface IOrderColumn {
	createdAt: string
	status: string
	total: string
}

export const orderColumns: ColumnDef<IOrderColumn>[] = [
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
					Дата оплаты
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => (
			<span className='text-sm'>{row.getValue('createdAt')}</span>
		)
	},
	{
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Статус
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const status = String(row.getValue('status'))
			const variant = status === 'Оплачен' ? 'success' : 'warning'
			return <Badge variant={variant}>{status}</Badge>
		}
	},
	{
		accessorKey: 'total',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Сумма
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div>
				{row.getValue('total')}
			</div>
		)
	}
]
