import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'
import { Slider as SliderUI } from '@/shared/ui/slider-ui'

export type MarksType = {
  value: number
  label?: string | number
}

interface ISlider extends React.ComponentProps<typeof SliderPrimitive.Root> {
  showTooltip?: boolean
  marks: MarksType[]
}

export const Slider = ({
  className,
  showTooltip = true,
  max = 100,
  defaultValue = [0],
  value = defaultValue,
  marks,
  onValueChange,
  ...props
}: ISlider) => {
  return (
    <div className={cn('relative px-1', className)}>
      <SliderUI
        value={value}
        max={max}
        onValueChange={onValueChange}
        showTooltip={showTooltip}
        {...props}
      >
        <ul className="absolute -z-10 -top-[3px] -left-[3.5px] -right-[3.5px] flex justify-between">
          {marks.map(({ value: title, label }) => (
            <li
              className="flex flex-col items-center justify-center relative"
              key={title}
            >
              <span
                className={cn(
                  'block size-2 border border-muted bg-background! rounded-xs rotate-45',
                  {
                    'bg-primary! border-primary!': value[0] >= title,
                  },
                )}
              />
              <p className="absolute top-3 text-muted">{label}</p>
            </li>
          ))}
        </ul>
      </SliderUI>
    </div>
  )
}
