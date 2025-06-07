import _ from 'lodash'
import { type Dispatch, useState } from 'react'

import { type RouterOutputs, trpc } from '@/lib/trpc'
import { Checkbox, Input } from '@/shared/ui'

import { SELECT_COUPLE_ITEMS, SELECT_STATUS_ITEMS } from '../constants'
import { DatePicker } from './date-picker'
import { SelectItem } from './select-item'

type Order = RouterOutputs['getOrders'][0]

type FieldType = keyof Order

type ValueType<T extends FieldType> = Order[T]

type InputKeys = Extract<
  FieldType,
  'price' | 'leverage' | 'marginValue' | 'pnlClose' | 'priceClose'
>

interface IEditOrder extends Order {
  isSave: boolean
  setIsSave: Dispatch<React.SetStateAction<boolean>>
  isLastElem: boolean
}

export const EditOrder = (props: IEditOrder) => {
  const { isSave, isLastElem, setIsSave, ...items } = props
  const [data, setData] = useState(items)
  const { couple, status, createdAt, updatedAt, isOpen } = data
  const { mutateAsync } = trpc.updateOrder.useMutation()

  const handleChange = <T extends FieldType>(field: T, value: ValueType<T>) => {
    setData((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  if (isSave) {
    mutateAsync(data)
  }

  if (isLastElem) {
    setIsSave(false)
  }

  const inputValues = _.pick(data, [
    'price',
    'leverage',
    'marginValue',
    'pnlClose',
    'priceClose',
  ])

  return (
    <div>
      <SelectItem
        className="w-full bg-secondary"
        value={status}
        onChange={(v) => handleChange('couple', v)}
        items={SELECT_STATUS_ITEMS}
      />
      <SelectItem
        className="w-full bg-secondary"
        value={couple}
        onChange={(v) => handleChange('couple', v)}
        items={SELECT_COUPLE_ITEMS}
      />
      {_.keys(inputValues).map((field) => (
        <Input
          className="bg-secondary"
          key={field}
          type="number"
          value={data[field as InputKeys] ?? ''}
          step="any"
          onChange={(e) => {
            const value = e.target.value.replace(',', '.')
            if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
              handleChange(
                field as InputKeys,
                value === '' ? null : parseFloat(value),
              )
            }
          }}
        />
      ))}
      <DatePicker
        initialDate={createdAt}
        onChange={(date) => handleChange('createdAt', date)}
      />
      <DatePicker
        initialDate={updatedAt}
        onChange={(date) => handleChange('updatedAt', date)}
      />
      <Checkbox
        checked={isOpen}
        onCheckedChange={(checked) => handleChange('isOpen', !!checked)}
      />
    </div>
  )
}
