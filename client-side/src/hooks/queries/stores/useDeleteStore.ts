import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { PUBLIC_URL, STORE_URL } from '@/app/config/url.config'

import { storeService } from '@/services/store.service'

export function useDeleteStore() {
    const router = useRouter()
    

	const queryClient = useQueryClient()

	const { mutate: deleteStore, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete-store'],
		mutationFn: (storeId: string) => storeService.delete(storeId),
		onSuccess(_, storeId) {
			queryClient.invalidateQueries({ queryKey: ['stores'] })
			queryClient.invalidateQueries({ queryKey: ['store', storeId] })
			toast.success('Store deleted successfully')
			router.push(PUBLIC_URL.home())
		},
		onError() {
			toast.error('Error deleting store')
		}
	})

	return useMemo(
		() => ({ deleteStore, isLoadingDelete }),
		[deleteStore, isLoadingDelete]
	)
}
