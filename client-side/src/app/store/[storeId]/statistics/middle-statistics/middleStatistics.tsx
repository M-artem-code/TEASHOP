import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'

import { LastUsers } from './LastUsers'
import { Overview } from './Overview'

export function MiddleStatistics() {
	const { middle } = useGetStatistics()

	return (
		<div className='mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6'>
			{middle ? (
				<>
					<div className='bg-white rounded-lg shadow-sm p-6'>
						<Overview data={middle.monthlySales} />
					</div>
					<div className='bg-white rounded-lg shadow-sm p-6'>
						<LastUsers data={middle.lastUsers} />
					</div>
				</>
			) : (
				<div className='col-span-full flex items-center justify-center'>
					<h1 className='text-xl font-medium text-gray-500'>
						No statistics available!
					</h1>
				</div>
			)}
		</div>
	)
}
