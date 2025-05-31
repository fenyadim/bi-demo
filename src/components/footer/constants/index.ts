import Actives from '@/assets/images/actives.svg?react'
import Futures from '@/assets/images/futures.svg?react'
import Home from '@/assets/images/home.svg?react'
import Markets from '@/assets/images/markets.svg?react'
import Trading from '@/assets/images/trading.svg?react'
import type { INavButton } from '../ui/nav-button'

export const navItems: INavButton[] = [
	{ title: 'Главная', Icon: Home },
	{ title: 'Рынки', Icon: Markets },
	{ title: 'Торговля', Icon: Trading },
	{ title: 'Фьючерсы', Icon: Futures, isActive: true },
	{ title: 'Активы', Icon: Actives },
]
