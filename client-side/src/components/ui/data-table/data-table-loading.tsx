import { Card } from '../card'
import { CardContent } from '../card'
import { Loader } from '../loader'
import { Skeleton } from '../skeleton'

import styles from './DataTable.module.scss'

export const DataTableLoading = () => {
	return (
		<div className={styles.data_table}>
			<div className={styles.header}>
				<Skeleton width='200px' height='32px' />
				<Skeleton width='300px' height='40px' />
			</div>
			<Card>
				<CardContent>
					<div className={styles.loader_wrapper}>
						<Loader />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
