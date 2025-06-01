import Arrow from '@/assets/images/arrow-down.svg?react'
import { Slider } from '@/components/control/ui/slider'
import {
	Badge,
	Button,
	CurrencyText,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/shared/ui'
import { useState, type ReactNode } from 'react'
import { TextDrawer } from './text-drawer'

interface ICloseDrawer {
	children: ReactNode
}

export const CloseDrawer = ({ children }: ICloseDrawer) => {
	const [value, setValue] = useState([100])

	const handleChange = (value: number[]) => {
		setValue(value)
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle className='text-[18px] font-medium tracking-normal'>
						Закрыть позицию
					</DrawerTitle>
				</DrawerHeader>
				<div className='px-4 pb-3.5'>
					<div className='flex flex-col gap-2.5 pb-7 border-b-1'>
						<TextDrawer label='Символ'>
							<div className='flex items-center gap-0.5'>
								<p className='text-sm'>TONUSDT</p>
								<Badge value='Бесср' />
								<Badge mode='long' value='Купить 45х' />
							</div>
						</TextDrawer>
						<TextDrawer label='Цена входа (USDT)'>
							<CurrencyText
								value={3.3036}
								decimalScale={4}
								fixedDecimalScale={false}
							/>
						</TextDrawer>
						<TextDrawer label='Цена маркировки (USDT)'>
							<CurrencyText
								value={3.3041}
								decimalScale={7}
								fixedDecimalScale={true}
							/>
						</TextDrawer>
					</div>
					<div className='pt-2.5 flex flex-col gap-4'>
						<div>
							<label className='text-sm font-medium text-muted'>Цена</label>
							<div className='grid grid-cols-[2.3fr_1fr] gap-2 items-center mt-1.5'>
								<Button
									className='bg-[#333b47] justify-start text-[#4f5867] py-2.5 px-3 h-fit'
									variant='secondary'
								>
									Рыночная цена
								</Button>
								<Button
									className='flex justify-end gap-4 pr-1.5! text-accent-foreground! font-normal text-sm h-full'
									variant='secondary'
								>
									Рынок
									<Arrow className='fill-muted' />
								</Button>
							</div>
						</div>
						<div className='mb-1.5'>
							<label className='text-sm font-medium text-muted'>Сумма</label>
							<div className='flex gap-2 justify-between items-center mt-1.5 bg-secondary p-2.5 rounded-sm *:text-sm *:tracking-normal *:font-normal'>
								<p>{value[0]} % (≈233,5434)</p>
								<p>USDT</p>
							</div>
						</div>
						<Slider
							defaultValue={[100]}
							value={value}
							onValueChange={handleChange}
							countMarks={5}
							step={25}
							showTooltip={false}
						/>
						<div className='mt-6 flex flex-col gap-2.5'>
							<TextDrawer label='Сумма позиции'>
								<CurrencyText
									value={233.5454}
									decimalScale={4}
									fixedDecimalScale={false}
									suffix=' USDT'
								/>
							</TextDrawer>
							<TextDrawer label='Расчетный PNL' mode='short' underlineLabel>
								<CurrencyText
									value={0.02}
									decimalScale={2}
									fixedDecimalScale={false}
									prefix='-'
									suffix=' USDT'
								/>
							</TextDrawer>
						</div>
					</div>
				</div>
				<DrawerFooter className='pb-12'>
					<DrawerClose asChild>
						<Button className='bg-accent w-full py-5! text-base'>
							Подтвердить
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
