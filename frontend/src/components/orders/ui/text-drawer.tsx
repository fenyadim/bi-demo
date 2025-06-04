import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { modeToStyle } from '@/shared/constants'
import type { ModeType } from '@/shared/types'

interface ITextDrawer {
  label: string
  mode?: ModeType
  underlineLabel?: boolean
  children: ReactNode
}

export const TextDrawer = ({
  label,
  children,
  mode,
  underlineLabel = false,
}: ITextDrawer) => {
  const textColor: CSSProperties = {
    color: `var(--${modeToStyle[mode!]})`,
  }

  return (
    <div className="flex justify-between">
      <p
        className={cn('font-light text-sm text-muted tracking-normal', {
          'border-b-1 border-dotted': underlineLabel,
        })}
      >
        {label}
      </p>
      <h3 className="text-sm" style={mode && textColor}>
        {children}
      </h3>
    </div>
  )
}
