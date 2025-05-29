import Arrow from '@/assets/images/arrow-down.svg?react'
import Info from '@/assets/images/info.svg?react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

export const Content = () => {
	const [valueSum, setValueSum] = useState('')

	return (
		<div className='h-full grid grid-cols-[1.3fr_2fr] gap-4 p-4'>
			<section className='bg-white h-full'></section>
			<section>
				<div className='mb-10.5'></div>
				<div className='flex flex-col gap-2'>
					<div className='grid grid-cols-[87px_107px_1fr] gap-1 *:bg-none *:font-light *:flex *:p-0 *:justify-center *:h-[25px] *:text-xs'>
						<Button
							className='justify-start! overflow-hidden whitespace-nowrap text-ellipsis'
							variant='outline'
						>
							Изолирован...
						</Button>
						<Button variant='outline'>30х</Button>
						<Button variant='outline'>П</Button>
					</div>
					<div className='flex justify-between'>
						<p className='text-muted'>Доступно</p>
						<p>0,43 USDT</p>
					</div>
					<Button
						className='h-[25px] p-1.5! flex justify-between'
						variant='secondary'
					>
						<Info className='size-[15px] fill-muted' />
						Рыночный
						<Arrow className='fill-muted' />
					</Button>
					<Button
						className=' h-[40px] bg-[#333b47] text-muted'
						variant='secondary'
					>
						Рыночная цена
					</Button>
					<div className='flex *:h-10 *:rounded-none *:text-muted overflow-hidden rounded-md'>
						<Button variant='secondary' size='icon'>
							<Minus />
						</Button>
						<div className='relative group'>
							<Input
								className='caret-accent h-full rounded-none border-none bg-secondary! font-[BinancePlex] text-center text-accent-foreground font-medium focus-visible:ring-0 peer p-0 pt-2 text-base'
								placeholder=''
								value={valueSum}
								onChange={e => setValueSum(e.target.value)}
							/>
							<label className='truncate absolute top-2 left-0 right-0 flex items-center justify-center align-middle font-medium text-muted text-[10px] transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm group-focus-within:!top-2 group-focus-within:text-[10px]!'>
								Сумма
							</label>
						</div>
						<Button className='px-0!' variant='secondary' size='icon'>
							<Plus />
						</Button>
						<Button
							className='flex gap-1 text-accent-foreground! px-1! text-xs'
							variant='secondary'
						>
							USDT
							<Arrow className='fill-muted' />
						</Button>
					</div>
					<div className='h-[80px]'></div>
					<div>
						<div className='flex justify-between'>
							<p className='text-muted'>Макс.</p>
							<p>0,0 USDT</p>
						</div>
						<div className='flex justify-between mb-2'>
							<p className='relative text-muted leading-3 before:absolute before:-bottom-0.5 before:inset-x-0 before:border-t-1 before:border-dotted'>
								Стоимость
							</p>
							<p className='leading-3'>0 USDT</p>
						</div>
						<Button className='w-full bg-success text-foreground font-normal'>
							Купить/Лонг
						</Button>
					</div>
					<div>
						<div className='flex justify-between'>
							<p className='text-muted'>Макс.</p>
							<p>219,0 USDT</p>
						</div>
						<div className='flex justify-between mb-2'>
							<p className='relative text-muted leading-3 before:absolute before:-bottom-0.5 before:inset-x-0 before:border-t-1 before:border-dotted'>
								Стоимость
							</p>
							<p className='leading-3'>0 USDT</p>
						</div>
						<Button className='w-full bg-fail text-foreground font-normal'>
							Продать/Шорт
						</Button>
					</div>
				</div>
			</section>
		</div>
	)
}
