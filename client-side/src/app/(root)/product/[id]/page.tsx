import { AxiosError } from 'axios'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { productService } from '@/services/product.service'

import { Product } from './Product'

export const revalidate = 60

export async function generateStaticParams() {
	const products = await productService.getAll()

	return products.map(product => ({
		id: product.id
	}))
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const { id } = await params
	const { product } = await getProducts(id)

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: [
				{
					url: product.images[0],
					width: 1000,
					height: 1000,
					alt: product.title
				}
			]
		}
	}
}

async function getProducts(id: string) {
	try {
		const product = await productService.getById(id)

		const similar = await productService.getSimilar(id)

		return { product, similar }
	} catch (error) {
		const status = (error as AxiosError | undefined)?.response?.status
		if (status === 404) return notFound()
		throw error
	}
}

export default async function ProductPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const { product, similar } = await getProducts(id)

	return (
		<Product initialProduct={product} similarProducts={similar} id={id} />
	)
}
