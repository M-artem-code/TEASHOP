'use client'

import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { DASHBOARD_URL } from '@/app/config/url.config'
import { EnumOrderStatus } from '@/app/shared/types/order.interface'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table/data-table'
import { DataTableLoading } from '@/components/ui/data-table/data-table-loading'
import { Heading } from '@/components/ui/heading'

import { useProfile } from '@/hooks/useProfile'

import { saveTokenStorage } from '@/services/auth/aurth-token.service'
import { authService } from '@/services/auth/auth.service'

import { formatDate } from '@/utils/date/format-date'
import { formatPrice } from '@/utils/string/format-price'

import { IOrderColumn, orderColumns } from './favorites/OrderColumnd'

export function Dashboard() {
	const searchParams = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		const accessToken = searchParams.get('accessToken')
		if (accessToken) saveTokenStorage(accessToken)
	}, [searchParams])

	const { user, isLoading } = useProfile()

	const { mutate: logout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	if (isLoading) return <DataTableLoading />
	if (!user) return null

	const ordersCount = user.orders.length
	const payedCount = user.orders.filter(
		o => o.status === EnumOrderStatus.PAYED
	).length
	const pendingCount = ordersCount - payedCount
	const totalSum = user.orders.reduce((sum, o) => sum + o.total, 0)

	const formattedOrders: IOrderColumn[] = user.orders.map(order => ({
		createdAt: formatDate(order.createdAt),
		status:
			order.status === EnumOrderStatus.PENDING ? 'В ожидании' : 'Оплачен',
		total: formatPrice(order.total)
	}))

	return (
		<div className='p-6 space-y-6'>
			<div className='flex items-start justify-between gap-4'>
				<Heading
					title='Личный кабинет'
					description='Ваши заказы и избранные товары.'
				/>
				<div className='flex items-center gap-3'>
					<Link href={DASHBOARD_URL.favorites()}>
						<Button variant='secondary'>Избранное</Button>
					</Link>
					<Button
						variant='outline'
						onClick={() => logout()}
						disabled={isLogoutPending}
					>
						Выйти
					</Button>
				</div>
			</div>

			<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
				<Card size='sm' className='ring-1 ring-foreground/10'>
					<CardHeader className='pb-2'>
						<CardTitle className='text-sm text-muted-foreground'>
							Всего заказов
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-semibold tabular-nums'>
							{ordersCount}
						</div>
					</CardContent>
				</Card>
				<Card size='sm' className='ring-1 ring-foreground/10'>
					<CardHeader className='pb-2'>
						<CardTitle className='text-sm text-muted-foreground'>
							Оплачено
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-semibold tabular-nums'>
							{payedCount}
						</div>
					</CardContent>
				</Card>
				<Card size='sm' className='ring-1 ring-foreground/10'>
					<CardHeader className='pb-2'>
						<CardTitle className='text-sm text-muted-foreground'>
							В ожидании
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-semibold tabular-nums'>
							{pendingCount}
						</div>
					</CardContent>
				</Card>
				<Card size='sm' className='ring-1 ring-foreground/10'>
					<CardHeader className='pb-2'>
						<CardTitle className='text-sm text-muted-foreground'>
							Сумма
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-semibold tabular-nums'>
							{formatPrice(totalSum)}
						</div>
					</CardContent>
				</Card>
			</div>

			<div>
				<Heading
					title={`Заказы (${user.orders.length})`}
					description='История ваших заказов'
					size='md'
				/>
			</div>
			<Card className='ring-1 ring-foreground/10'>
				<CardContent>
					{formattedOrders.length === 0 ? (
						<div className='py-10 text-center'>
							<div className='text-base font-medium'>
								Заказов пока нет
							</div>
							<div className='text-sm text-muted-foreground'>
								Добавь товары в корзину и оформи заказ — он
								появится здесь.
							</div>
						</div>
					) : (
						<DataTable
							columns={orderColumns}
							data={formattedOrders}
						/>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
