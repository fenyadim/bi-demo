import { cn } from '@/lib/utils'
import { modeToStyle } from '@/shared/constants'
import type { ModeType } from '@/shared/types'
import type { CSSProperties, FunctionComponent, ReactNode } from 'react'

interface IOrderItem {
	title: string
	children: ReactNode
	mode?: ModeType
	size?: 'base' | 'lg'
	align?: 'start' | 'end'
	Icon?: FunctionComponent<React.SVGProps<SVGSVGElement>>
	underline?: boolean
	className?: string
}

export const OrderItem = ({
	title,
	children,
	mode,
	size = 'base',
	align = 'start',
	Icon,
	underline = true,
	className,
}: IOrderItem) => {
	const fontColor: CSSProperties = {
		color: `var(--${modeToStyle[mode!]})`,
	}

	const alignLabel: CSSProperties = {
		alignItems: align,
	}

	return (
		<div className={cn('flex flex-col', className)} style={alignLabel}>
			<label
				className={cn(
					'text-muted  text-[12px] leading-4 tracking-normal  w-fit',
					{
						'border-b-1 border-dotted': underline,
						'mb-0.5': !underline,
					}
				)}
			>
				{title}
				{Icon && <Icon />}
			</label>
			<p
				className={cn({
					'text-lg font-medium': size === 'lg',
					'text-sm': size === 'base',
				})}
				style={mode && fontColor}
			>
				{children}
			</p>
		</div>
	)
}
