'use client'

import { Package, Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ICategory } from '@/app/shared/types/category.interface'
import { IColor } from '@/app/shared/types/color.interface'
import { IProduct, IProductInput } from '@/app/shared/types/product.interface'

import { Button } from '@/components/ui/button'
import ImageUpload from '@/components/ui/data-table/image-upload/image-upload'
import { Input } from '@/components/ui/form-elements/input'
import { Heading } from '@/components/ui/heading'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { useCreateProduct } from '@/hooks/queries/products/useCreateProduct'
import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProduct'
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct'

interface ProductFormProps {
	product: IProduct | null
	categories: ICategory[]
	colors: IColor[]
}

export function ProductForm({ product, categories, colors }: ProductFormProps) {
	const { createProduct, isLoadingCreate } = useCreateProduct()
	const { updateProduct, isLoadingUpdate } = useUpdateProduct()
	const { deleteProduct, isLoadingDelete } = useDeleteProduct()

	const title = product ? 'Изменить данные' : 'Создать товар'
	const description = product
		? 'Изменить данные о товаре'
		: 'Добавить новый товар в магазин'
	const action = product ? 'Сохранить' : 'Создать'

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<IProductInput>({
		mode: 'onChange',
		values: {
			title: product?.title || '',
			description: product?.description || '',
			images: product?.images || [],
			price: product?.price || 0,
			categoryId: product?.category?.id || '',
			colorId: product?.color?.id || ''
		}
	})

	const onSubmit: SubmitHandler<IProductInput> = data => {
		data.price = Number(data.price)
		if (product) updateProduct(data)
		else createProduct(data)
	}

	const isLoading = isLoadingCreate || isLoadingUpdate

	return (
		<div className='space-y-6 p-6'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<Heading title={title} description={description} />
				{product && product.id && (
					<ConfirmModal handleClick={() => deleteProduct(product.id)}>
						<Button
							size='sm'
							variant='destructive'
							disabled={isLoadingDelete}
							className='ml-auto'
						>
							<Trash className='size-4 mr-2' />
							<span>Удалить продукт</span>
						</Button>
					</ConfirmModal>
				)}
			</div>

			{/* Form Card */}
			<div className='rounded-lg border bg-card p-6 shadow-sm'>
				<div className='mb-6 flex items-center gap-3 pb-4 border-b'>
					<div className='flex size-10 items-center justify-center rounded-lg bg-primary/10'>
						<Package className='size-5 text-primary' />
					</div>
					<div>
						<h3 className='text-lg font-semibold'>
							Информация о товаре
						</h3>
						<p className='text-sm text-muted-foreground'>
							Заполните данные о товаре
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					{/* Title Field */}
					<div className='space-y-2'>
						<label
							htmlFor='images'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Картинки
							<span className='text-destructive ml-1'>*</span>
						</label>
						<ImageUpload
							isDisabled={isLoadingCreate || isLoadingUpdate}
							onChange={value => setValue('images', value)}
							value={watch('images') || []}
						/>
						{errors.images && (
							<p className='text-destructive text-sm flex items-center gap-1'>
								{errors.images.message}
							</p>
						)}
					</div>
					<div className='space-y-2'>
						<label
							htmlFor='title'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Название товара
							<span className='text-destructive ml-1'>*</span>
						</label>
						<Input
							id='title'
							placeholder='Введите название товара'
							disabled={isLoading}
							{...register('title', {
								required: 'Название обязательно для заполнения'
							})}
							className={errors.title ? 'border-destructive' : ''}
						/>
						{errors.title && (
							<p className='text-destructive text-sm flex items-center gap-1'>
								{errors.title.message}
							</p>
						)}
					</div>

					{/* Description Field */}
					<div className='space-y-2'>
						<label
							htmlFor='description'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Описание товара
						</label>
						<Textarea
							id='description'
							placeholder='Опишите ваш товар...'
							disabled={isLoading}
							{...register('description')}
							rows={5}
							className='resize-none'
						/>
						{errors.description && (
							<p className='text-destructive text-sm flex items-center gap-1'>
								{errors.description.message}
							</p>
						)}
					</div>

					{/* Price Field */}
					<div className='space-y-2'>
						<label
							htmlFor='price'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Цена
							<span className='text-destructive ml-1'>*</span>
						</label>
						<Input
							id='price'
							type='number'
							placeholder='Введите цену'
							disabled={isLoading}
							{...register('price', {
								required: 'Цена обязательна для заполнения',
								valueAsNumber: true
							})}
							className={errors.price ? 'border-destructive' : ''}
						/>
						{errors.price && (
							<p className='text-destructive text-sm flex items-center gap-1'>
								{errors.price.message}
							</p>
						)}
					</div>

					{/* Category Select */}
					<div className='space-y-2'>
						<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							Категория
							<span className='text-destructive ml-1'>*</span>
						</label>
						<Select
							value={watch('categoryId')}
							onValueChange={value =>
								setValue('categoryId', value)
							}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Выберите категорию'>
									{
										categories.find(
											c => c.id === watch('categoryId')
										)?.title
									}
								</SelectValue>
							</SelectTrigger>
							<SelectContent className='w-full'>
								{categories.map(category => (
									<SelectItem
										key={category.id}
										value={category.id}
									>
										<span className='font-medium'>
											{category.title}
										</span>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.categoryId && (
							<p className='text-destructive text-sm flex items-center gap-1'>
								{errors.categoryId.message}
							</p>
						)}
					</div>

					{/* Color Select */}
					<div className='space-y-2'>
						<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							Цвет
							<span className='text-destructive ml-1'>*</span>
						</label>
						<Select
							value={watch('colorId')}
							onValueChange={value => setValue('colorId', value)}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Выберите цвет'>
									{(() => {
										const selectedColor = colors.find(
											c => c.id === watch('colorId')
										)
										return selectedColor ? (
											<div className='flex items-center gap-2'>
												<div
													className='size-4 rounded-full border border-border shadow-sm'
													style={{
														backgroundColor:
															selectedColor.value
													}}
												/>
												<span>
													{selectedColor.name}
												</span>
											</div>
										) : null
									})()}
								</SelectValue>
							</SelectTrigger>
							<SelectContent className='w-full'>
								{colors.map(color => (
									<SelectItem key={color.id} value={color.id}>
										<div className='flex items-center gap-3'>
											<div
												className='size-5 rounded-full border border-border shadow-sm ring-2 ring-offset-1 ring-offset-background'
												style={{
													backgroundColor: color.value
												}}
											/>
											<span className='font-medium'>
												{color.name}
											</span>
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.colorId && (
							<p className='text-destructive text-sm flex items-center gap-1'>
								{errors.colorId.message}
							</p>
						)}
					</div>

					{/* Actions */}
					<div className='flex items-center gap-3 pt-4 border-t'>
						<Button
							type='submit'
							disabled={isLoading}
							size='lg'
							className='min-w-32'
						>
							{isLoading ? (
								<>
									<div className='mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
									{product ? 'Сохранение...' : 'Создание...'}
								</>
							) : (
								action
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
