import { useMemo } from 'react'

import { useStorage } from '@/shared/hooks'
import { useTickerWs } from '@/shared/hooks/useTickerWs'

export const FundingElement = () => {
  const { value } = useStorage<string>('couple')
  const { ticker } = useTickerWs(value)

  const funding = (parseFloat(ticker.fundingRate) * 100).toFixed(4)

  const countdown = useMemo(() => {
    if (ticker.nextFundingTime === '') return 'N/A'
    const now = Date.now()
    const timeDiff = Number(ticker.nextFundingTime) - now
    if (timeDiff <= 0) return '00:00:00'
    const hours = Math.floor(timeDiff / 1000 / 3600)
    const minutes = Math.floor(((timeDiff / 1000) % 3600) / 60)
    const seconds = Math.floor((timeDiff / 1000) % 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [ticker])

  return (
    <div>
      <h3 className="border-b-1 border-dotted w-fit text-muted text-[10px] leading-3">
        Ставка / Осталось
      </h3>
      <p>
        {funding} % / {countdown}
      </p>
    </div>
  )
}
