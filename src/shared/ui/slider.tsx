import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn } from '@/lib/utils'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './tooltip'

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
	const _values = React.useMemo(
		() =>
			Array.isArray(value)
				? value
				: Array.isArray(defaultValue)
				? defaultValue
				: [min, max],
		[value, defaultValue, min, max]
	)

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
			data-slot='slider'
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			onPointerDown={handlePointerDown}
			className={cn(
				'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
				className
			)}
			{...props}
		>
			<SliderPrimitive.Track
				data-slot='slider-track'
				className={cn(
					'-z-20 bg-secondary relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'
				)}
			>
				<SliderPrimitive.Range
					data-slot='slider-range'
					className={cn(
						'bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full'
					)}
				/>
			</SliderPrimitive.Track>
			{Array.from({ length: _values.length }, (_, index) => (
				<TooltipProvider key={index}>
					<Tooltip open={showTooltipState}>
						<TooltipTrigger asChild>
							<SliderPrimitive.Thumb
								data-slot='slider-thumb'
								className='border-primary bg-background block size-3 shrink-0 rounded-[3px] rotate-45 border disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-0'
								onMouseDown={() => setShowTooltipState(true)}
								onMouseUp={() => setShowTooltipState(false)}
							/>
						</TooltipTrigger>
						<TooltipContent>{value ? `${value[0]}%` : 0}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			))}
		</SliderPrimitive.Root>
	)
}

export { Slider }
