import { useCallback } from 'react'
import { ReadyState } from 'react-use-websocket'

import type { OrderBookData, OrderBookState, WebSocketMessage } from '../types'
import { useBufferState } from './useBufferState'
import { useWebSocketConnection } from './useWebSocketConnection'

interface OrderBookHook {
  orderBook: OrderBookState
  readyState: ReadyState
}

const initialOrderBook: OrderBookState = {
  bids: [],
  asks: [],
}

export const useOrderBookWs = (
  symbol: string = 'BTCUSDT',
  depth: number = 50,
): OrderBookHook => {
  const { state: orderBook, bufferRef } =
    useBufferState<OrderBookState>(initialOrderBook)

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
        if (index !== -1) updatedBids.splice(index, 1)
      } else {
        if (index !== -1) {
          updatedBids[index] = [price, quantity]
        } else {
          updatedBids.push([price, quantity])
        }
      }
    })

    // Применение дельта-обновлений для asks
    delta.a?.forEach(([price, quantity]) => {
      const index = updatedAsks.findIndex(([p]) => p === price)
      if (quantity === '0') {
        if (index !== -1) updatedAsks.splice(index, 1)
      } else {
        if (index !== -1) {
          updatedAsks[index] = [price, quantity]
        } else {
          updatedAsks.push([price, quantity])
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

    return {
      bids: sortedBids,
      asks: sortedAsks,
    }
  }

  const handleMessage = useCallback(
    (message: WebSocketMessage<OrderBookData>) => {
      const { type, data } = message
      if (type === 'snapshot') {
        bufferRef.current = { bids: data.b || [], asks: data.a || [] }
      } else if (type === 'delta') {
        bufferRef.current = applyDeltaUpdate(bufferRef.current, data)
      }
    },
    [bufferRef],
  )

  const { readyState } = useWebSocketConnection({
    symbol,
    topic: `orderbook.${depth}`,
    onMessage: handleMessage,
  })

  return { orderBook, readyState }
}
