import { useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import type { WebSocketMessage } from '../types'

const WS_URL = 'wss://stream.bybit.com/v5/public/linear'

interface WebSocketConnectionOptions<T> {
  symbol: string
  topic: string
  onMessage: (message: WebSocketMessage<T>) => void
}

export const useWebSocketConnection = <T>({
  symbol,
  topic,
  onMessage,
}: WebSocketConnectionOptions<T>) => {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      onOpen: () => console.log('WebSocket connection opened ' + topic),
      onClose: () => console.log('WebSocket connection closed ' + topic),
      onError: (event) => console.error('WebSocket error: ', event),
      shouldReconnect: () => true,
    },
  )

  // Subscribe to WebSocket topic
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        op: 'subscribe',
        args: [`${topic}.${symbol}`],
      })
    }
  }, [readyState, sendJsonMessage, symbol, topic])

  // Handle incoming messages
  useEffect(() => {
    if (lastJsonMessage) {
      try {
        onMessage(lastJsonMessage as WebSocketMessage<T>)
      } catch (error) {
        console.error('Error processing message:', error)
      }
    }
  }, [lastJsonMessage, onMessage])

  // Unsubscribe on cleanup
  useEffect(() => {
    return () => {
      if (readyState === ReadyState.OPEN) {
        sendJsonMessage({
          op: 'unsubscribe',
          args: [`${topic}.${symbol}`],
        })
      }
    }
  }, [readyState, sendJsonMessage, symbol, topic])

  return { readyState }
}
