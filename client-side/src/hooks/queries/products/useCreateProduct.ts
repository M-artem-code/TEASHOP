import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { IProductInput } from '@/app/shared/types/product.interface'

import { productService } from '@/services/product.service'

export function useCreateProduct() {
	const params = useParams<{ storeId: string }>()
	const queryClient = useQueryClient()

	const { mutate: createProduct, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create-product'],
		mutationFn: (data: IProductInput) =>
			productService.create(params.storeId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get products for store dashboard']
			})
			toast.success('Продукт успешно создан')
		},
		onError() {
			toast.error('Ошибка создания продукта')
		}
	})

	return useMemo(
		() => ({ createProduct, isLoadingCreate }),
		[createProduct, isLoadingCreate]
	)
}
