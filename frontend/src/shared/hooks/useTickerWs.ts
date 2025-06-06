import { useCallback, useMemo } from 'react'
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
    [],
  )

  const { readyState } = useWebSocketConnection({
    symbol,
    topic: 'tickers',
    onMessage: handleMessage,
  })

  const memoizedTicker = useMemo(
    () => ({
      fundingRate: Number(ticker.fundingRate),
      lastPrice: Number(ticker.lastPrice),
      markPrice: Number(ticker.markPrice),
      nextFundingTime: Number(ticker.nextFundingTime),
      price24hPcnt: Number(ticker.price24hPcnt),
    }),
    [
      ticker.fundingRate,
      ticker.lastPrice,
      ticker.markPrice,
      ticker.nextFundingTime,
      ticker.price24hPcnt,
    ],
  )

  return {
    ticker: memoizedTicker,
    readyState,
  }
}
