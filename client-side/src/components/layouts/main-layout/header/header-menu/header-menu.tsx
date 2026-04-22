'use client'

import { LogOut } from 'lucide-react'
import Link from 'next/link'

import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/app/config/url.config'

import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { CreateStoreModule } from '@/components/ui/modals/CreateStoreModal'

import { useProfile } from '@/hooks/useProfile'

import { HeaderCart } from './header-cart/HeaderCart'

export function HeaderMenu() {
	const { user, isLoading } = useProfile()

	return (
		<div className='hidden lg:flex items-center gap-x-2 ml-auto'>
			<HeaderCart />
			<Link href={PUBLIC_URL.explorer()}>
				<Button variant='ghost'>Каталог</Button>
			</Link>

			{isLoading ? (
				<Loader size='sm' />
			) : user ? (
				<>
					<Link href={DASHBOARD_URL.favorites()}>
						<Button variant='ghost' className='rounded-full'>
							Избранное
						</Button>
					</Link>
					{user.stores.length > 0 ? (
						<Link href={STORE_URL.home(user.stores[0].id)}>
							<Button variant='ghost'>Мои магазины</Button>
						</Link>
					) : (
						<CreateStoreModule>
							<Button variant='ghost'>Создать магазин</Button>
						</CreateStoreModule>
					)}

					<Link href={DASHBOARD_URL.home()}>
						<img
							src={user.picture}
							alt={user.name}
							width={42}
							height={42}
							className='rounded-full'
						/>
					</Link>
				</>
			) : (
				<Link href={PUBLIC_URL.auth()}>
					<Button variant='default'>
						<LogOut className='size-4 mr-2' />
						Войти
					</Button>
				</Link>
			)}
		</div>
	)
}
