'use client'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'
import { useGetColors } from '@/hooks/queries/colors/useGetColors'

import { ProductForm } from '../producForm'

export function CreateProducts() {
	const { categories } = useGetCategories()
	const { colors } = useGetColors()

	return (
		<ProductForm
			product={null}
			categories={categories || []}
			colors={colors || []}
		/>
	)
}
