import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { CreateColors } from './create-colors'

export const metadata: Metadata = {
	title: 'Создание цвета',
	...NO_INDEX_PAGE
}

export default function CreateProdutcPage() {
	return <CreateColors />
}
