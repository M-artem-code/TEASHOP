'use client'

import { Settings as SettingsIcon, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { IStoreEdit } from '@/app/shared/types/store.inteface'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { Textarea } from '@/components/ui/textarea'

import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore'
import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore'

export function Settings() {
	const { store, updateStore, isLoadingUpdate } = useUpdateStore()
	const { deleteStore, isLoadingDelete } = useDeleteStore()

	const form = useForm<IStoreEdit>({
		mode: 'onChange',
		values: {
			title: store?.title || '',
			description: store?.description || ''
		}
	})

	const onSubmit = form.handleSubmit(data => {
		updateStore(data)
	})

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex items-center justify-between mx-auto max-w-4xl pt-6'>
				<div className='space-y-1'>
					<Heading
						title='Настройки'
						description='Управление настройками магазина'
					/>
				</div>
				<ConfirmModal
					handleClick={() => store?.id && deleteStore(store.id)}
				>
					<Button
						size='icon'
						variant='destructive'
						disabled={isLoadingDelete}
						className='shrink-0'
					>
						<Trash className='size-4' />
					</Button>
				</ConfirmModal>
			</div>

			{/* Form Card */}
			<div className='rounded-lg border bg-card p-6 shadow-sm'>
				<div className='mb-6 flex items-center gap-3 pb-4 border-b'>
					<div className='flex size-10 items-center justify-center rounded-lg bg-primary/10'>
						<SettingsIcon className='size-5 text-primary' />
					</div>
					<div>
						<h3 className='text-lg font-semibold'>
							Информация о магазин
						</h3>
						<p className='text-sm text-muted-foreground'>
							Обновите название и описание вашего магазина
						</p>
					</div>
				</div>

				<form onSubmit={onSubmit} className='space-y-6'>
					{/* Title Field */}
					<div className='space-y-2'>
						<label
							htmlFor='title'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Название магазина
							<span className='text-destructive ml-1'>*</span>
						</label>
						<Input
							id='title'
							placeholder='Введите название магазина'
							disabled={isLoadingUpdate}
							{...form.register('title', {
								required: 'Название обязательно для заполнения'
							})}
							className={
								form.formState.errors.title
									? 'border-destructive'
									: ''
							}
						/>
						{form.formState.errors.title && (
							<p className='text-destructive text-sm flex items-center gap-1'>
								{form.formState.errors.title.message}
							</p>
						)}
					</div>

					{/* Description Field */}
					<div className='space-y-2'>
						<label
							htmlFor='description'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Описание магазина
						</label>
						<Textarea
							id='description'
							placeholder='Расскажите о вашем магазине, товарах и услугах...'
							disabled={isLoadingUpdate}
							{...form.register('description')}
							rows={5}
							className='resize-none'
						/>
						{form.formState.errors.description && (
							<p className='text-destructive text-sm flex items-center gap-1'>
								{form.formState.errors.description.message}
							</p>
						)}
					</div>

					{/* Actions */}
					<div className='flex items-center gap-3 pt-4 border-t'>
						<Button
							type='submit'
							disabled={isLoadingUpdate}
							size='lg'
							className='min-w-32'
						>
							{isLoadingUpdate ? (
								<>
									<div className='mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
									Сохранение...
								</>
							) : (
								'Сохранить изменения'
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
