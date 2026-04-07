import { DollarSign } from 'lucide-react'
import CountUp from 'react-countup'

import { IMainStatistics } from '@/app/shared/types/statistics.interface'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { formatPrice } from '@/utils/string/format-price'
import { iconMap } from '../statistics.util'


interface MainStatisticsItemProps {
	statistic: IMainStatistics
}

export function MainStatisticsItem({ statistic }: MainStatisticsItemProps) {
	const Icon = iconMap[statistic.id] || DollarSign

	return (
		<Card>
			<CardHeader className='p-4 flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium text-slate-500'>
					{statistic.name}
				</CardTitle>
				<Icon />
			</CardHeader>
			<CardContent className='px-4 py-2'>
				<h2 className='text-2xl font-bold'>
					{statistic.id !== 1 ? (
						<CountUp end={statistic.value} />
					) : (
						<CountUp
							end={statistic.value}
							formattingFn={formatPrice}
						/>
					)}
				</h2>
			</CardContent>
		</Card>
	)
}
