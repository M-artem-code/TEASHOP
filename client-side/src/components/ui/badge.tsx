import * as React from 'react'

import { cn } from '@/lib/utils'

function Badge({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<'span'> & {
	variant?: 'default' | 'success' | 'warning' | 'secondary'
}) {
	return (
		<span
			data-slot='badge'
			data-variant={variant}
			className={cn(
				'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ring-foreground/10',
				variant === 'default' && 'bg-primary/10 text-primary',
				variant === 'secondary' && 'bg-muted text-foreground',
				variant === 'success' && 'bg-emerald-500/10 text-emerald-700',
				variant === 'warning' && 'bg-amber-500/10 text-amber-700',
				className
			)}
			{...props}
		/>
	)
}

export { Badge }
