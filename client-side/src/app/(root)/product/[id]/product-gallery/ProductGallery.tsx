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
		return list
			.map(image => {
				if (!image) return ''
				if (image.startsWith('http://') || image.startsWith('https://'))
					return image
				if (!baseUrl) return image
				if (image.startsWith('/')) return `${baseUrl}${image}`
				return `${baseUrl}/${image}`
			})
			.filter(Boolean)
	}, [baseUrl, product.images])

	const safeIndex = Math.min(currentIndex, Math.max(images.length - 1, 0))
	const currentImage = images[safeIndex]

	if (!currentImage) {
		return (
			<div className={styles.wrapper}>
				<div className={styles.mainPlaceholder}>Нет изображения</div>
			</div>
		)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.mainFrame}>
				<img
					src={currentImage}
					alt={product.title}
					className={styles.mainImage}
				/>
			</div>
			<div className={styles.gallery}>
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={`${styles.item} ${
							index === safeIndex ? styles.itemActive : ''
						}`}
					>
						<img
							src={image}
							alt={product.title}
							width={100}
							height={100}
							className={styles.thumb}
						/>
					</button>
				))}
			</div>
		</div>
	)
}
