import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { IColorInput } from '@/app/shared/types/color.interface'

import { colorService } from '@/services/color.service'

export function useUpdateColor() {
	const queryClient = useQueryClient()

	const params = useParams<{ storeId: string; colorId: string }>()

	const { mutate: updateColor, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update-color'],
		mutationFn: (data: IColorInput) =>
			colorService.update(params.colorId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get colors for store dashboard']
			})
			toast.success('Цвет успешно обновлен')
		},
		onError() {
			toast.error('Ошибка обновления цвета')
		}
	})

	return useMemo(
		() => ({ updateColor, isLoadingUpdate }),
		[updateColor, isLoadingUpdate]
	)
}
