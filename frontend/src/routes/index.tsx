import { createFileRoute } from '@tanstack/react-router'

import { CreateOrderContainer } from '@/components/control'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { OrderList } from '@/components/orders'
import { cn } from '@/lib/utils'
import { useStorage } from '@/shared/hooks'
import { useSheetToggle } from '@/shared/providers/sheet-provider'
import { TickerProvider } from '@/shared/providers/ticker-provider'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { isOpen } = useSheetToggle()
  const { value } = useStorage<string>('couple')

  return (
    <>
      <div
        className={cn('transition-all duration-400', {
          '-translate-x-15': isOpen,
        })}
      >
        <TickerProvider symbol={value}>
          <Header />
          <CreateOrderContainer />
          <OrderList />
        </TickerProvider>
      </div>
      <Footer
        className={cn('transition-all duration-400', {
          '-translate-x-15': isOpen,
        })}
      />
    </>
  )
}
