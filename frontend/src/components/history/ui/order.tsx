import type { CSSProperties } from 'react'

import Share from '@/assets/images/share.svg?react'
import { modeToStyle } from '@/shared/constants'
import type { ModeType } from '@/shared/types'
import { Badge, Button, CurrencyText } from '@/shared/ui'

import { OrderItem } from './order-item'

export interface IOrder {
  mode: ModeType
  token: string
  pnl: number
  volumeClose: number
  priceEntry: number
  priceAverage: number
  priceMax: number
}

export const Order = ({
  mode,
  token,
  pnl,
  priceAverage,
  priceEntry,
  priceMax,
  volumeClose,
}: IOrder) => {
  const bgColor: CSSProperties = {
    backgroundColor: `var(--${modeToStyle[mode]})`,
  }

  return (
    <div className="py-3.5 pb-4 border-b-1 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1 h-min">
          <span className="block rounded-xs text-center size-4" style={bgColor}>
            {mode === 'long' ? 'К' : 'П'}
          </span>
          <h2 className="text-base font-medium">{token}</h2>
          <Badge className="font-light" value="Бесср" />
          <Badge className="font-light" value="Изолированная" />
        </div>
        <div className="flex gap-2">
          <p>Закрыто</p>
          <Button className="size-4" variant="ghost" size="icon">
            <Share />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <OrderItem
            title="PnL после закрытия позиций"
            mode={pnl < 0 ? 'short' : 'long'}
            size="lg"
          >
            <CurrencyText value={pnl} decimalScale={2} />
          </OrderItem>
          <OrderItem title="Объем после закрытия позиции" align="end" size="lg">
            <CurrencyText
              value={volumeClose}
              decimalScale={10}
              fixedDecimalScale={false}
              suffix=" BTC"
            />
          </OrderItem>
        </div>
        <div className="grid grid-cols-3 gap-1.5 mb-1.5">
          <OrderItem title="Цена входа">
            <CurrencyText value={priceEntry} decimalScale={1} />
          </OrderItem>
          <OrderItem title="Сред.цена закрытия">
            <CurrencyText value={priceAverage} decimalScale={1} />
          </OrderItem>
          <OrderItem title="Макс.сумма открытых позиций" align="end">
            <CurrencyText
              value={priceMax}
              decimalScale={10}
              fixedDecimalScale={false}
              suffix=" BTC"
            />
          </OrderItem>
        </div>
      </div>
      <div className="flex flex-col gap-1 *:flex *:justify-between **:font-light **:text-muted">
        <div>
          <h3>Открыто</h3>
          <p>2025-05-27 20:58:30</p>
        </div>
        <div>
          <h3>Закрыто</h3>
          <p>2025-05-28 13:19:50</p>
        </div>
      </div>
    </div>
  )
}
