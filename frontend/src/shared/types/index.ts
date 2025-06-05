export type ModeType = 'long' | 'short' | 'accent'

export interface IStakes {
  price: number
  amount: number
  fillProcent?: number
}

export type OrderBookEntry = [string, string][]

export interface OrderBookData {
  s: string // Symbol (e.g., BTCUSDT)
  b: OrderBookEntry // Bids
  a: OrderBookEntry // Asks
}

export interface WebSocketMessage {
  topic: string
  data: OrderBookData
  type: 'snapshot' | 'delta' // Type of update
}

export interface OrderBookState {
  bids: OrderBookEntry
  asks: OrderBookEntry
}
