import Link from 'next/link'

import { ICatalog } from './catalog.interface'
import { ProductCard } from './product-card/ProductCard'

export function Catalog({
	title,
	description,
	linkTitle,
	link,
	products
}: ICatalog) {
	return (
		<section className='py-12 px-4 max-w-[1400px] mx-auto'>
			<div className='flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6'>
				<div className='max-w-2xl'>
					<h1 className='text-3xl md:text-4xl font-bold tracking-tight text-black mb-3'>
						{title}
					</h1>
					{description && (
						<p className='text-lg text-muted-foreground leading-relaxed'>
							{description}
						</p>
					)}
				</div>

				{link && linkTitle && (
					<Link
						href={link}
						className='text-[#347bff] font-semibold hover:underline decoration-2 underline-offset-4 transition-all'
					>
						{linkTitle} →
					</Link>
				)}
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
				{products.length ? (
					products.map(product => (
						<ProductCard key={product.id} product={product} />
					))
				) : (
					<div className='col-span-full py-20 text-center text-xl text-muted-foreground'>
						Товары не найдены
					</div>
				)}
			</div>
		</section>
	)
}
