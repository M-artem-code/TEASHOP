'use client'

import { Heading } from '@/components/ui/heading'


import styles from './Store.module.scss'
import { MainStatistics } from './statistics/mainStatistics'

export function Store() {

	return (
		<div className={`${styles.wrapper}, p-6`}>
			<Heading title='Статистика' />
			<MainStatistics />
		</div>
	)
}
