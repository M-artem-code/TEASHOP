import { PropsWithChildren } from 'react'

import { Footer } from './footer/footer'
import { Header } from './header/header'

export function MainLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='min-h-screen'>
			<div className='flex flex-col min-h-screen'>
				<Header />
				<main className='flex-1'>{children}</main>
				<Footer />
			</div>
		</div>
	)
}
