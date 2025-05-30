import { cn } from '@/lib/utils'

interface IBadge {
	value: string
	className?: string
}

export const Badge = ({ value, className }: IBadge) => {
	return (
		<span
			className={cn(
				'bg-secondary font-light text-[9px] tracking-wider py-[1px] px-[4px] rounded-xs',
				className
			)}
		>
			{value}
		</span>
	)
}
