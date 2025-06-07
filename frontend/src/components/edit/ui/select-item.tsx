import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem as SelectItemUI,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui'

interface ISelectItem {
  value: string
  onChange: (value: string) => void
  items: string[]
  className?: string
}

export const SelectItem = ({
  value,
  onChange,
  items,
  className,
}: ISelectItem) => {
  return (
    <Select defaultValue={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Выбор пары" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItemUI key={item} value={item}>
              {item}
            </SelectItemUI>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
