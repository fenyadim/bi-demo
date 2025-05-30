import Share from '@/assets/images/share.svg?react'
import { modeToStyle } from '@/shared/constants'
import type { ModeType } from '@/shared/types'
import { Badge, Button, CurrencyText, Levels } from '@/shared/ui'
import type { CSSProperties } from 'react'
import { OrderItem } from './order-item'

interface IOrderCard {
	mode: ModeType
}

export const OrderCard = ({ mode }: IOrderCard) => {
	const bgColor: CSSProperties = {
		backgroundColor: `var(--${modeToStyle[mode]})`,
	}

	return (
		<div className='py-3.5 flex flex-col gap-2.5'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-1 h-min'>
					<span className='block rounded-xs text-center size-4' style={bgColor}>
						{mode === 'long' ? 'К' : 'П'}
					</span>
					<h2 className='text-base font-medium'>TONUSDT</h2>
					<Badge value='Бесср' />
					<Badge value='Изолированная 45X' />
					<Levels closeCount={2} />
				</div>
				<Button className='size-4' variant='ghost' size='icon'>
					<Share />
				</Button>
			</div>
			<div className='flex flex-col gap-1'>
				<div className='flex justify-between'>
					<OrderItem title='PnL (USDT)' mode='long' size='lg'>
						<CurrencyText value={0.0} decimalScale={2} prefix='+' />
					</OrderItem>
					<OrderItem title='ROI' mode='long' size='lg' align='end'>
						<CurrencyText
							value={0.14}
							decimalScale={2}
							prefix='+'
							suffix=' %'
						/>
					</OrderItem>
				</div>
				<div className='grid grid-cols-3 grid-rows-2 gap-1.5'>
					<OrderItem title='Размер (USDT)'>
						<CurrencyText
							value={233.5716}
							decimalScale={4}
							fixedDecimalScale={false}
						/>
					</OrderItem>
					<OrderItem title='Маржа (USDT)' underline={false}>
						<CurrencyText value={5.3} decimalScale={2} />
					</OrderItem>
					<OrderItem title='Коэффициент маржи' mode='accent' align='end'>
						<CurrencyText value={43.91} decimalScale={2} suffix=' %' />
					</OrderItem>
					<OrderItem title='Цена входа (USDT)'>
						<CurrencyText
							value={3.3036}
							decimalScale={4}
							fixedDecimalScale={false}
						/>
					</OrderItem>
					<OrderItem title='Цена маркировки (U...' underline={false}>
						<CurrencyText
							value={3.3038631}
							decimalScale={7}
							fixedDecimalScale={false}
						/>
					</OrderItem>
					<OrderItem
						title='Цена ликвидации (U...'
						align='end'
						underline={false}
					>
						<CurrencyText
							value={3.2612474}
							decimalScale={7}
							fixedDecimalScale={false}
						/>
					</OrderItem>
				</div>
			</div>
		</div>
	)
}
