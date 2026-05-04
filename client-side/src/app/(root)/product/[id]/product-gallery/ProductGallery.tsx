'use client'

import { useMemo, useState } from 'react'

import { IProduct } from '@/app/shared/types/product.interface'

import styles from './ProductGallery.module.css'

interface ProductGalleryProps {
	product: IProduct
}

export function ProductGallery({ product }: ProductGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

	const images = useMemo(() => {
		const list = product.images || []
		return list.map(image => {
			if (!image) return ''
			if (image.startsWith('http://') || image.startsWith('https://'))
				return image
			if (!baseUrl) return image
			return `${baseUrl}${image}`
		})
	}, [baseUrl, product.images])

	const currentImage = images[currentIndex] || images[0]

	return (
		<div className={styles.wrapper}>
			{currentImage ? (
				<img
					src={currentImage}
					alt={product.title}
					className={styles.main}
				/>
			) : (
				<div className={styles.mainPlaceholder}>Нет изображения</div>
			)}

			{images.length > 1 && (
				<div className={styles.gallery}>
					{images.map((image, index) => (
						<button
							type='button'
							key={`${image}-${index}`}
							onClick={() => setCurrentIndex(index)}
							className={`${styles.item} ${
								index === currentIndex ? styles.itemActive : ''
							}`}
						>
							<img
								src={image}
								alt={product.title}
								className={styles.thumb}
							/>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
