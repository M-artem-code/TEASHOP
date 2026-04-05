import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { IStoreEdit } from '@/app/shared/types/store.inteface'

import { storeService } from '@/services/store.service'

export function useUpdateStore() {
	const queryClient = useQueryClient()

	const params = useParams()

	const { data: store } = useQuery({
		queryKey: ['store', params.storeId],
		queryFn: () => storeService.getById(params.storeId as string)
	})

	const { mutate: updateStore, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update-store'],
		mutationFn: (data: IStoreEdit) =>
			storeService.update(params.storeId as string, data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			toast.success('Store updated successfully')
		},
		onError() {
			toast.error('Error creating store')
		}
	})

	return useMemo(
		() => ({
			store,
			updateStore,
			isLoadingUpdate
		}),
		[store, updateStore, isLoadingUpdate]
	)
}
