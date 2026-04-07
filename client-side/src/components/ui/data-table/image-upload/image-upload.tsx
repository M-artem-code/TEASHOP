import { ImagePlus, X } from 'lucide-react'
import Image from 'next/image'

import { Button } from '../../button'

import { useUpload } from './use-upload'

interface ImageUploadProps {
	isDisabled: boolean
	onChange: (value: string[]) => void
	value: string[]
}

export default function ImageUpload({
	isDisabled,
	onChange,
	value
}: ImageUploadProps) {
	const { handleButtonClick, isUploading, fileInputRef, handleFileChange } =
		useUpload(onChange)

	const handleRemove = (urlToRemove: string) => {
		onChange(value.filter(url => url !== urlToRemove))
	}

	return (
		<div className='space-y-4'>
			{value.length > 0 && (
				<div className='flex flex-wrap gap-4'>
					{value.map(url => (
						<div
							key={url}
							className='group relative flex-shrink-0 overflow-hidden rounded-lg border bg-muted/50'
						>
							<Image
								src={url}
								alt='Uploaded image'
								width={150}
								height={150}
								className='object-cover'
							/>
							<button
								type='button'
								onClick={() => handleRemove(url)}
								disabled={isDisabled || isUploading}
								className='absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50'
							>
								<X className='size-4' />
							</button>
						</div>
					))}
				</div>
			)}
			<Button
				variant='secondary'
				type='button'
				disabled={isDisabled || isUploading}
				onClick={handleButtonClick}
			>
				<ImagePlus className='size-4' />
				{isUploading ? 'Загрузка...' : 'Загрузить картинки'}
			</Button>
			<input
				type='file'
				multiple
				className='hidden'
				ref={fileInputRef}
				onChange={handleFileChange}
				disabled={isDisabled}
			/>
		</div>
	)
}
