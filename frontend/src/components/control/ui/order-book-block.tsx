import { memo, useMemo } from 'react'

import Arrow from '@/assets/images/arrow-down.svg?react'
import BookOrders from '@/assets/images/book-orders.svg?react'
import { useOrderBookWs, useStorage } from '@/shared/hooks'
import { useTicker } from '@/shared/providers/ticker-provider'
import type { IStakes } from '@/shared/types'
import { Button, CurrencyText } from '@/shared/ui'

import { countdownCalc } from '../lib/countdown'
import { StockStakes } from './stock-stakes'

const OrderBookBlockMemo = () => {
  const { value } = useStorage<string>('couple')
  const { orderBook } = useOrderBookWs(value)
  const { ticker } = useTicker()

  const funding = (ticker.fundingRate * 100).toFixed(4)

  const countdown = useMemo(
    () => countdownCalc(ticker.nextFundingTime),
    [ticker],
  )

  const bids = useMemo(() => orderBook.bids.slice(0, 7), [orderBook.bids])
  const asks = useMemo(
    () => orderBook.asks.slice(0, 7).reverse(),
    [orderBook.asks],
  )

  const maxBids = useMemo(
    () =>
      Math.max(
        ...bids.map(([price, volume]) => Number(price) * Number(volume)),
        1,
      ),
    [bids],
  )

  const maxAsks = useMemo(
    () =>
      Math.max(
        ...asks.map(([price, volume]) => Number(price) * Number(volume)),
        1,
      ),
    [asks],
  )

  const limitedAsks: IStakes[] = asks.map((item) => ({
    price: Number(item[0]),
    amount: Number(item[0]) * Number(item[1]),
    fillProcent: maxAsks / maxBids,
  }))

  const limitedBids: IStakes[] = bids.map((item) => ({
    price: Number(item[0]),
    amount: Number(item[0]) * Number(item[1]),
    fillProcent: maxBids / maxAsks,
  }))

  return (
    <section className="h-full w-full flex flex-col gap-1">
      <div>
        <h3 className="border-b-1 border-dotted w-fit text-muted text-[10px] leading-3">
          Ставка / Осталось
        </h3>
        <p>
          {funding} % / {countdown}
        </p>
      </div>
      <div className="flex justify-between mb-1 *:w-min *:text-muted *:text-[10px] *:leading-3">
        <h3>Цена (USDT)</h3>
        <h3 className="text-end">Сумма (USDT)</h3>
      </div>
      <StockStakes stakes={limitedAsks} mode="short" />
      <div className="flex flex-col items-center my-0.5">
        <h2 className="font-medium text-lg leading-6">
          <CurrencyText value={ticker.lastPrice} />
        </h2>
        <p className="text-muted border-b-1 border-dotted w-fit">
          <CurrencyText value={ticker.markPrice} />
        </p>
      </div>
      <StockStakes stakes={limitedBids} mode="long" />
      <div className="mt-2 grid grid-cols-[1fr_16px] items-center gap-2">
        <Button
          className="flex justify-between h-fit font-normal text-muted text-xs w-full py-0.5 px-2 pr-1.5 rounded-sm"
          variant="secondary"
          size="icon"
        >
          0.1
          <Arrow className="fill-muted" />
        </Button>
        <Button className="size-3.5 px-1" variant="ghost" size="icon">
          <BookOrders className="size-3.5" />
        </Button>
      </div>
    </section>
  )
}

export const OrderBookBlock = memo(OrderBookBlockMemo)
