import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

import { PUBLIC_URL } from '@/app/config/url.config'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
	title: 'Спасибо за покупку',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	return (
		<section className='relative flex flex-col items-center justify-center text-center py-24 px-4 overflow-hidden min-h-[80vh]'>
			{/* Фоновое свечение, как в Hero */}
			<div className='absolute -top-24 -z-10 h-[400px] w-full bg-primary/10 blur-[120px] rounded-full' />

			<h1 className='text-5xl md:text-6xl font-extrabold tracking-tight text-black mb-8 max-w-4xl'>
				Спасибо за{' '}
				<span className='text-[#347bff]'>
					покупку
				</span>
			</h1>

			<p className='text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed'>
				Спасибо за ваш заказ! Мы ценим ваше доверие и приложим все усилия, 
				чтобы доставить ваш заказ как можно скорее.
			</p>

			<Link href={PUBLIC_URL.home()}>
				<Button 
					size='lg' 
					className='h-14 px-8 text-lg font-semibold gap-3 transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20'
				>
					На главную
					<ArrowRight className='size-5' />
				</Button>
			</Link>
		</section>
	)
}
