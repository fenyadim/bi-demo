import { useCallback } from 'react'
import type { ReadyState } from 'react-use-websocket'

import type { WebSocketMessage } from '../types'
import { useBufferState } from './useBufferState'
import { useWebSocketConnection } from './useWebSocketConnection'

interface TickerState {
  fundingRate: string
  nextFundingTime: string
  lastPrice: string
  markPrice: string
  price24hPcnt: string
}

const initialTickerState: TickerState = {
  fundingRate: '',
  nextFundingTime: '',
  lastPrice: '',
  markPrice: '',
  price24hPcnt: '',
}

interface Return {
  ticker: Record<keyof TickerState, number>
  readyState: ReadyState
}

export const useTickerWs = (symbol: string = 'BTCUSDT'): Return => {
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

  return {
    ticker: {
      fundingRate: Number(ticker.fundingRate),
      lastPrice: Number(ticker.lastPrice),
      markPrice: Number(ticker.markPrice),
      nextFundingTime: Number(ticker.nextFundingTime),
      price24hPcnt: Number(ticker.price24hPcnt),
    },
    readyState,
  }
}
