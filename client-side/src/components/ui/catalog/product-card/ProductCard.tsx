import { IProduct } from '@/app/shared/types/product.interface'

interface ProductCardProps {
	product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
	return <div>{product.title}</div>
}
