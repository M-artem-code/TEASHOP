/** UI-логика количества в корзине (не трогает cart.store). */

export const CART_QTY_MIN = 1
export const CART_QTY_MAX = 99

export function clampCartQuantity(quantity: number): number {
	return Math.min(
		CART_QTY_MAX,
		Math.max(CART_QTY_MIN, Math.floor(quantity))
	)
}

export function canIncrementCartQuantity(current: number): boolean {
	return current < CART_QTY_MAX
}

export function getIncrementedCartQuantity(current: number): number {
	return clampCartQuantity(current + 1)
}

/** При 1 возвращает 'remove' — позицию убираем из корзины. */
export function getDecrementedCartQuantity(
	current: number
): number | 'remove' {
	if (current <= CART_QTY_MIN) return 'remove'
	return current - 1
}
