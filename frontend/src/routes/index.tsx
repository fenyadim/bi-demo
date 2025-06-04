import { createFileRoute } from '@tanstack/react-router'

import { CreateOrderContainer } from '@/components/control'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { OrderList } from '@/components/orders'
import { trpc } from '@/lib/trpc'
import { cn } from '@/lib/utils'
import { useSheetToggle } from '@/shared/providers/sheet-provider'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { isOpen } = useSheetToggle()

  const { data } = trpc.getTest.useQuery()

  console.log(data)

  return (
    <>
      <div
        className={cn('transition-all duration-400', {
          '-translate-x-15': isOpen,
        })}
      >
        <Header />
        <CreateOrderContainer />
        <OrderList />
      </div>
      <Footer
        className={cn('transition-all duration-400', {
          '-translate-x-15': isOpen,
        })}
      />
    </>
  )
}
