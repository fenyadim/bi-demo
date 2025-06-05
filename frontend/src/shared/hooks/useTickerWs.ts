import { useCallback } from 'react'

import type { WebSocketMessage } from '../types'
import { useBufferState } from './useBufferState'
import { useWebSocketConnection } from './useWebSocketConnection'

interface TickerState {
  fundingRate: string
  nextFundingTime: string
  lastPrice: string
  markPrice: string
}

const initialTickerState: TickerState = {
  fundingRate: '',
  nextFundingTime: '',
  lastPrice: '',
  markPrice: '',
}

export const useTickerWs = (symbol: string = 'BTCUSDT') => {
  const { state: ticker, bufferRef } =
    useBufferState<TickerState>(initialTickerState)

  const handleMessage = useCallback(
    (message: WebSocketMessage<TickerState>) => {
      const { type, data } = message
      if (type === 'snapshot') {
        bufferRef.current = { ...data }
      } else if (type === 'delta') {
        bufferRef.current = { ...bufferRef.current, ...data }
      }
    },
    [bufferRef],
  )

  const { readyState } = useWebSocketConnection({
    symbol,
    topic: 'tickers',
    onMessage: handleMessage,
  })

  return { ticker, readyState }
}
