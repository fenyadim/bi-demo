import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { modeToStyle } from '@/shared/constants'
import type { ModeType } from '@/shared/types'

interface IOrderItem {
  title: string
  children: ReactNode
  mode?: ModeType
  size?: 'base' | 'lg'
  align?: 'start' | 'end'
  className?: string
}

export const OrderItem = ({
  title,
  children,
  mode,
  size = 'base',
  align = 'start',
  className,
}: IOrderItem) => {
  const fontColor: CSSProperties = {
    color: `var(--${modeToStyle[mode!]})`,
  }

  const alignLabel: CSSProperties = {
    alignItems: align,
  }

  return (
    <div className={cn('flex flex-col', className)} style={alignLabel}>
      <label
        className={cn(
          'text-muted text-[12px] mb-0.5 tracking-normal whitespace-nowrap w-fit flex items-center gap-1.5',
        )}
      >
        {title}
      </label>
      <p
        className={cn({
          'text-base font-normal': size === 'lg',
          'text-sm': size === 'base',
        })}
        style={mode && fontColor}
      >
        {children}
      </p>
    </div>
  )
}
