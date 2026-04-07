'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { PUBLIC_URL } from '@/app/config/url.config'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SearchInput() {
	const [searchTerm, setSearchTerm] = useState<string>('')

	const router = useRouter()

	return (
		<div className='relative flex items-center'>
			<Input
				placeholder='Поиск товаров'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				className='pr-10'
				onKeyDown={e => {
					if (e.key === 'Enter') {
						router.push(
							PUBLIC_URL.explorer(`?search=${searchTerm}`)
						)
					}
				}}
			/>
			<Button
				variant='ghost'
				size='sm'
				onClick={() =>
					router.push(PUBLIC_URL.explorer(`?search=${searchTerm}`))
				}
				className='absolute right-1 h-8 w-8 p-0 hover:bg-gray-100'
			>
				<Search className='h-4 w-4' />
			</Button>
		</div>
	)
}
