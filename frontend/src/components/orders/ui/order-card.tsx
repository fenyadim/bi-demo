import type { IOrder } from '@bi-demo/backend/src/router/getOrders'
import type { CSSProperties } from 'react'

import Plus from '@/assets/images/plus.svg?react'
import Share from '@/assets/images/share.svg?react'
import { modeToStyle } from '@/shared/constants'
import { useDataWebSocket } from '@/shared/hooks/useDataWebSocket'
import { Badge, Button, CurrencyText, Levels } from '@/shared/ui'

import { CloseDrawer } from './close-drawer'
import { OrderItem } from './order-item'

export const OrderCard = ({ couple, status, price, shoulder }: IOrder) => {
  const { marking } = useDataWebSocket(couple)

  const marginValue = 12
  /** Цена маркировки */
  const markingPrice = marking
  /** Размер (USDT) */
  const values = marginValue * shoulder
  /** Размер в крипте */
  const cryptoValue = values / price
  const longPnl = (markingPrice - price) * cryptoValue
  const shortPnl = (price - markingPrice) * cryptoValue
  const pnl = status === 'long' ? longPnl : shortPnl
  const roe = (pnl / marginValue) * 100

  const bgColor: CSSProperties = {
    backgroundColor: `var(--${modeToStyle[status]})`,
  }

  return (
    <div className="py-3.5 pb-4 border-b-1 flex flex-col gap-2.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 h-min">
          <span className="block rounded-xs text-center size-4" style={bgColor}>
            {status === 'long' ? 'К' : 'П'}
          </span>
          <h2 className="text-base font-medium">{couple}</h2>
          <Badge value="Бесср" />
          <Badge value={`Изолированная ${shoulder}X`} />
          <Levels closeCount={2} />
        </div>
        <Button className="size-4" variant="ghost" size="icon">
          <Share />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <OrderItem
            title="PnL (USDT)"
            mode={pnl > 0 ? 'long' : 'short'}
            size="lg"
          >
            <CurrencyText
              value={pnl}
              decimalScale={2}
              prefix={pnl > 0 ? '+' : ''}
            />
          </OrderItem>
          <OrderItem
            title="ROI"
            mode={roe > 0 ? 'long' : 'short'}
            size="lg"
            align="end"
          >
            <CurrencyText
              value={roe}
              decimalScale={2}
              prefix={roe > 0 ? '+' : ''}
              suffix=" %"
            />
          </OrderItem>
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-1.5 mb-1.5">
          <OrderItem title="Размер (USDT)">
            <CurrencyText
              value={values}
              decimalScale={4}
              fixedDecimalScale={false}
            />
          </OrderItem>
          <OrderItem title="Маржа (USDT)" underline={false} Icon={Plus}>
            <CurrencyText value={5.3} decimalScale={2} />
          </OrderItem>
          <OrderItem title="Коэффициент маржи" mode="accent" align="end">
            <CurrencyText value={43.91} decimalScale={2} suffix=" %" />
          </OrderItem>
          <OrderItem title="Цена входа (USDT)">
            <CurrencyText
              value={price}
              decimalScale={4}
              fixedDecimalScale={false}
            />
          </OrderItem>
          <OrderItem title="Цена маркировки (U..." underline={false}>
            <CurrencyText
              value={markingPrice}
              decimalScale={7}
              fixedDecimalScale={false}
            />
          </OrderItem>
          <OrderItem
            title="Цена ликвидации (U..."
            align="end"
            underline={false}
          >
            <CurrencyText
              value={3.2612474}
              decimalScale={7}
              fixedDecimalScale={false}
            />
          </OrderItem>
        </div>
        <div className="flex gap-2 *:h-fit *:rounded-sm *:py-2 *:px-0 *:font-normal *:tracking-normal *:bg-[#333b47] *:flex-1 *:text-xs">
          <Button variant="secondary">Кредитное плечо</Button>
          <Button variant="secondary">TP/SL</Button>
          <CloseDrawer>
            <Button variant="secondary">Закрыть</Button>
          </CloseDrawer>
        </div>
      </div>
    </div>
  )
}
