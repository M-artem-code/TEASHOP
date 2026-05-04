'use client'

import { IProduct } from '@/app/shared/types/product.interface'

interface ProductInfoProps {
	product: IProduct
}

export function ProductInfo({ product }: ProductInfoProps) {
	return (
		<div>
			<h1 className='text-2xl font-bold leading-tight'>{product.title}</h1>
			<p className='mt-3 text-sm text-muted-foreground'>{product.description}</p>
			<div className='mt-4 text-xl font-bold'>{product.price.toLocaleString('ru-RU')} ₽</div>
		</div>
	)
}
