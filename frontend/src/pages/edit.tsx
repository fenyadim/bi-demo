import { useState } from 'react'

import {
  EditOrder,
  SELECT_COUPLE_ITEMS,
  SelectCouple,
  TABLE_ORDER_LABELS,
} from '@/components/edit'
import { trpc } from '@/lib/trpc'
import { useStorage } from '@/shared/hooks'
import {
  Button,
  Card,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Input,
} from '@/shared/ui'

export const EditPage = () => {
  const utils = trpc.useUtils()

  const { value: coupleValue, set: setCoupleValue } =
    useStorage<string>('couple')

  const { value: balanceValue, set: setBalanceValue } = useStorage<number>(
    'balance',
    100,
  )

  const [balance, setBalance] = useState(`${balanceValue}`)

  const { data: orders } = trpc.getOrders.useQuery()
  const { mutateAsync } = trpc.deleteAllOrders.useMutation({
    onSuccess: () => {
      utils.getOrders.invalidate()
    },
  })

  const handleSaveBalance = () => {
    setBalanceValue(parseFloat(balance))
  }

  const handleAllDelete = async () => {
    mutateAsync()
  }

  if (!orders) return <h1>Загрузка</h1>

  return (
    <div className="flex flex-col gap-4 p-3 max-w-[1350px]! mx-auto">
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
        <Button className="bg-accent" onClick={handleSaveBalance}>
          Сохранить
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-lg">Ордера</h2>
        <Card className="p-3 bg-background grid gap-3 *:grid *:grid-cols-11 *:gap-3 *:items-center *:justify-items-center">
          <div>
            {TABLE_ORDER_LABELS.map((label) => (
              <p className="font-medium text-sm text-center" key={label}>
                {label}
              </p>
            ))}
          </div>
          {orders.map((item) => (
            <EditOrder key={item.id} {...item} />
          ))}
        </Card>
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Удалить всё</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Вы уверены?</DialogTitle>
              <DialogDescription>Это удалит все ордеры</DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Отменить</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive" onClick={handleAllDelete}>
                    Удалить
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
