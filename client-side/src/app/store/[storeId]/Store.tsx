'use client'

import { Heading } from '@/components/ui/heading'

import styles from './Store.module.scss'
import { MainStatistics } from './statistics/main-statistics/mainStatistics'
import { MiddleStatistics } from './statistics/middle-statistics/middleStatistics'

export function Store() {
	return (
		<div className={`${styles.wrapper}, p-6`}>
			<Heading title='Статистика' />
			<MainStatistics />
			<MiddleStatistics />
		</div>
	)
}
