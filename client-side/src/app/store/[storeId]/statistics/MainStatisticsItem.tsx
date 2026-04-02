import { DollarSign } from 'lucide-react'
import CountUp from 'react-countup'

import { IMainStatistics } from '@/app/shared/types/statistics.interface'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import styles from './MainStatisticsItem.module.css'
import { iconMap } from './statistics.util'
import { formatPrice } from '@/utils/string/fotmat-price'

interface MainStatisticsItemProps {
	statistic: IMainStatistics
}

export function MainStatisticsItem({ statistic }: MainStatisticsItemProps) {
	const Icon = iconMap[statistic.id] || DollarSign

	return (
		<Card className={`${styles.card}`}>
			<CardHeader className={`${styles.header}`}>
				<CardTitle>{statistic.name}</CardTitle>
				<Icon />
			</CardHeader>
			<CardContent>
				<h2>
					{statistic.id !== 1 ? (
						<CountUp end={statistic.value} />
					) : (
						<CountUp end={statistic.value} formattingFn={formatPrice}/>
					)}
				</h2>
			</CardContent>
		</Card>
	)
}
