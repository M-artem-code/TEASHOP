export const SERVER_URL =
	(process.env.NEXT_PUBLIC_SERVER_URL as string | undefined) ||
	(process.env.SERVER_URL as string | undefined) ||
	(() => {
		throw new Error(
			'Missing SERVER URL. Set NEXT_PUBLIC_SERVER_URL (recommended) or SERVER_URL in environment variables.'
		)
	})()

export const API_URL = {
	root: (url = '') => `${url ? url : ''}`,

	auth: (url = '') => `${API_URL.root(`/auth${url}`)}`,
	users: (url = '') => `${API_URL.root(`/users${url}`)}`,
	stores: (url = '') => `${API_URL.root(`/stores${url}`)}`,
	categories: (url = '') => `${API_URL.root(`/categories${url}`)}`,
	colors: (url = '') => `${API_URL.root(`/colors${url}`)}`,
	products: (url = '') => `${API_URL.root(`/products${url}`)}`,
	reviews: (url = '') => `${API_URL.root(`/reviews${url}`)}`,
	orders: (url = '') => `${API_URL.root(`/orders${url}`)}`,
	statistics: (url = '') => `${API_URL.root(`/statistics${url}`)}`,
	files: (url = '') => `${API_URL.root(`/files${url}`)}`
}
