import Arrow from '@/assets/images/arrow-down.svg?react'
import { Button } from '@/shared/ui'

export const CoupleCoins = () => {
	return (
		<Button className='flex flex-col items-start gap-0 p-0' variant='ghost'>
			<div className='flex items-center gap-0.5'>
				<h2 className='text-lg leading-4'>BTCUSDT</h2>
				<span className='bg-secondary font-light text-[10px] tracking-wider ml-0.5 py-[1px] px-[2.5px] rounded-xs'>
					Бесср
				</span>
				<Arrow className='fill-foreground size-4.5' />
			</div>
			<p className='text-success text-xs'>+2,45 %</p>
		</Button>
	)
}
