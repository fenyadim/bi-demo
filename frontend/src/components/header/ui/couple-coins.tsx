import Arrow from '@/assets/images/arrow-down.svg?react'
import { cn } from '@/lib/utils'
import { useStorage } from '@/shared/hooks'
import { useTicker } from '@/shared/providers/ticker-provider'
import { Badge, Button, CurrencyText } from '@/shared/ui'

export const CoupleCoins = () => {
  const { value } = useStorage('couple', 'BTCUSDT')
  const { ticker } = useTicker()

  const percent = ticker.price24hPcnt * 100

  return (
    <Button className="flex flex-col items-start gap-0 p-0" variant="ghost">
      <div className="flex items-center gap-0.5">
        <h2 className="text-lg leading-4">{value}</h2>
        <Badge value="Бесср" className="text-[10px] px-[2.5px]" />
        <Arrow className="fill-foreground size-4.5" />
      </div>
      <p
        className={cn('text-xs', {
          'text-success': percent > 0,
          'text-fail': percent < 0,
        })}
      >
        <CurrencyText
          value={percent}
          decimalScale={2}
          suffix=" %"
          prefix={percent > 0 ? '+' : ''}
        />
      </p>
    </Button>
  )
}
