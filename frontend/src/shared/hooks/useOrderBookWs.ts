import { throttle } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import type { OrderBookData, OrderBookState, WebSocketMessage } from '../types'

const WS_URL = 'wss://stream.bybit.com/v5/public/linear'

export const useOrderBookWs = (
  symbol: string = 'BTCUSDT',
  depth: number = 50,
): { orderBook: OrderBookState; readyState: ReadyState } => {
  const [orderBook, setOrderBook] = useState<OrderBookState>({
    bids: [],
    asks: [],
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

  // Подписка на order book
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        op: 'subscribe',
        args: [`orderbook.${depth}.${symbol}`],
      })
    }
  }, [readyState, sendJsonMessage, symbol, depth])

  // Обработка дельта-обновлений
  const applyDeltaUpdate = (
    currentOrderBook: OrderBookState,
    delta: OrderBookData,
  ): OrderBookState => {
    const updatedBids = [...currentOrderBook.bids]
    const updatedAsks = [...currentOrderBook.asks]

    // Применение дельта-обновлений для bids
    delta.b?.forEach(([price, quantity]) => {
      const index = updatedBids.findIndex(([p]) => p === price)
      if (quantity === '0') {
        if (index !== -1) updatedBids.splice(index, 1) // Удаление уровня
      } else {
        if (index !== -1) {
          updatedBids[index] = [price, quantity] // Обновление уровня
        } else {
          updatedBids.push([price, quantity]) // Добавление нового уровня
        }
      }
    })

    // Применение дельта-обновлений для asks
    delta.a?.forEach(([price, quantity]) => {
      const index = updatedAsks.findIndex(([p]) => p === price)
      if (quantity === '0') {
        if (index !== -1) updatedAsks.splice(index, 1) // Удаление уровня
      } else {
        if (index !== -1) {
          updatedAsks[index] = [price, quantity] // Обновление уровня
        } else {
          updatedAsks.push([price, quantity]) // Добавление нового уровня
        }
      }
    })

    // Сортировка: bids по убыванию, asks по возрастанию
    return {
      bids: updatedBids.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0])),
      asks: updatedAsks.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])),
    }
  }

  const handleMessage = useCallback(
    throttle((message: WebSocketMessage) => {
      if (message.topic === `orderbook.${depth}.${symbol}`) {
        const { type, data } = message
        if (type === 'snapshot') {
          setOrderBook({ bids: data.b || [], asks: data.a || [] })
        } else if (type === 'delta') {
          setOrderBook((prev) => applyDeltaUpdate(prev, data))
        }
      }
    }, 1000),
    [symbol, depth],
  )

  // Обработка входящих сообщений
  useEffect(() => {
    if (lastJsonMessage) {
      handleMessage(lastJsonMessage as WebSocketMessage)
    }
  }, [lastJsonMessage, symbol, depth, handleMessage])

  // Отписка при размонтировании
  useEffect(() => {
    return () => {
      if (readyState === ReadyState.OPEN) {
        sendJsonMessage({
          op: 'unsubscribe',
          args: [`orderbook.${depth}.${symbol}`],
        })
      }
    }
  }, [readyState, sendJsonMessage, symbol, depth])

  return { orderBook, readyState }
}
