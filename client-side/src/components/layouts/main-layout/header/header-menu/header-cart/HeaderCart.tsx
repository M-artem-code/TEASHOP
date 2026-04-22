import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function HeaderCart() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost'>Корзина</Button>
			</SheetTrigger>
			<SheetContent>
				<Heading title='Корзина товаров' className='text-xl' />
			</SheetContent>
		</Sheet>
	)
}
