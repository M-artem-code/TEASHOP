import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { colorService } from '@/services/color.service'

export function useDeleteColor() {
	const queryClient = useQueryClient()

	const params = useParams<{ storeId: string; colorId: string }>()

	const { mutate: deleteColor, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete-color'],
		mutationFn: () => colorService.delete(params.colorId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get colors for store dashboard']
			})
			toast.success('Цвет успешно удален')
		},
		onError() {
			toast.error('Ошибка удаления цвета')
		}
	})

	return useMemo(
		() => ({ deleteColor, isLoadingDelete }),
		[deleteColor, isLoadingDelete]
	)
}
