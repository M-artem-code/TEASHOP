export interface ICategory {
	id: string
	title: string
	description: string
	storeId: string
	createdAt: Date
}

export type ICategoryInput = Pick<ICategory, 'title' | 'description'>
