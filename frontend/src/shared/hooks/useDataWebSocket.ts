import useWebSocket from 'react-use-websocket'

type ResponseData = {
  /**
   * Symbol
   */
  s: string
  /**
   * Price change percent
   */
  P: string
  /**
   * Last price
   */
  c: string
  /**
   * High price
   */
  h: string
  /**
   * Open price
   */
  o: string
  /**
   * Low price
   */
  l: string
  /**
   * Time
   */
  E: number
}

const socketUrl = 'wss://stream.binance.com:9443/ws/'

export const useDataWebSocket = (couple: string) => {
  const { lastJsonMessage } = useWebSocket<ResponseData>(
    socketUrl + `${couple.toLowerCase()}@ticker100`,
    {
      onOpen: () => console.log('WebSockekt connection opened.'),
      onClose: () => console.log('WebSockekt connection closed.'),
    },
  )

  return {
    marking: Number(lastJsonMessage?.c),
    precent: Number(lastJsonMessage?.P),
    open: Number(lastJsonMessage?.o),
    high: Number(lastJsonMessage?.h),
    low: Number(lastJsonMessage?.l),
    time: lastJsonMessage?.E,
  }
}
