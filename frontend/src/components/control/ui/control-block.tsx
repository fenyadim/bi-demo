import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { ReactComponent as Arrow } from '@/assets/images/arrow-down.svg'
import { ReactComponent as Convertation } from '@/assets/images/convertation.svg'
import { ReactComponent as Info } from '@/assets/images/info.svg'
import { queryClient, trpc } from '@/lib/trpc'
import { useStorage } from '@/shared/hooks'
import { useTicker } from '@/shared/providers/ticker-provider'
import {
  Button,
  CurrencyText,
  Input,
  type MarksType,
  Slider,
} from '@/shared/ui'

import { Checkbox } from './checkbox'
import { LeverageDrawer } from './leverage-drawer'

export const ControlBlock = () => {
  const utils = trpc.useUtils()

  const [procentValue, setValueProcent] = useState([0])
  const { value: leverageValue } = useStorage<[number]>('leverage', [10])
  const { value: balanceValue, set } = useStorage<number>('balance', 0)
  const { value: coupleValue } = useStorage<string>('couple', 'BTCUSDT')
  const { ticker } = useTicker()

  const createOrder = trpc.createOrder.useMutation({
    onSuccess() {
      utils.getOrders.invalidate()
    },
  })

  const currencyCost = balanceValue! * (procentValue[0] / 100)

  const handleChangeProcent = (value: number[]) => {
    setValueProcent(value)
  }

  const marks: MarksType[] = [
    { value: 0 },
    { value: 25 },
    { value: 50 },
    { value: 75 },
    { value: 100 },
  ]

  const maxLong = balanceValue! * leverageValue![0] * 0.969
  const sumLong = maxLong * (procentValue[0] / 100)

  const maxShort = balanceValue! * leverageValue![0] * 0.997
  const sumShort = maxShort * (procentValue[0] / 100)

  const handleCreateOrder = (status: 'long' | 'short') => async () => {
    set(balanceValue! - currencyCost)
    queryClient.invalidateQueries({ queryKey: ['lastPrice'] })
    createOrder.mutateAsync({
      status,
      couple: coupleValue!,
      leverage: leverageValue![0],
      marginValue: currencyCost,
      price: ticker.lastPrice,
      isOpen: true,
    })
    setValueProcent([0])
  }

  return (
    <section>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[87px_107px_1fr] gap-1 *:bg-none *:font-light *:flex *:p-0 *:justify-center *:h-[25px] *:text-xs">
          <Button
            className="justify-start! overflow-hidden whitespace-nowrap text-ellipsis"
            variant="outline"
          >
            Изолирован...
          </Button>
          <LeverageDrawer />
          <Button variant="outline">П</Button>
        </div>
        <div className="flex justify-between">
          <p className="text-muted">Доступно</p>
          <div className="flex items-center gap-1.5">
            <p>
              <CurrencyText
                value={balanceValue}
                decimalScale={2}
                fixedDecimalScale={false}
              />{' '}
              USDT
            </p>
            <Button className="p-0! size-3" variant="ghost" size="icon">
              <Convertation className="fill-accent size-3" />
            </Button>
          </div>
        </div>
        <Button
          className="h-[25px] p-1.5! flex justify-between"
          variant="secondary"
        >
          <Info className="size-[15px] fill-muted" />
          Рыночный
          <Arrow className="fill-muted" />
        </Button>
        <Button
          className=" h-[40px] bg-[#333b47] text-muted"
          variant="secondary"
        >
          Рыночная цена
        </Button>
        <div className="flex *:h-10 *:rounded-none *:text-muted overflow-hidden rounded-md">
          <Button variant="secondary" size="icon">
            <Minus />
          </Button>
          <div className="relative group">
            <Input
              className="caret-accent h-full rounded-none border-none bg-secondary! font-[BinancePlex] text-center text-accent-foreground font-medium focus-visible:ring-0 peer p-0 pt-2 text-base"
              placeholder=""
              value={procentValue[0] === 0 ? '' : `${procentValue[0]} %`}
              readOnly
            />
            <label className="truncate absolute top-2 left-0 right-0 flex items-center justify-center align-middle font-medium text-muted text-[10px] px-1 transform -translate-y-1/2 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm group-focus-within:!top-2 group-focus-within:text-[10px]!">
              Сумма
            </label>
          </div>
          <Button className="px-0!" variant="secondary" size="icon">
            <Plus />
          </Button>
          <Button
            className="relative flex gap-1 text-accent-foreground! px-1! text-xs before:absolute before:inset-y-1.5 before:-left-1 before:border-l-1 before:border-[#333b47]"
            variant="secondary"
          >
            USDT
            <Arrow className="fill-muted" />
          </Button>
        </div>
        <div className="pt-3 flex flex-col gap-1.5">
          <Slider
            className="mb-4"
            marks={marks}
            value={procentValue}
            onValueChange={handleChangeProcent}
          />
          <Checkbox title="TP/SL" />
          <Checkbox title="Только сокращение" />
        </div>
        <div>
          <div className="flex justify-between">
            <p className="text-muted">Макс.</p>
            <p>
              <CurrencyText value={maxLong} decimalScale={1} /> USDT
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="relative text-muted leading-3 before:absolute before:-bottom-0.5 before:inset-x-0 before:border-t-1 before:border-dotted">
              Стоимость
            </p>
            <p className="leading-3">
              <CurrencyText
                value={currencyCost}
                decimalScale={2}
                fixedDecimalScale={false}
              />{' '}
              USDT
            </p>
          </div>
          <Button
            className="w-full bg-success text-foreground flex-col gap-0 leading-4"
            onClick={handleCreateOrder('long')}
          >
            Купить/Лонг
            {sumLong > 0 && (
              <span className="text-[10px] font-light">
                <CurrencyText
                  value={sumLong}
                  decimalScale={2}
                  prefix="≈ "
                  suffix=" USDT"
                />
              </span>
            )}
          </Button>
        </div>
        <div>
          <div className="flex justify-between">
            <p className="text-muted">Макс.</p>
            <p>
              <CurrencyText value={maxShort} decimalScale={1} /> USDT
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="relative text-muted leading-3 before:absolute before:-bottom-0.5 before:inset-x-0 before:border-t-1 before:border-dotted">
              Стоимость
            </p>
            <p className="leading-3">
              <CurrencyText
                value={currencyCost}
                decimalScale={2}
                fixedDecimalScale={false}
              />{' '}
              USDT
            </p>
          </div>
          <Button
            className="w-full bg-fail text-foreground flex-col gap-0 leading-4"
            onClick={handleCreateOrder('short')}
          >
            Продать/Шорт
            {sumShort > 0 && (
              <span className="text-[10px] font-light">
                <CurrencyText
                  value={sumShort}
                  decimalScale={2}
                  prefix="≈ "
                  suffix=" USDT"
                />
              </span>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}
