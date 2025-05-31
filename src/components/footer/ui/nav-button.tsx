import { cn } from '@/lib/utils'
import { Button } from '@/shared/ui'
import type { FunctionComponent } from 'react'

export interface INavButton {
	title: string
	Icon: FunctionComponent<React.SVGProps<SVGSVGElement>>
	isActive?: boolean
}

export const NavButton = ({ title, Icon, isActive = false }: INavButton) => {
	return (
		<Button
			className={cn(
				'flex flex-col gap-2 h-fit px-6! text-muted text-[10px] font-normal tracking-wider',
				{
					'text-foreground': isActive,
				}
			)}
			variant='ghost'
		>
			<Icon className='size-4' />
			{title}
		</Button>
	)
}
