import { useCallback, useEffect, useRef, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import type { WebSocketMessage } from '../types'

const WS_URL = 'wss://stream.bybit.com/v5/public/linear'

interface TickerState {
  fundingRate: string
  nextFundingTime: string
  lastPrice: string
  markPrice: string
}

export const useTickerWs = (symbol: string = 'BTCUSDT') => {
  const bufferRef = useRef<TickerState>({
    fundingRate: '',
    nextFundingTime: '',
    lastPrice: '',
    markPrice: '',
  })

  const [ticker, setTicker] = useState<TickerState>({
    fundingRate: '',
    nextFundingTime: '',
    lastPrice: '',
    markPrice: '',
  })

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      onOpen: () => console.log('WebSocket connection opened'),
      onClose: () => console.log('WebSocket connection closed'),
      onError: (event) => console.error('WebSocket error:', event),
      shouldReconnect: () => true,
    },
  )

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        op: 'subscribe',
        args: [`tickers.${symbol}`],
      })
    }
  }, [readyState, sendJsonMessage, symbol])

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

  useEffect(() => {
    if (lastJsonMessage) {
      handleMessage(lastJsonMessage as WebSocketMessage<TickerState>)
    }
  }, [lastJsonMessage, handleMessage])

  useEffect(() => {
    const updateInterval = 1000 // Обновление UI каждую 1 секунду
    const intervalId = setInterval(() => {
      const newTicker = { ...bufferRef.current }
      setTicker(newTicker)
    }, updateInterval)

    return () => clearInterval(intervalId) // Очистка при размонтировании
  }, [])

  useEffect(() => {
    return () => {
      if (readyState === ReadyState.OPEN) {
        sendJsonMessage({
          op: 'unsubscribe',
          args: [`tickers.${symbol}`],
        })
      }
    }
  }, [readyState, sendJsonMessage, symbol])

  return { ticker }
}
