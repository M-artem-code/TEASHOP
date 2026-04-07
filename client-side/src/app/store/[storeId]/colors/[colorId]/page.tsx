import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ColorEdit } from './colorEdit'

export const metadata: Metadata = {
	title: 'Настройки цвета',
	...NO_INDEX_PAGE
}

export default function ProductEditPage() {
	return <ColorEdit />
}
