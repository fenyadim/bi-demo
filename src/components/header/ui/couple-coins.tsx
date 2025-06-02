import Arrow from '@/assets/images/arrow-down.svg?react'
import { Badge, Button } from '@/shared/ui'

export const CoupleCoins = () => {
  return (
    <Button className="flex flex-col items-start gap-0 p-0" variant="ghost">
      <div className="flex items-center gap-0.5">
        <h2 className="text-lg leading-4">BTCUSDT</h2>
        <Badge value="Бесср" className="text-[10px] px-[2.5px]" />
        <Arrow className="fill-foreground size-4.5" />
      </div>
      <p className="text-success text-xs">+2,45 %</p>
    </Button>
  )
}
