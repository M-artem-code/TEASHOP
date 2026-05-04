import Link from 'next/link'

import { PUBLIC_URL } from '@/app/config/url.config'
import { IProduct } from '@/app/shared/types/product.interface'

interface ProductCardProps {
	product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
	const image = product.images?.[0]
	const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

	const src = (() => {
		if (!image) return ''
		if (image.startsWith('http://') || image.startsWith('https://'))
			return image
		if (!baseUrl) return image
		return `${baseUrl}${image}`
	})()

	return (
		<div className='group flex w-64 shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md'>
			<Link
				href={PUBLIC_URL.product(product.id)}
				className='block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
			>
				<div className='relative w-full overflow-hidden bg-muted/40'>
					{image ? (
						<img
							src={src}
							alt={product.title}
							className='h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]'
							loading='lazy'
						/>
					) : (
						<div className='flex h-48 w-full items-center justify-center text-sm text-muted-foreground'>
							Нет изображения
						</div>
					)}
				</div>
			</Link>

			<div className='flex flex-1 flex-col gap-2 p-4'>
				<Link
					href={PUBLIC_URL.product(product.id)}
					className='line-clamp-2 text-sm font-semibold leading-snug text-foreground hover:underline underline-offset-4'
				>
					{product.title}
				</Link>
				{product.category?.id && product.category?.title && (
					<Link
						href={PUBLIC_URL.category(product.category.id)}
						className='w-fit text-xs text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors'
					>
						{product.category.title}
					</Link>
				)}
				<div className='mt-auto text-sm font-bold text-foreground'>
					{product.price.toLocaleString('ru-RU')} ₽
				</div>
			</div>
		</div>
	)
}
