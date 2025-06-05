import { ControlBlock } from './control-block'
import { OrderBookBlock } from './order-book-block'

export const CreateOrderContainer = () => {
  return (
    <div className="grid grid-cols-[1.3fr_2fr] gap-4 pt-0 p-4">
      <OrderBookBlock />
      <ControlBlock />
    </div>
  )
}
