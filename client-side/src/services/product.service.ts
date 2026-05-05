import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/app/config/api.config'
import { IProduct, IProductInput } from '@/app/shared/types/product.interface'

interface IProductPageResponse {
	items: IProduct[]
	nextCursor: string | null
}

class ProductService {
	async getAll(searchParams?: string | null) {
		try {
			const { data } = await axiosClassic<IProduct[]>({
				url: API_URL.products(),
				method: 'GET',
				params: searchParams ? { searchTerm: searchParams } : undefined
			})

			return data || []
		} catch (error: any) {
			const status = error?.response?.status
			const responseData = error?.response?.data
			const url = error?.config?.baseURL
				? `${error.config.baseURL}${error?.config?.url || ''}`
				: error?.config?.url

			console.error('ProductService.getAll failed', {
				status,
				url,
				params: error?.config?.params,
				responseData
			})
			throw error
		}
	}

	async getPage(params: {
		searchTerm?: string
		cursor?: string | null
		take?: number
	}) {
		const { data } = await axiosClassic<IProductPageResponse>({
			url: API_URL.products(),
			method: 'GET',
			params: {
				searchTerm: params.searchTerm,
				take: params.take,
				cursor: params.cursor ?? undefined
			}
		})

		return data
	}

	async getByStoreId(storeId: string) {
		const { data } = await axiosWithAuth<IProduct[]>({
			url: API_URL.products(`/by-storeId/${storeId}`),
			method: 'GET'
		})

		return data
	}

	async getById(id: string) {
		const { data } = await axiosClassic<IProduct>({
			url: API_URL.products(`/by-id/${id}`),
			method: 'GET'
		})

		return data
	}

	async getByCategoryId(categoryId: string) {
		const { data } = await axiosClassic<IProduct[]>({
			url: API_URL.products(`/by-category/${categoryId}`),
			method: 'GET'
		})

		return data
	}

	async getMostPopular() {
		const { data } = await axiosClassic<IProduct[]>({
			url: API_URL.products(`/most-popular`),
			method: 'GET'
		})

		return data
	}

	async getSimilar(id: string) {
		const { data } = await axiosClassic<IProduct[]>({
			url: API_URL.products(`/similar/${id}`),
			method: 'GET'
		})

		return data
	}

	async create(storeId: string, data: IProductInput) {
		const { data: createdProduct } = await axiosWithAuth<IProduct>({
			url: API_URL.products(`/${storeId}`),
			method: 'POST',
			data
		})

		return createdProduct
	}

	async update(id: string, data: IProductInput) {
		const { data: updatedProduct } = await axiosWithAuth<IProduct>({
			url: API_URL.products(`/${id}`),
			method: 'PATCH',
			data
		})

		return updatedProduct
	}

	async delete(id: string) {
		const { data: deletedProduct } = await axiosWithAuth<IProduct>({
			url: API_URL.products(`/${id}`),
			method: 'DELETE'
		})

		return deletedProduct
	}
}

export const productService = new ProductService()
