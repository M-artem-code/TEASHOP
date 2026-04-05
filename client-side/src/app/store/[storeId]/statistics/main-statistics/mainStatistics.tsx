import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'
import { MainStatisticsItem } from './MainStatisticsItem'


export function MainStatistics() {
	const { main } = useGetStatistics()

	return (
		<div className='mt-3 grid gap-4 gap-x-8 transition-all grid-cols-1 drop-shadow-sm sm:grid-cols-2 xl:grid-cols-4'>
			{main?.length ? (
				main.map(statistic => (
					<div key={statistic.id} className='item drop-shadow-sm'>
						<MainStatisticsItem statistic={statistic} />
					</div>
				))
			) : (
				<div>
					<h1>No statistics available!</h1>
				</div>
			)}
		</div>
	)
}
