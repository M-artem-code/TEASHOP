import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { ICategoryInput } from '@/app/shared/types/category.interface'

import { categoryService } from '@/services/category.service'

export function useUpdateCategory() {
	const queryClient = useQueryClient()
	const params = useParams<{ categoryId: string }>()

	const { mutate: updateCategory, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update-category'],
		mutationFn: (data: ICategoryInput) =>
			categoryService.update(params.categoryId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get categories for store dashboard']
			})
			toast.success('Категория успешно обновлена')
		},
		onError() {
			toast.error('Ошибка обновления категории')
		}
	})

	return useMemo(
		() => ({ updateCategory, isLoadingUpdate }),
		[updateCategory, isLoadingUpdate]
	)
}
