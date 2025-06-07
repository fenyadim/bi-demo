import type { CSSProperties } from 'react'

import Plus from '@/assets/images/plus.svg?react'
import Share from '@/assets/images/share.svg?react'
import { modeToStyle } from '@/shared/constants'
import { useTickerWs } from '@/shared/hooks'
import { Badge, Button, CurrencyText, Levels } from '@/shared/ui'

import type { IOrder } from '../types'
import { CloseDrawer } from './close-drawer'
import { OrderItem } from './order-item'

export const OrderCard = ({
  couple,
  status,
  price,
  leverage,
  marginValue,
  id,
}: IOrder) => {
  const { ticker } = useTickerWs(couple)

  /** Цена маркировки */
  const markingPrice = ticker.markPrice
  /** Размер (USDT) */
  const values = marginValue * leverage
  /** Размер в крипте */
  const cryptoValue = values / price
  const longPnl = (markingPrice - price) * cryptoValue
  const shortPnl = (price - markingPrice) * cryptoValue
  const pnl = status === 'long' ? longPnl : shortPnl
  const roe = (pnl / marginValue) * 100
  const liquidationLong = price * (1 - 1 / leverage)
  const liquidationShort = price * (1 + 1 / leverage)
  const liquidation = status === 'long' ? liquidationLong : liquidationShort

  const bgColor: CSSProperties = {
    backgroundColor: `var(--${modeToStyle[status]})`,
  }

  if (markingPrice === 0) return null

  const maintenanceMargin = values * 0.004 // 0.4% для большинства пар
  const marginRatio =
    ((maintenanceMargin + Math.max(0, -pnl)) / marginValue) * 100

  return (
    <div className="py-3.5 pb-4 border-b-1 flex flex-col gap-2.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 h-min">
          <span className="block rounded-xs text-center size-4" style={bgColor}>
            {status === 'long' ? 'К' : 'П'}
          </span>
          <h2 className="text-base font-medium">{couple}</h2>
          <Badge value="Бесср" />
          <Badge value={`Изолированная ${leverage}X`} />
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
              decimalScale={2}
              fixedDecimalScale={false}
            />
          </OrderItem>
          <OrderItem title="Маржа (USDT)" underline={false} Icon={Plus}>
            <CurrencyText value={marginValue} decimalScale={2} />
          </OrderItem>
          <OrderItem
            title="Коэффициент маржи"
            mode={
              marginRatio >= 40
                ? 'accent'
                : marginRatio >= 70
                  ? 'short'
                  : 'long'
            }
            align="end"
          >
            <CurrencyText value={marginRatio} decimalScale={2} suffix=" %" />
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
              value={liquidation}
              decimalScale={2}
              fixedDecimalScale={true}
            />
          </OrderItem>
        </div>
        <div className="flex gap-2 *:h-fit *:rounded-sm *:py-2 *:px-0 *:font-normal *:tracking-normal *:bg-[#333b47] *:flex-1 *:text-xs">
          <Button variant="secondary">Кредитное плечо</Button>
          <Button variant="secondary">TP/SL</Button>
          <CloseDrawer
            id={id}
            couple={couple}
            price={price}
            markingPrice={markingPrice}
            leverage={leverage}
            status={status}
            quantity={values}
            pnl={pnl}
          >
            <Button variant="secondary">Закрыть</Button>
          </CloseDrawer>
        </div>
      </div>
    </div>
  )
}
