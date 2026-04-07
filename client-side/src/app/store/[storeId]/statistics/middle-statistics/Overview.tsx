import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis
} from 'recharts'

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
		color: '"rgb(59, 130, 246)"'
	}
} satisfies ChartConfig

export function Overview({ data }: OverviewProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Обзор</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className='aspect-auto h-[310px] w-full'
					config={chartConfig}
				>
					<AreaChart data={data}>
						<Area dataKey='value' />
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									labelFormatter={formatPrice}
									indicator='line'
								/>
							}
						/>

						<Area
							dataKey='value'
							type='natural'
							fill='var(--color-value)'
							stroke='var(--color-value)'
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
