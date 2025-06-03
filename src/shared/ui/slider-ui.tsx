import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { Badge } from './badge'

type ISlider = {
  showTooltip?: boolean
} & React.ComponentProps<typeof SliderPrimitive.Root>

function Slider({
  className,
  defaultValue,
  value = [0],
  min = 0,
  max = 100,
  showTooltip = true,
  ...props
}: ISlider) {
  const [showTooltipState, setShowTooltipState] = React.useState(false)

  const handlePointerDown = () => {
    setShowTooltipState(true)
  }

  const handlePointerUp = () => {
    setShowTooltipState(false)
  }

  React.useEffect(() => {
    document.addEventListener('pointerup', handlePointerUp)
    return () => {
      document.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      onPointerDown={handlePointerDown}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          '-z-20 bg-secondary relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            'bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
          )}
        />
      </SliderPrimitive.Track>

      {props.children}

      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        className="block shrink-0 border disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-0 after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:bg-background after:size-3 after:rotate-45 after:block after:rounded-[3px] after:border-primary after:border"
        onMouseDown={() => setShowTooltipState(true)}
        onMouseUp={() => setShowTooltipState(false)}
      >
        <Badge
          className={cn(
            'bg-foreground text-background font-normal text-[10px] rounded-xs absolute left-1/2 -translate-x-1/2 -translate-y-1/2 -top-4.5',
            {
              hidden: showTooltip ? !showTooltipState : true,
            },
          )}
          value={`${value[0]}%`}
        />
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
}

export { Slider }
