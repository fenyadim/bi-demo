import { createFileRoute } from '@tanstack/react-router'

import { CreateOrderContainer } from '@/components/control'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { OrderList } from '@/components/orders'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <Header />
      <CreateOrderContainer />
      <OrderList />
      <Footer />
    </>
  )
}
