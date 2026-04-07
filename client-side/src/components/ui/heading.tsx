import { cn } from '@/lib/utils'

interface HeadingProps {
	title: string
	description?: string
	className?: string
	size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Heading({
	title,
	description,
	className,
	size = 'lg'
}: HeadingProps) {
	const sizeClasses = {
		sm: 'text-lg font-semibold',
		md: 'text-xl font-semibold',
		lg: 'text-2xl font-semibold',
		xl: 'text-3xl font-bold'
	}

	return (
		<div className={cn('space-y-2', className)}>
			<h2 className={cn(sizeClasses[size], 'tracking-tight')}>{title}</h2>
			{description && (
				<p className='text-sm text-muted-foreground leading-relaxed max-w-2xl'>
					{description}
				</p>
			)}
		</div>
	)
}
