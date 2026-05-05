import toast from 'react-hot-toast'

import { IProduct } from '@/app/shared/types/product.interface'

import { Button } from '@/components/ui/button'

import { useCartStore } from '@/store/cart.store'

interface AddToCartButtonProps {
	product: IProduct
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
	const addItem = useCartStore(s => s.addItem)

	return (
		<Button
			variant='default'
			size='lg'
			className='w-full'
			onClick={() => {
				addItem(product)
				toast.success('Добавлено в корзину')
			}}
		>
			Добавить в корзину
		</Button>
	)
}
