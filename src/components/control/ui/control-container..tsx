import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import Arrow from '@/assets/images/arrow-down.svg?react'
import Convertation from '@/assets/images/convertation.svg?react'
import Info from '@/assets/images/info.svg?react'
import { Button, CurrencyText, Input, Slider } from '@/shared/ui'

import { Checkbox } from './checkbox'

export const ControlContainer = () => {
  const [procentValue, setValueProcent] = useState([0])

  const balance = 0.43
  const currencyCost = balance * (procentValue[0] / 100)

  const handleChangeProcent = (value: number[]) => {
    setValueProcent(value)
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
          <Button variant="outline">30х</Button>
          <Button variant="outline">П</Button>
        </div>
        <div className="flex justify-between">
          <p className="text-muted">Доступно</p>
          <div className="flex items-center gap-1.5">
            <p>
              <CurrencyText
                value={balance}
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
            value={procentValue}
            onValueChange={handleChangeProcent}
            countMarks={5}
          />
          <Checkbox title="TP/SL" />
          <Checkbox title="Только сокращение" />
        </div>
        <div>
          <div className="flex justify-between">
            <p className="text-muted">Макс.</p>
            <p>
              <CurrencyText value={0} decimalScale={1} /> USDT
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
          <Button className="w-full bg-success text-foreground">
            Купить/Лонг
          </Button>
        </div>
        <div>
          <div className="flex justify-between">
            <p className="text-muted">Макс.</p>
            <p>
              <CurrencyText value={219} decimalScale={1} /> USDT
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
          <Button className="w-full bg-fail text-foreground">
            Продать/Шорт
          </Button>
        </div>
      </div>
    </section>
  )
}
