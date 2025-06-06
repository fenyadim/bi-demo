import type { CSSProperties } from 'react'

import Share from '@/assets/images/share.svg?react'
import { modeToStyle } from '@/shared/constants'
import type { ModeType } from '@/shared/types'
import { Badge, Button, CurrencyText } from '@/shared/ui'
import { formatDate } from '@/shared/utils/formatDate'

import { OrderItem } from './order-item'

export interface IOrder {
  couple: string
  status: ModeType
  priceClose: number | null
  price: number
  pnlClose: number | null
  createdAt: string
  updatedAt: string
}

export const Order = ({
  status,
  couple,
  pnlClose,
  priceClose,
  price,
  createdAt,
  updatedAt,
}: IOrder) => {
  const bgColor: CSSProperties = {
    backgroundColor: `var(--${modeToStyle[status]})`,
  }

  return (
    <div className="py-3.5 pb-4 border-b-1 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1 h-min">
          <span className="block rounded-xs text-center size-4" style={bgColor}>
            {status === 'long' ? 'К' : 'П'}
          </span>
          <h2 className="text-base font-medium">{couple}</h2>
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
            mode={pnlClose! < 0 ? 'short' : 'long'}
            size="lg"
          >
            <CurrencyText value={pnlClose} decimalScale={2} />
          </OrderItem>
          <OrderItem title="Объем после закрытия позиции" align="end" size="lg">
            <CurrencyText
              value={100}
              decimalScale={10}
              fixedDecimalScale={false}
              suffix=" BTC"
            />
          </OrderItem>
        </div>
        <div className="grid grid-cols-3 gap-1.5 mb-1.5">
          <OrderItem title="Цена входа">
            <CurrencyText value={price} decimalScale={1} />
          </OrderItem>
          <OrderItem title="Сред.цена закрытия">
            <CurrencyText value={priceClose} decimalScale={1} />
          </OrderItem>
          <OrderItem title="Макс.сумма открытых позиций" align="end">
            <CurrencyText
              value={200}
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
          <p>{formatDate(createdAt)}</p>
        </div>
        <div>
          <h3>Закрыто</h3>
          <p>{formatDate(updatedAt)}</p>
        </div>
      </div>
    </div>
  )
}
