import _ from 'lodash'
import { Save, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { type RouterOutputs, trpc } from '@/lib/trpc'
import { Button, Checkbox, Input } from '@/shared/ui'

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

type IEditOrder = {} & Order

export const EditOrder = (props: IEditOrder) => {
  const utils = trpc.useUtils()
  const { ...items } = props
  const [data, setData] = useState(items)
  const [isDisable, setIsDisable] = useState(true)

  const { couple, status, createdAt, updatedAt, isOpen } = data

  useEffect(() => {
    if (!_.isEqual(data, items)) {
      setIsDisable(false)
    } else setIsDisable(true)
  }, [data, items])

  const handleSuccess = (toastTitle: string) => () => {
    toast.success(toastTitle)
    utils.getOrders.invalidate()
  }

  const { mutateAsync: deleteOrder } = trpc.deleteOrder.useMutation({
    onSuccess: handleSuccess('Order успешно удален'),
  })

  const { mutateAsync: updateOrder } = trpc.updateOrder.useMutation({
    onSuccess: handleSuccess('Order успешно обновлен'),
  })

  const handleChange = <T extends FieldType>(field: T, value: ValueType<T>) => {
    setData((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    updateOrder(data)
  }

  const handleDelete = async () => {
    deleteOrder({ id: items.id })
  }

  const inputValues = _.pick(data, [
    'price',
    'leverage',
    'marginValue',
    'pnlClose',
    'priceClose',
  ])

  return (
    <div className="border-t-1 pt-3">
      <SelectItem
        className="w-full bg-secondary"
        value={status}
        onChange={(v) => handleChange('status', v as Order['status'])}
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
      <div className="flex gap-2">
        <Button
          className="bg-accent"
          size="icon"
          onClick={handleSave}
          disabled={isDisable}
        >
          <Save />
        </Button>
        <Button variant="destructive" size="icon" onClick={handleDelete}>
          <Trash />
        </Button>
      </div>
    </div>
  )
}
