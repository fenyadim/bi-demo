import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'
import { Slider as SliderUI } from '@/shared/ui/slider-ui'

interface ISlider extends React.ComponentProps<typeof SliderPrimitive.Root> {
  countMarks: number
  showTooltip?: boolean
}

export const Slider = ({
  className,
  countMarks,
  showTooltip = true,
  max = 100,
  defaultValue = [0],
  value = defaultValue,
  onValueChange,
  ...props
}: ISlider) => {
  const count = countMarks - 1

  return (
    <div className={cn('relative px-1', className)}>
      <SliderUI
        value={value}
        max={max}
        onValueChange={onValueChange}
        showTooltip={showTooltip}
        {...props}
      />
      <ul className="flex justify-between w-full px-1">
        {Array(countMarks)
          .fill(0)
          .map((_, index) => (
            <li className="flex justify-center relative" key={index}>
              <span
                className={cn(
                  'absolute -z-10 -top-px transform -translate-y-1/2 block size-2 border border-muted bg-background! rounded-xs rotate-45',
                  {
                    'bg-primary! border-primary!':
                      value[0] >= (index / count) * max,
                  },
                )}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
