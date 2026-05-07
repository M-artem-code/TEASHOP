export const getContentType = () => ({
	'Content-type': 'application/json'
})

export const errorCatch = (error: unknown): string => {
	const err = error as {
		response?: { data?: { message?: unknown } }
		message?: unknown
	}
	const message = err?.response?.data?.message

	return message
		? typeof err.response?.data?.message === 'object'
			? message[0]
			: message
		: (err?.message as string)
}
