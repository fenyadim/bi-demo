import { formatter } from 'kmformatter'
import type { CSSProperties } from 'react'

import { modeToStyle } from '@/shared/constants'
import type { IStakes, ModeType } from '@/shared/types'
import { CurrencyText } from '@/shared/ui'

interface IStockStakes {
  stakes: IStakes[]
  mode: ModeType
}

export const StockStakes = ({ stakes, mode }: IStockStakes) => {
  const fontColor: CSSProperties = {
    color: `var(--${modeToStyle[mode]})`,
  }

  const fillBox: (fillProcent: number) => CSSProperties = (fillProcent) => ({
    backgroundColor: `var(--${modeToStyle[mode]})`,
    width: `${fillProcent * 100}%`,
  })

  return (
    <div>
      {stakes.map(({ price, amount, fillProcent }) => (
        <div key={price} className="relative flex justify-between w-full py-px">
          <p className="font-normal" style={fontColor}>
            <CurrencyText value={price} />
          </p>
          <p>{formatter(amount, 2).replace(/\./g, ',')}</p>
          <div
            className="absolute -z-10 right-0 opacity-5 h-full"
            style={fillBox(fillProcent)}
          />
        </div>
      ))}
    </div>
  )
}
