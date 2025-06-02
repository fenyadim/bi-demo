import { Link } from '@tanstack/react-router'

import Back from '@/assets/images/back.svg?react'
import EmptyOrder from '@/assets/images/empty-order.svg?react'
import Filter from '@/assets/images/filter.svg?react'
import { cn } from '@/lib/utils'
import { Button } from '@/shared/ui'

import { CLOSE_ORDERS, TABS } from '../constants'
import { FilterItem } from './filter-item'
import { Order } from './order'

export const HistoryPage = () => {
  return (
    <div className="*:px-4">
      <div className="grid grid-cols-3 items-center pb-5">
        <Link to="/" className="size-3">
          <Back className="h-3" />
        </Link>
        <h1 className="justify-self-center text-base font-medium">USDⓈ-M</h1>
      </div>
      <div className="border-b-1 px-0!">
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
      <div className="flex flex-col pt-3">
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
        {CLOSE_ORDERS.length > 0 ? (
          <div className="mb-5">
            {CLOSE_ORDERS.map((item) => (
              <Order {...item} />
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
