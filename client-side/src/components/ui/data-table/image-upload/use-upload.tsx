import { useMutation } from '@tanstack/react-query'
import { useMemo, useRef } from 'react'
import toast from 'react-hot-toast'

import { fileService } from '@/services/file.service'

export function useUpload(onChange: (value: string[]) => void) {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const { mutate: uploadFiles, isPending: isUploading } = useMutation({
		mutationKey: ['upload files'],
		mutationFn: (formData: FormData) => fileService.upload(formData),
		onSuccess(data) {
			onChange(data.map(file => file.url))
		},
		onError() {
			toast.error('Ошибка при загрузке файлов')
		}
	})

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			const formData = new FormData()
			for (let i = 0; i < files.length; i++) {
				formData.append('files', files[i])
			}
			uploadFiles(formData)
		}
	}

	const handleButtonClick = () => {
		fileInputRef.current?.click()
	}

	return useMemo(
		() => ({
			fileInputRef,
			uploadFiles,
			isUploading,
			handleFileChange,
			handleButtonClick
		}),
		[
			fileInputRef,
			uploadFiles,
			isUploading,
			handleFileChange,
			handleButtonClick
		]
	)
}
