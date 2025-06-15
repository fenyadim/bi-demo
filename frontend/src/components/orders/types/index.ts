export interface IOrder {
  id: string
  /** Статус (long/short) */
  status: 'long' | 'short'
  /** Цена входа */
  price: number
  /** Плечо */
  leverage: number
  /** Маржа (USDT) */
  marginValue: number
  /** Валютная пара */
  couple: string
  /** Открытый ордер */
  isOpen: boolean
  /** Коэффициент маржи */
  marginRatio: number | null
}
