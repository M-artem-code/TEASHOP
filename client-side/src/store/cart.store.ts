'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { ICartItem } from '@/app/shared/types/cart.interface'
import { IProduct } from '@/app/shared/types/product.interface'

interface CartState {
	items: ICartItem[]

	addItem: (product: IProduct, quantity?: number) => void
	removeItem: (productId: string) => void
	setQuantity: (productId: string, quantity: number) => void
	clearCart: () => void
	clearStore: (storeId: string) => void
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],

			addItem: (product, quantity = 1) => {
				const qty = Math.max(1, Math.floor(quantity))
				const items = get().items
				const existing = items.find(i => i.id === product.id)

				if (existing) {
					set({
						items: items.map(i =>
							i.id === product.id
								? { ...i, quantity: i.quantity + qty }
								: i
						)
					})
					return
				}

				set({
					items: [
						...items,
						{
							id: product.id,
							product,
							quantity: qty,
							price: product.price
						}
					]
				})
			},

			removeItem: productId =>
				set({ items: get().items.filter(i => i.id !== productId) }),

			setQuantity: (productId, quantity) => {
				const qty = Math.max(1, Math.floor(quantity))
				set({
					items: get().items.map(i =>
						i.id === productId ? { ...i, quantity: qty } : i
					)
				})
			},

			clearCart: () => set({ items: [] }),

			clearStore: storeId =>
				set({
					items: get().items.filter(i => i.product.store.id !== storeId)
				})
		}),
		{
			name: 'teashop-cart',
			version: 1,
			storage: createJSONStorage(() => localStorage)
		}
	)
)

export function getCartTotal(items: ICartItem[]) {
	return items.reduce((sum, i) => sum + i.price * i.quantity, 0)
}

export function groupCartByStore(items: ICartItem[]) {
	return items.reduce<Record<string, ICartItem[]>>((acc, item) => {
		const storeId = item.product.store.id
		if (!acc[storeId]) acc[storeId] = []
		acc[storeId].push(item)
		return acc
	}, {})
}
