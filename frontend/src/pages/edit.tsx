import { useStorage } from '@/shared/hooks'
import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui'

export const EditPage = () => {
  const { value, set } = useStorage<string>('couple')

  const couple = ['BTCUSDT', 'ETCUSDT', 'LTCUSDT']

  return (
    <div>
      <div>
        <label>Выбор пары</label>
        <Select defaultValue={value} onValueChange={set}>
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
      <div>
        <label htmlFor="balance">Баланс</label>
        <Input id="balane" />
      </div>
    </div>
  )
}
