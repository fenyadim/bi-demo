import Arrow from '@/assets/images/arrow-down.svg?react'
import BookOrders from '@/assets/images/book-orders.svg?react'
import { useOrderBookWs } from '@/shared/hooks/useOrderBookWs'
import type { IStakes } from '@/shared/types'
import { Button, CurrencyText } from '@/shared/ui'

import { ControlBlock } from './control-block'
import { StockStakes } from './stock-stakes'

export const CreateOrderContainer = () => {
  const data = useOrderBookWs('btcusdt')

  const asks: IStakes[] = data.asks.map((item) => ({
    price: Number(item[0]),
    amount: Number(item[0]) * Number(item[1]),
  }))

  const bids: IStakes[] = data.bids.map((item) => ({
    price: Number(item[0]),
    amount: Number(item[0]) * Number(item[1]),
  }))

  return (
    <div className="grid grid-cols-[1.3fr_2fr] gap-4 pt-0 p-4">
      <section className="h-full w-full flex flex-col gap-1">
        <div>
          <h3 className="border-b-1 border-dotted w-fit text-muted text-[10px] leading-3">
            Ставка / Осталось
          </h3>
          <p>0,0065 % / 04:13:49</p>
        </div>
        <div className="flex justify-between mb-1 *:w-min *:text-muted *:text-[10px] *:leading-3">
          <h3>Цена (USDT)</h3>
          <h3 className="text-end">Сумма (USDT)</h3>
        </div>
        <StockStakes stakes={asks} mode="short" />
        <div className="flex flex-col items-center my-0.5">
          <h2 className="font-medium text-lg leading-6">
            <CurrencyText value={109726.5} />
          </h2>
          <p className="text-muted border-b-1 border-dotted w-fit">
            <CurrencyText value={109704.6} />
          </p>
        </div>
        <StockStakes stakes={bids} mode="long" />
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
      <ControlBlock />
    </div>
  )
}
