import { ReactComponent as Actives } from '@/assets/images/actives.svg'
import { ReactComponent as Futures } from '@/assets/images/futures.svg'
import { ReactComponent as Home } from '@/assets/images/home.svg'
import { ReactComponent as Markets } from '@/assets/images/markets.svg'
import { ReactComponent as Trading } from '@/assets/images/trading.svg'

import type { INavButton } from '../ui/nav-button'

export const navItems: INavButton[] = [
  { title: 'Главная', Icon: Home },
  { title: 'Рынки', Icon: Markets },
  { title: 'Торговля', Icon: Trading },
  { title: 'Фьючерсы', Icon: Futures, isActive: true },
  { title: 'Активы', Icon: Actives },
]
