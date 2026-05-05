'use client'

import { type PropsWithChildren, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { IReviewInput } from '@/app/shared/types/review.interface'

import { useCreateReview } from '@/hooks/queries/reviews/useCreateReview'

import { Button } from '../button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../dialog'
import { Label } from '../form-elements/label'
import { Textarea } from '../textarea'

interface ReviewModalProps {
	storeId: string
}

export function ReviewModal({
	children,
	storeId
}: PropsWithChildren<ReviewModalProps>) {
	const [isOpen, setIsOpen] = useState(false)

	const form = useForm<IReviewInput>({
		mode: 'onChange',
		defaultValues: {
			rating: 0,
			text: ''
		}
	})

	const { createReview, isLoadingCreate } = useCreateReview(storeId)

	const rating = form.watch('rating')

	const onSubmit: SubmitHandler<IReviewInput> = data => {
		createReview(data, {
			onSuccess: () => {
				form.reset()
				setIsOpen(false)
			}
		})
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={open => {
				setIsOpen(open)
				if (!open) form.reset()
			}}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Создание отзыва</DialogTitle>
					<DialogDescription>
						Для создания отзыва необходимо указать рейтинг и текст.
					</DialogDescription>
				</DialogHeader>

				<form
					className='space-y-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<input
						type='hidden'
						{...form.register('rating', {
							required: 'Рейтинг обязателен',
							min: { value: 1, message: 'Минимум 1 звезда' },
							max: { value: 5, message: 'Максимум 5 звезд' },
							valueAsNumber: true
						})}
					/>

					<div className='space-y-2'>
						<Label>Рейтинг</Label>
						<div className='flex gap-1'>
							{[1, 2, 3, 4, 5].map(star => (
								<button
									key={star}
									type='button'
									disabled={isLoadingCreate}
									className={`text-3xl leading-none transition-colors ${
										star <= (rating ?? 0)
											? 'text-yellow-500'
											: 'text-gray-300'
									}`}
									onClick={() => {
										form.setValue('rating', star, {
											shouldDirty: true,
											shouldTouch: true,
											shouldValidate: true
										})
										form.clearErrors('rating')
									}}
									aria-label={`Рейтинг ${star}`}
								>
									★
								</button>
							))}
						</div>
						{form.formState.errors.rating && (
							<p className='text-sm text-destructive'>
								{form.formState.errors.rating.message}
							</p>
						)}
					</div>

					<div className='space-y-2'>
						<Label htmlFor='text'>Текст</Label>
						<Textarea
							id='text'
							placeholder='Напишите ваш отзыв'
							disabled={isLoadingCreate}
							{...form.register('text', {
								required: 'Текст обязателен',
								minLength: {
									value: 10,
									message: 'Минимум 10 символов'
								}
							})}
						/>
						{form.formState.errors.text && (
							<p className='text-sm text-destructive'>
								{form.formState.errors.text.message}
							</p>
						)}
					</div>

					<div className='flex justify-end'>
						<Button
							type='submit'
							variant='default'
							disabled={isLoadingCreate}
						>
							Отправить
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
