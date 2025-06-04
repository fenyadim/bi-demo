import _ from 'lodash'
import useWebSocket from 'react-use-websocket'

type ResponseData = {
  a: Array<string>[]
  b: Array<string>[]
}

const socketUrl = 'wss://stream.binance.com:9443/ws/'

export const useOrderBookWs = (couple: string) => {
  const { lastJsonMessage } = useWebSocket<ResponseData>(
    socketUrl + `${couple.toLowerCase()}@depth`,
    {
      onOpen: () => console.log('WebSockekt connection opened.'),
      onClose: () => console.log('WebSockekt connection closed.'),
    },
  )

  const asks = lastJsonMessage?.a.filter(
    (item) => !_.includes(item, '0.00000000'),
  )

  const bids = lastJsonMessage?.b.filter(
    (item) => !_.includes(item, '0.00000000'),
  )

  return {
    asks: _.take(asks, 7),
    bids: _.take(bids, 7),
  }
}
