'use client'

import { useQuery } from '@tanstack/react-query'

import { IProduct } from '@/app/shared/types/product.interface'

import { Catalog } from '@/components/ui/catalog/catalog'

import { productService } from '@/services/product.service'

import { ProductGallery } from './product-gallery/ProductGallery'
import { ProductInfo } from './product-info/ProductInfo'
import { ProductReviews } from './product-reviews/ProductReviews'
import styles from './product.module.css'

interface ProductProps {
	initialProduct: IProduct
	similarProducts: IProduct[]
	id?: string
}

export function Product({
	initialProduct,
	similarProducts,
	id = ''
}: ProductProps) {
	const { data: product } = useQuery({
		queryKey: ['product', initialProduct.id],
		queryFn: () => productService.getById(id),
		initialData: initialProduct,
		enabled: !!id
	})

	return (
		<div className={styles.productPage}>
			<div className={styles.content}>
				<ProductGallery product={product} />
				<ProductInfo product={product} />
			</div>
			<Catalog title='Похожие товары' products={similarProducts} />
			<ProductReviews product={product} />
		</div>
	)
}
