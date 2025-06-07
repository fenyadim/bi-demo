import type { CSSProperties } from 'react'

import Share from '@/assets/images/share.svg?react'
import type { RouterOutputs } from '@/lib/trpc'
import { modeToStyle } from '@/shared/constants'
import { Badge, Button, CurrencyText } from '@/shared/ui'
import { formatDate } from '@/shared/utils/formatDate'

import { OrderItem } from './order-item'

type IOrder = RouterOutputs['getOrders'][0]

export const Order = ({
  status,
  couple,
  pnlClose,
  priceClose,
  price,
  marginValue,
  leverage,
  createdAt,
  updatedAt,
}: IOrder) => {
  const bgColor: CSSProperties = {
    backgroundColor: `var(--${modeToStyle[status]})`,
  }

  const volume = (marginValue * leverage) / priceClose!

  const token = couple.replace('USDT', '')

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
              value={volume}
              decimalScale={5}
              fixedDecimalScale={false}
              suffix={` ${token}`}
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
              value={volume}
              decimalScale={5}
              fixedDecimalScale={false}
              suffix={` ${token}`}
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
