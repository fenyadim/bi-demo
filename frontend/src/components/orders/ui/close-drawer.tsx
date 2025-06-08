import { useQuery } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

import { ReactComponent as Arrow } from '@/assets/images/arrow-down.svg'
import { queryClient, trpc } from '@/lib/trpc'
import { getLastPriceApi } from '@/shared/api/get-last-price'
import { useStorage } from '@/shared/hooks'
import {
  Badge,
  Button,
  CurrencyText,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  type MarksType,
  Slider,
} from '@/shared/ui'

import { TextDrawer } from './text-drawer'

interface ICloseDrawer {
  children: ReactNode
  id: string
  price: number
  markingPrice: number
  couple: string
  leverage: number
  quantity: number
  status: 'long' | 'short'
  pnl: number
}

export const CloseDrawer = ({
  children,
  id,
  price,
  markingPrice,
  couple,
  leverage,
  quantity,
  pnl,
  status,
}: ICloseDrawer) => {
  const [value, setValue] = useState([100])
  const { value: balanceValue, set } = useStorage<number>('balance')

  const { data } = useQuery({
    queryKey: ['lastPrice'],
    queryFn: () => getLastPriceApi(couple),
  })

  const utils = trpc.useUtils()
  const { mutateAsync } = trpc.closeOrder.useMutation({
    onSuccess() {
      utils.getOrders.invalidate()
    },
  })

  const handleChange = (value: number[]) => {
    setValue(value)
  }

  const handleCloseOrder = async () => {
    set(balanceValue! + pnl)
    queryClient.invalidateQueries({ queryKey: ['lastPrice'] })
    mutateAsync({ id, priceClose: data.Data[couple].PRICE, pnlClose: pnl })
  }

  const marks: MarksType[] = [
    { value: 0 },
    { value: 25 },
    { value: 50 },
    { value: 75 },
    { value: 100 },
  ]

  const percentQuantity = quantity * (value[0] / 100)
  const statusWord = status === 'long' ? 'Купить' : 'Продать'

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Закрыть позицию</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription hidden />
        <div className="px-4 pb-3.5">
          <div className="flex flex-col gap-2.5 pb-7 border-b-1">
            <TextDrawer label="Символ">
              <div className="flex items-center gap-0.5">
                <p className="text-sm">{couple}</p>
                <Badge value="Бесср" />
                <Badge mode={status} value={`${statusWord} ${leverage}х`} />
              </div>
            </TextDrawer>
            <TextDrawer label="Цена входа (USDT)">
              <CurrencyText
                value={price}
                decimalScale={4}
                fixedDecimalScale={false}
              />
            </TextDrawer>
            <TextDrawer label="Цена маркировки (USDT)">
              <CurrencyText
                value={markingPrice}
                decimalScale={7}
                fixedDecimalScale={false}
              />
            </TextDrawer>
          </div>
          <div className="pt-2.5 flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-muted">Цена</label>
              <div className="grid grid-cols-[2.3fr_1fr] gap-2 items-center mt-1.5">
                <Button
                  className="bg-[#333b47] justify-start text-[#4f5867] py-2.5 px-3 h-fit"
                  variant="secondary"
                >
                  Рыночная цена
                </Button>
                <Button
                  className="flex justify-end gap-4 pr-1.5! text-accent-foreground! font-normal text-sm h-full"
                  variant="secondary"
                >
                  Рынок
                  <Arrow className="fill-muted" />
                </Button>
              </div>
            </div>
            <div className="mb-1.5">
              <label className="text-sm font-medium text-muted">Сумма</label>
              <div className="flex gap-2 justify-between items-center mt-1.5 bg-secondary p-2.5 rounded-sm *:text-sm *:tracking-normal *:font-normal">
                <p>
                  {value[0]} % (
                  <CurrencyText
                    value={percentQuantity}
                    decimalScale={2}
                    fixedDecimalScale={false}
                    prefix="≈"
                  />
                  )
                </p>
                <p>USDT</p>
              </div>
            </div>
            <Slider
              defaultValue={[100]}
              value={value}
              onValueChange={handleChange}
              marks={marks}
              step={25}
              showTooltip={false}
            />
            <div className="mt-6 flex flex-col gap-2.5">
              <TextDrawer label="Сумма позиции">
                <CurrencyText
                  value={quantity}
                  decimalScale={2}
                  fixedDecimalScale={false}
                  suffix=" USDT"
                />
              </TextDrawer>
              <TextDrawer label="Расчетный PNL" mode={status} underlineLabel>
                <CurrencyText
                  value={pnl * (value[0] / 100)}
                  decimalScale={2}
                  fixedDecimalScale={false}
                  prefix={pnl > 0 ? '+' : ''}
                  suffix=" USDT"
                />
              </TextDrawer>
            </div>
          </div>
        </div>
        <DrawerFooter className="pb-12">
          <DrawerClose asChild>
            <Button
              className="bg-accent w-full py-5! text-base"
              onClick={handleCloseOrder}
            >
              Подтвердить
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
