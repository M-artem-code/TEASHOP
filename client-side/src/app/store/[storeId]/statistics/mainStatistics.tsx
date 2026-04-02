import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'

import styles from './MainStatistics.module.css'
import { MainStatisticsItem } from './MainStatisticsItem'

export function MainStatistics() {
	const { main } = useGetStatistics()

	return (
		<div className={styles.main}>
			{main?.length ? (
				main.map(statistic => (
					<MainStatisticsItem
						key={statistic.id}
						statistic={statistic}
					/>
				))
			) : (
				<div>
					<h1>No statistics</h1>
				</div>
			)}
		</div>
	)
}
