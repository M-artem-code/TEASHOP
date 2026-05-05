export const getReviewWordWithEnding = (reviewCount: number) => {
	const count = Math.abs(reviewCount)
	const mod100 = count % 100
	const mod10 = count % 10

	if (mod100 >= 11 && mod100 <= 14) return `${reviewCount} отзывов`
	if (mod10 === 1) return `${reviewCount} отзыв`
	if (mod10 >= 2 && mod10 <= 4) return `${reviewCount} отзыва`
	return `${reviewCount} отзывов`
}
