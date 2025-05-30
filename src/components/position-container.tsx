import History from '@/assets/images/history.svg?react'
import { Button, Checkbox } from '@/shared/ui'
import { OrderCard } from './order-card'

export const PositionContainer = () => {
	return (
		<div className='pt-2.5 *:p-4'>
			<div className='py-0! border-b-1 flex justify-between'>
				<div className='flex overflow-x-scroll scrollbar-hidden gap-[13px] *:text-[13px] *:tracking-wider *:text-muted *:font-medium *:pb-[7px] *:whitespace-nowrap'>
					<h2>Открытые ордера (0)</h2>
					<h2 className='relative text-foreground! before:absolute before:transform before:-translate-1/2 before:left-1/2 before:bottom-0 before:h-[2px] before:w-[15px] before:bg-accent'>
						Позиции (0)
					</h2>
					<h2>Сетка фьючерсов</h2>
				</div>
				<Button
					className='h-6 w-[42px] pb-[7px] flex justify-end'
					variant='ghost'
					size='icon'
				>
					<History className='fill-muted size-5' />
				</Button>
			</div>
			<div className='py-2.5!'>
				<div className='border-b-1 pb-2.5 flex justify-between'>
					<div className='flex items-center gap-1.5'>
						<Checkbox
							className='border-muted bg-background! size-3 rounded-[3px]'
							id='hidden'
						/>
						<label className='text-[11px] tracking-wider' htmlFor='hidden'>
							Скрыть другие тикеры
						</label>
					</div>
					<Button
						className='text-[11px] bg-[#333b47] font-normal p-1 px-2 tracking-wider h-fit rounded-sm'
						size='sm'
						variant='secondary'
					>
						Закрыть все
					</Button>
				</div>
				<OrderCard mode='long' />
			</div>
		</div>
	)
}
