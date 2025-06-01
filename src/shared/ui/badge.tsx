import { cn } from '@/lib/utils'
import type { CSSProperties } from 'react'
import { modeToStyle } from '../constants'
import type { ModeType } from '../types'

interface IBadge {
	value: string
	mode?: ModeType
	className?: string
}

export const Badge = ({ value, className, mode }: IBadge) => {
	const modeColor: CSSProperties = {
		fontWeight: 'normal',
		backgroundColor: `oklch(from var(--${modeToStyle[mode!]}) l c h / 0.1) `,
		color: `var(--${modeToStyle[mode!]})`,
	}

	return (
		<span
			className={cn(
				'bg-secondary font-light text-[9px] tracking-wider py-[1px] px-[4px] rounded-xs',
				className
			)}
			style={mode && modeColor}
		>
			{value}
		</span>
	)
}
