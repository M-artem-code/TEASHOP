export interface IColor {
	id: string
	name: string
	value: string
	storeId: string
	createdAt: string
}

export type IColorInput = Pick<IColor, 'name' | 'value'>
