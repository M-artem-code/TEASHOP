import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { PUBLIC_URL } from '@/app/config/url.config'
import { Button } from '@/components/ui/button'
import { SITE_DESCRIPTION } from '@/constants/seo.constants'

export function Hero() {
	return (
		<section className='relative flex flex-col items-center justify-center text-center py-24 px-4 overflow-hidden'>
			<div className='absolute -top-24 -z-10 h-[400px] w-full bg-primary/10 blur-[120px] rounded-full' />

			<h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black mb-8 max-w-4xl'>
				Ваш шопинг, ваше удовольствие —{' '}
				<span className='text-[#347bff]'>
					все в одном месте
				</span>
			</h1>

			<p className='text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed'>
				{SITE_DESCRIPTION}
			</p>

			<Link href={PUBLIC_URL.explorer()}>
				<Button 
					size='lg' 
					className='h-14 px-8 text-lg font-semibold gap-3 transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20'
				>
					За покупками
					<ArrowRight className='size-5' />
				</Button>
			</Link>
		</section>
	)
}
