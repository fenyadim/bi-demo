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

    // Сортировка и проверка
    const sortedBids = updatedBids.sort(
      (a, b) => parseFloat(b[0]) - parseFloat(a[0]),
    )
    const sortedAsks = updatedAsks.sort(
      (a, b) => parseFloat(a[0]) - parseFloat(b[0]),
    )

    // Проверка аномалии
    if (sortedBids.length > 0 && sortedAsks.length > 0) {
      const bestBid = parseFloat(sortedBids[0][0])
      const bestAsk = parseFloat(sortedAsks[0][0])
      if (bestBid > bestAsk) {
        console.warn(
          `Anomaly detected: Best bid (${bestBid}) > Best ask (${bestAsk})`,
          {
            bids: sortedBids.slice(0, 7),
            asks: sortedAsks.slice(0, 7),
          },
        )
      }
    }

    return {
      bids: sortedBids,
      asks: sortedAsks,
    }
  }

  const handleMessage = useCallback(
    (message: WebSocketMessage) => {
      if (message.topic === `orderbook.${depth}.${symbol}`) {
        const { type, data } = message
        if (type === 'snapshot') {
          setOrderBook({ bids: data.b || [], asks: data.a || [] })
        } else if (type === 'delta') {
          setOrderBook((prev) => applyDeltaUpdate(prev, data))
        }
      }
    },
    [symbol, depth],
  )

  // Обработка входящих сообщений
  useEffect(() => {
    if (lastJsonMessage) {
      handleMessage(lastJsonMessage as WebSocketMessage)
    }
  }, [lastJsonMessage, handleMessage])

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
