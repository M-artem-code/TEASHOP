'use client'

import { Palette, Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IColor, IColorInput } from '@/app/shared/types/color.interface'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/form-elements/input'
import { Heading } from '@/components/ui/heading'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'

import { useCreateColor } from '@/hooks/queries/colors/useCreateColor'
import { useDeleteColor } from '@/hooks/queries/colors/useDeleteColor'
import { useUpdateColor } from '@/hooks/queries/colors/useUpdateColor'

interface ColorFormProps {
	color: IColor | null
}

export function ColorForm({ color }: ColorFormProps) {
	const { createColor, isLoadingCreate } = useCreateColor()
	const { updateColor, isLoadingUpdate } = useUpdateColor()
	const { deleteColor, isLoadingDelete } = useDeleteColor()

	const title = color ? 'Изменить данные' : 'Создать цвет'
	const description = color
		? 'Изменить данные о цвете'
		: 'Добавить новый цвет в магазин'
	const action = color ? 'Сохранить' : 'Создать'

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<IColorInput>({
		mode: 'onChange',
		values: {
			name: color?.name || '',
			value: color?.value || ''
		}
	})

	const onSubmit: SubmitHandler<IColorInput> = data => {
		if (color) updateColor(data)
		else createColor(data)
	}

	const isLoading = isLoadingCreate || isLoadingUpdate

	return (
		<div className='space-y-6 p-6'>
			<div className='flex items-center justify-between'>
				<Heading title={title} description={description} />
				{color && color.id && (
					<ConfirmModal handleClick={() => deleteColor()}>
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

			<div className='rounded-lg border bg-card p-6 shadow-sm'>
				<div className='mb-6 flex items-center gap-3 pb-4 border-b'>
					<div className='flex size-10 items-center justify-center rounded-lg bg-primary/10'>
						<Palette className='size-5 text-primary' />
					</div>
					<div>
						<h3 className='text-lg font-semibold'>
							Информация о цвете
						</h3>
						<p className='text-sm text-muted-foreground'>
							Заполните данные о цвете
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-2'>
						<label
							htmlFor='name'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Название цвета
							<span className='text-destructive ml-1'>*</span>
						</label>
						<Input
							id='name'
							placeholder='Введите название цвета'
							disabled={isLoading}
							{...register('name', {
								required: 'Название обязательно для заполнения'
							})}
							className={errors.name ? 'border-destructive' : ''}
						/>
						{errors.name && (
							<p className='text-destructive text-sm flex items-center gap-1'>
								{errors.name.message}
							</p>
						)}
					</div>

					<div className='space-y-2'>
						<label
							htmlFor='value'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Значение цвета (HEX)
							<span className='text-destructive ml-1'>*</span>
						</label>
						<div className='flex items-center gap-4'>
							<Input
								id='value'
								placeholder='#000000'
								disabled={isLoading}
								{...register('value', {
									required: 'Значение цвета обязательно',
									pattern: {
										value: /^#[0-9A-Fa-f]{6}$/,
										message:
											'Неверный формат (используйте #RRGGBB)'
									}
								})}
								className={
									errors.value ? 'border-destructive' : ''
								}
							/>
							<div className='flex items-center gap-3'>
								<input
									type='color'
									value={watch('value') || '#000000'}
									onChange={e =>
										setValue('value', e.target.value)
									}
									disabled={isLoading}
									className='size-10 cursor-pointer rounded-md border border-input'
								/>
							</div>
						</div>
						{errors.value && (
							<p className='text-destructive text-sm flex items-center gap-1'>
								{errors.value.message}
							</p>
						)}
					</div>

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
									{color ? 'Сохранение...' : 'Создание...'}
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
