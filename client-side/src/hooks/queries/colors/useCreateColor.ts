import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { IColorInput } from '@/app/shared/types/color.interface'

import { colorService } from '@/services/color.service'

export function useCreateColor() {
	const params = useParams<{ storeId: string }>()
	const queryClient = useQueryClient()

	const { mutate: createColor, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create-color'],
		mutationFn: (data: IColorInput) =>
			colorService.create(data, params.storeId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get colors for store dashboard']
			})
			toast.success('Цвет успешно создан')
		},
		onError() {
			toast.error('Ошибка создания цвета')
		}
	})

	return useMemo(
		() => ({ createColor, isLoadingCreate }),
		[createColor, isLoadingCreate]
	)
}
