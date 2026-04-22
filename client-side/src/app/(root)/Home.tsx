import { Catalog } from '@/components/ui/catalog/catalog'

import { PUBLIC_URL } from '../config/url.config'
import { IProduct } from '../shared/types/product.interface'

import { Hero } from './hero/hero'

interface HomeProps {
	products: IProduct[]
}

export function Home({ products }: HomeProps) {
	return (
		<>
			<Hero />
			<Catalog
				title='Хиты продаж'
				description='Самые популярные товары нашего магазина.'
				linkTitle='Узнать больше'
				link={PUBLIC_URL.explorer()}
				products={products}
			/>
		</>
	)
}
