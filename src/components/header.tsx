import Candle from '@/assets/images/candle.svg?react'
import Dots from '@/assets/images/dots.svg?react'
import PlusEqual from '@/assets/images/plus-equal.svg?react'
import Swords from '@/assets/images/swords.svg?react'
import { Button } from '@/shared/ui'
import { Menu } from 'lucide-react'
import { CoupleCoins } from './couple-coins'

export const Header = () => {
	return (
		<>
			<header className='pt-17.5 px-4 pr-3 pb-1.5 flex justify-between border-b-1'>
				<nav className='flex gap-3.5'>
					<h2 className='font-semibold text-lg antialiased'>USDⓈ-M</h2>
					<h2 className='font-semibold text-lg text-muted'>COIN-M</h2>
					<h2 className='font-semibold text-lg text-muted'>Опционы</h2>
				</nav>
				<Menu className='scale-x-75' strokeWidth={3} radius={0} />
			</header>
			<div className='sticky top-0 flex items-start justify-between bg-background p-4 pt-3.5 pb-2'>
				<CoupleCoins />
				<div className='flex items-center gap-5'>
					<Button className='p-0! size-3.5' variant='ghost' size='icon'>
						<Swords className='fill-muted size-3.5' />
					</Button>
					<Button className='p-0! size-4' variant='ghost' size='icon'>
						<Candle className='fill-muted size-5' />
					</Button>
					<Button className='p-0! size-4' variant='ghost' size='icon'>
						<PlusEqual className='fill-muted size-4.5' />
					</Button>
					<Button
						className='relative p-0! size-4 before:absolute before:-top-1.5 before:-right-1.5 before:block before:size-1.5 before:bg-accent before:rounded-full'
						variant='ghost'
						size='icon'
					>
						<Dots className='fill-muted size-3.5' />
					</Button>
				</div>
			</div>
		</>
	)
}
