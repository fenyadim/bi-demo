import { useState } from 'react'

import { useStorage } from '@/shared/hooks'
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui'

export const EditPage = () => {
  const { value: coupleValue, set: setCoupleValue } =
    useStorage<string>('couple')

  const { value: balanceValue, set: setBalanceValue } = useStorage<number>(
    'balance',
    100,
  )

  const [balance, setBalance] = useState(`${balanceValue}`)

  const handleSave = () => {
    setBalanceValue(parseFloat(balance))
  }

  const couple = ['BTCUSDT', 'ETCUSDT', 'LTCUSDT']

  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="flex flex-col gap-1">
        <label>Выбор пары</label>
        <Select defaultValue={coupleValue} onValueChange={setCoupleValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выбор пары" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {couple.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2 items-end">
        <div className="flex flex-col gap-1">
          <label htmlFor="balance">Баланс</label>
          <Input
            id="balane"
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>
        <Button variant="secondary" onClick={handleSave}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}
