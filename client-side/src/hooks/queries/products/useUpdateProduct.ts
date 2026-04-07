import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { IProductInput } from '@/app/shared/types/product.interface'

import { productService } from '@/services/product.service'

export function useUpdateProduct() {
	const params = useParams<{ productId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update-product'],
		mutationFn: (data: IProductInput) =>
			productService.update(params.productId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get products for store dashboard']
			})
			toast.success('Продукт успешно обновлен')
		},
		onError() {
			toast.error('Ошибка обновления продукта')
		}
	})

	return useMemo(
		() => ({ updateProduct, isLoadingUpdate }),
		[updateProduct, isLoadingUpdate]
	)
}
