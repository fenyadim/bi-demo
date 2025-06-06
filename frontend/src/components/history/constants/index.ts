import type { IOrder } from '../ui/order'

export const TABS: { title: string; isActive?: boolean }[] = [
  {
    title: 'История ордеров',
  },
  {
    title: 'История позиций',
    isActive: true,
  },
  {
    title: 'История торговли',
  },
  {
    title: 'История транзакций',
  },
  {
    title: 'Коммиссия за финансирование',
  },
]

export const CLOSE_ORDERS: IOrder[] = [
  {
    couple: 'TONUSDT',
    status: 'long',
    pnl: 2.04,
    volumeClose: 0.001,
    priceEntry: 110255.3,
    priceAverage: 108240.9,
    priceMax: 0.001,
  },
  {
    couple: 'TONUSDT',
    status: 'long',
    pnl: -2.04,
    volumeClose: 0.001,
    priceEntry: 110255.3,
    priceAverage: 108240.9,
    priceMax: 0.001,
  },
  {
    couple: 'TONUSDT',
    status: 'long',
    pnl: -2.04,
    volumeClose: 0.001,
    priceEntry: 110255.3,
    priceAverage: 108240.9,
    priceMax: 0.001,
  },
  {
    couple: 'TONUSDT',
    status: 'short',
    pnl: -2.04,
    volumeClose: 0.001,
    priceEntry: 110255.3,
    priceAverage: 108240.9,
    priceMax: 0.001,
  },
]
