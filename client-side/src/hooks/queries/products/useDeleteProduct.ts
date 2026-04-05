import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { productService } from '@/services/product.service'

export function useDeleteProduct() {
	const queryClient = useQueryClient()

	const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete-product'],
		mutationFn: (productId: string) => productService.delete(productId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get products for store dashboard']
			})
			toast.success('Продукт успешно удален')
		},
		onError() {
			toast.error('Ошибка удаления продукта')
		}
	})

	return useMemo(
		() => ({ deleteProduct, isLoadingDelete }),
		[deleteProduct, isLoadingDelete]
	)
}
