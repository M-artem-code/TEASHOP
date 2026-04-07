import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { ICategoryInput } from '@/app/shared/types/category.interface'

import { categoryService } from '@/services/category.service'

export function useCreateCategory() {
	const params = useParams<{ storeId: string }>()
	const queryClient = useQueryClient()

	const { mutate: createCategory, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create-category'],
		mutationFn: (data: ICategoryInput) =>
			categoryService.create(data, params.storeId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get categories for store dashboard']
			})
			toast.success('Категория успешно создана')
		},
		onError() {
			toast.error('Ошибка создания категории')
		}
	})

	return useMemo(
		() => ({ createCategory, isLoadingCreate }),
		[createCategory, isLoadingCreate]
	)
}
