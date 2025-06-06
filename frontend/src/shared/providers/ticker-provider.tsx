import { createContext, useContext, useMemo } from 'react'
import type { ReadyState } from 'react-use-websocket'

import { useTickerWs } from '../hooks/useTickerWs'

interface TickerContextType {
  ticker: {
    fundingRate: number
    lastPrice: number
    markPrice: number
    nextFundingTime: number
    price24hPcnt: number
  }
  readyState: ReadyState
}

const TickerContext = createContext<TickerContextType | null>(null)

interface TickerProviderProps {
  children: React.ReactNode
  symbol?: string
}

export const TickerProvider = ({
  children,
  symbol = 'BTCUSDT',
}: TickerProviderProps) => {
  const { ticker, readyState } = useTickerWs(symbol)

  const value = useMemo(
    () => ({
      ticker,
      readyState,
    }),
    [ticker, readyState],
  )

  return (
    <TickerContext.Provider value={value}>{children}</TickerContext.Provider>
  )
}

export const useTicker = () => {
  const context = useContext(TickerContext)
  if (!context) {
    throw new Error('useTicker must be used within a TickerProvider')
  }
  return context
}
