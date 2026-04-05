import Image from 'next/image'

import { ILastUsers } from '@/app/shared/types/statistics.interface'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { formatPrice } from '@/utils/string/format-price'

interface LastUsersProps {
	data: ILastUsers[]
}

export function LastUsers({ data }: LastUsersProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Последние пользователи</CardTitle>
			</CardHeader>
			<CardContent>
				{data && data.length > 0 ? (
					data.map((user, index) => (
						<div
							key={index}
							className='flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors rounded-lg'
						>
							<Image
								src={user.picture}
								alt={user.name}
								width={40}
								height={40}
								className='w-10 h-10 rounded-full object-cover border-2 border-gray-200'
							/>
							<div className='flex-1'>
								<div className='font-medium text-gray-900'>
									<p>{user.name}</p>
									<p className='text-sm text-gray-500'>{user.email}</p>
								</div>
							</div>
							<div className='text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded'>
								<p>+{formatPrice(user.total)}</p>
							</div>
						</div>
					))
				) : (
					<div className='text-center py-4 text-gray-500'>
						No users data available
					</div>
				)}
			</CardContent>
		</Card>
	)
}
