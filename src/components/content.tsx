import Arrow from '@/assets/images/arrow-down.svg?react'
import BookOrders from '@/assets/images/book-orders.svg?react'
import type { IStakes } from '@/shared/types/stakes'
import { Button } from '@/shared/ui'
import { ControlContainer } from './control-container.'
import { StockStakes } from './stock-stakes'

export const Content = () => {
	const stakes: IStakes[] = [
		{
			price: 109728.1,
			amount: 1980,
			fillProcent: 1,
		},
		{
			price: 109727.9,
			amount: 109.8,
			fillProcent: 1,
		},
		{
			price: 109727.4,
			amount: 109.8,
			fillProcent: 1,
		},
		{
			price: 109727.0,
			amount: 109.8,
			fillProcent: 1,
		},
		{
			price: 109726.8,
			amount: 109.8,
			fillProcent: 1,
		},
		{
			price: 109726.6,
			amount: 109.8,
			fillProcent: 1,
		},
		{
			price: 109726.5,
			amount: 933880,
			fillProcent: 1,
		},
	]

	return (
		<div className='h-full grid grid-cols-[1.3fr_2fr] gap-4 p-4 pt-0'>
			<section className='h-full w-full flex flex-col gap-1'>
				<div>
					<h3 className='border-b-1 border-dotted w-fit text-muted text-[10px] leading-3'>
						Ставка / Осталось
					</h3>
					<p>0,0065 % / 04:13:49</p>
				</div>
				<div className='flex justify-between mb-1 *:w-min *:text-muted *:text-[10px] *:leading-3'>
					<h3>Цена (USDT)</h3>
					<h3 className='text-end'>Сумма (USDT)</h3>
				</div>
				<StockStakes stakes={stakes} mode='short' />
				<div className='flex flex-col items-center my-0.5'>
					<h2 className='font-medium text-lg leading-6'>109726.5</h2>
					<p className='text-muted border-b-1 border-dotted w-fit'>109704.6</p>
				</div>
				<StockStakes stakes={stakes} mode='long' />
				<div className='mt-2 grid grid-cols-[1fr_16px] items-center gap-2'>
					<Button
						className='flex justify-between h-fit font-normal text-muted text-xs w-full py-0.5 px-2 pr-1.5 rounded-sm'
						variant='secondary'
						size='icon'
					>
						0.1
						<Arrow className='fill-muted' />
					</Button>
					<Button className='size-3.5 px-1' variant='ghost' size='icon'>
						<BookOrders className='size-3.5' />
					</Button>
				</div>
			</section>
			<ControlContainer />
		</div>
	)
}
