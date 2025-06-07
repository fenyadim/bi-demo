import { useState } from 'react'

import { EditOrder, SelectCouple } from '@/components/edit'
import {
  SELECT_COUPLE_ITEMS,
  TABLE_ORDER_LABELS,
} from '@/components/edit/constants'
import { trpc } from '@/lib/trpc'
import { useStorage } from '@/shared/hooks'
import { Button, Card, Input } from '@/shared/ui'

export const EditPage = () => {
  const [isSave, setIsSave] = useState(false)

  const { value: coupleValue, set: setCoupleValue } =
    useStorage<string>('couple')

  const { value: balanceValue, set: setBalanceValue } = useStorage<number>(
    'balance',
    100,
  )

  const [balance, setBalance] = useState(`${balanceValue}`)

  const { data: orders } = trpc.getOrders.useQuery()

  const handleSave = () => {
    setBalanceValue(parseFloat(balance))
  }

  if (!orders) return <h1>Загрузка</h1>

  return (
    <div className="flex flex-col gap-4 p-3 max-w-[1200px]! mx-auto">
      <div className="flex flex-col gap-1">
        <label>Выбор пары</label>
        <SelectCouple
          value={coupleValue!}
          onChange={setCoupleValue}
          items={SELECT_COUPLE_ITEMS}
        />
      </div>
      <div className="flex gap-2 items-end">
        <div className="flex flex-col gap-1">
          <label htmlFor="balance">Баланс</label>
          <Input
            id="balane"
            type="number"
            value={balance}
            step="any"
            onChange={(e) => {
              const value = e.target.value.replace(',', '.')
              if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                setBalance(value)
              }
            }}
          />
        </div>
        <Button variant="secondary" onClick={handleSave}>
          Сохранить
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-lg">Ордера</h2>
        <Card className="p-3 bg-background grid gap-3 *:grid *:grid-cols-10 *:gap-3 *:items-center *:justify-items-center">
          <div>
            {TABLE_ORDER_LABELS.map((label) => (
              <p className="font-medium text-sm text-center" key={label}>
                {label}
              </p>
            ))}
          </div>
          {orders.map((item, index) => (
            <EditOrder
              isSave={isSave}
              setIsSave={setIsSave}
              isLastElem={index === orders.length - 1}
              key={item.id}
              {...item}
            />
          ))}
        </Card>
        <Button
          className="w-40 justify-self-end bg-accent"
          onClick={() => setIsSave(true)}
        >
          Сохранить
        </Button>
      </div>
    </div>
  )
}
