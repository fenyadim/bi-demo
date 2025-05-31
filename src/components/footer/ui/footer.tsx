import Arrow from '@/assets/images/arrow-down.svg?react'
import { navItems } from '../constants'
import { NavButton } from './nav-button'

export const Footer = () => {
	return (
		<footer className='fixed bottom-0 left-0 right-0 bg-background'>
			<div className='flex justify-between items-center border-y-1 py-1.5 px-3.5'>
				<p>График TONUSDT Бессрочный</p>
				<Arrow className='size-4 fill-muted rotate-180' />
			</div>
			<div className='grid grid-cols-5 mb-1'>
				{navItems.map(items => (
					<NavButton key={items.title} {...items} />
				))}
			</div>
			<div className='flex items-center justify-center py-[9px]'>
				<span className='block h-1 w-[158px] rounded-full bg-foreground' />
			</div>
		</footer>
	)
}
