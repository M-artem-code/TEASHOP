'use client'

import { Palette, Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
	ICategory,
	ICategoryInput
} from '@/app/shared/types/category.interface'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/form-elements/input'
import { Heading } from '@/components/ui/heading'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'

import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory'
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory'

interface CategoryFormProps {
	category: ICategory | null
}

export function CategoryForm({ category }: CategoryFormProps) {
	const { createCategory, isLoadingCreate } = useCreateCategory()
	const { updateCategory, isLoadingUpdate } = useUpdateCategory()
	const { deleteCategory, isLoadingDelete } = useDeleteCategory()

	const title = category ? 'Изменить данные' : 'Создать категорию'
	const description = category
		? 'Изменить данные о категории'
		: 'Добавить новую категорию в магазин'
	const action = category ? 'Сохранить' : 'Создать'

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ICategoryInput>({
		mode: 'onChange',
		values: category || {
			title: '',
			description: ''
		}
	})

	const onSubmit: SubmitHandler<ICategoryInput> = data => {
		if (category) updateCategory(data)
		else createCategory(data)
	}

	const isLoading = isLoadingCreate || isLoadingUpdate

	return (
		<div className='space-y-6 p-6'>
			<div className='flex items-center justify-between'>
				<Heading title={title} description={description} />
				{category && category.id && (
					<ConfirmModal handleClick={() => deleteCategory()}>
						<Button
							size='sm'
							variant='destructive'
							disabled={isLoadingDelete}
							className='ml-auto'
						>
							<Trash className='size-4 mr-2' />
							<span>Удалить категорию</span>
						</Button>
					</ConfirmModal>
				)}
			</div>

			<div className='rounded-lg border bg-card p-6 shadow-sm'>
				<div className='mb-6 flex items-center gap-3 pb-4 border-b'>
					<div className='flex size-10 items-center justify-center rounded-lg bg-primary/10'>
						<Palette className='size-5 text-primary' />
					</div>
					<div>
						<h3 className='text-lg font-semibold'>
							Информация о категории
						</h3>
						<p className='text-sm text-muted-foreground'>
							Заполните данные о категории
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-2'>
						<label
							htmlFor='name'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Название категории
							<span className='text-destructive ml-1'>*</span>
						</label>
						<Input
							id='title'
							placeholder='Введите название категории'
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

					<div className='space-y-2'>
						<label
							htmlFor='description'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Описание
							<span className='text-destructive ml-1'>*</span>
						</label>
						<div className='flex items-center gap-4'>
							<Input
								id='description'
								placeholder='Введите описание категории'
								disabled={isLoading}
								{...register('description', {
									required:
										'Описание обязательно для заполнения'
								})}
								className={
									errors.description
										? 'border-destructive'
										: ''
								}
							/>
						</div>
						{errors.description && (
							<p className='text-destructive text-sm flex items-center gap-1'>
								{errors.description.message}
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
									{category ? 'Сохранение...' : 'Создание...'}
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
