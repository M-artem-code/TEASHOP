'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'
import { useGetColors } from '@/hooks/queries/colors/useGetColors'

import { productService } from '@/services/product.service'

import { ProductForm } from '../producForm'

export function ProductEdit() {
	const params = useParams<{ productId: string }>()

	const { data } = useQuery({
		queryKey: ['get-product', params.productId],
		queryFn: () => productService.getById(params.productId)
	})

	const { categories } = useGetCategories()
	const { colors } = useGetColors()

	return (
		<ProductForm
			categories={categories || []}
			colors={colors || []}
			product={data || null}
		/>
	)
}
