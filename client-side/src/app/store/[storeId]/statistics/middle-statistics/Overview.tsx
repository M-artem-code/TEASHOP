'use client'

import { useMemo } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { IMonthlySales } from '@/app/shared/types/statistics.interface'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'

import { formatPrice } from '@/utils/string/format-price'

interface OverviewProps {
	data: IMonthlySales[]
}

const chartConfig = {
	value: {
		label: 'Прибыль',
		color: '#3b82f6'
	}
} satisfies ChartConfig

export function Overview({ data }: OverviewProps) {
	if (!data || data.length === 0) {
		return (
			<Card className='border-0 shadow-lg'>
				<CardHeader className='pb-4'>
					<CardTitle className='text-xl font-semibold'>
						Обзор
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex items-center justify-center h-[320px] text-muted-foreground'>
						Нет данных для отображения
					</div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className='border-0 shadow-lg'>
			<CardHeader className='pb-4'>
				<CardTitle className='text-xl font-semibold'>Обзор</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className='aspect-auto h-[320px] w-full'
					config={chartConfig}
				>
					<AreaChart data={chartData}>
						<CartesianGrid
							vertical={false}
							strokeDasharray='3 3'
							stroke='hsl(var(--border))'
							className='stroke-muted'
						/>
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={12}
							className='text-xs text-muted-foreground'
						/>
						<YAxis
							domain={[0, 'dataMax']}
							tickLine={false}
							axisLine={false}
							tickMargin={12}
							tickCount={5}
							tickFormatter={value =>
								`${(value / 1000).toFixed(0)}k`
							}
							className='text-xs text-muted-foreground'
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									labelFormatter={label => label}
									indicator='line'
								/>
							}
						/>
						<Area
							dataKey='value'
							type='monotone'
							stroke='#3b82f6'
							strokeWidth={2.5}
							fill='#3b82f6'
							fillOpacity={0.2}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
