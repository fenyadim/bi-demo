import { ReactComponent as Back } from '@/assets/images/back.svg'
import { ReactComponent as EmptyOrder } from '@/assets/images/empty-order.svg'
import { ReactComponent as Filter } from '@/assets/images/filter.svg'
import { trpc } from '@/lib/trpc'
import { cn } from '@/lib/utils'
import { Button, SheetClose } from '@/shared/ui'

import { TABS } from '../constants'
import { FilterItem } from './filter-item'
import { Order } from './order'

export const HistoryPage = () => {
  const { data: orders } = trpc.getCloseOrders.useQuery()

  if (!orders) return null

  return (
    <div className="*:px-4 overflow-y-auto scrollbar-hidden">
      <div className="grid grid-cols-3 items-center pb-5 sticky top-0 bg-background">
        <SheetClose className="size-3">
          <Back className="h-3" />
        </SheetClose>
        <h1 className="justify-self-center text-base font-medium">USDⓈ-M</h1>
      </div>
      <div className="border-b-1 px-0! sticky top-[44px] bg-background">
        <div className="flex overflow-x-scroll scrollbar-hidden gap-4 px-3 *:text-[13px] *:tracking-wider *:text-muted *:font-normal *:pb-[7px] *:whitespace-nowrap">
          {TABS.map(({ title, isActive }) => (
            <h2
              key={title}
              className={cn({
                'relative text-foreground! before:absolute before:transform before:-translate-1/2 before:left-1/2 before:bottom-0 before:h-[2px] before:w-[15px] before:bg-accent':
                  isActive,
              })}
            >
              {title}
            </h2>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="sticky top-[72px] pt-3 bg-background">
          <div className="flex justify-between items-center">
            <div className="flex gap-0.5">
              <FilterItem title="Символ" />
              <FilterItem title="Режим" />
              <FilterItem title="Статус" />
            </div>
            <Button className="h-fit p-0!" variant="ghost">
              <Filter className="size-3.5" />
            </Button>
          </div>
          <div className="flex flex-col gap-2.5 pt-2.5 pb-0.5">
            <p className="text-muted">
              Последнее обновление: 2025-05-29 13:40:59
            </p>
            <p className="text-muted leading-4">
              * Из-за сложности данных возможны задержки. Прокрутите вниз, чтобы
              обновить данные
            </p>
          </div>
        </div>
        {orders.length > 0 ? (
          <div className="mb-5">
            {orders.map((item, index) => (
              <Order key={index} {...item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 pt-20">
            <EmptyOrder className="size-12" />
            <h2 className="text-muted">Нет результатов</h2>
          </div>
        )}
      </div>
    </div>
  )
}
