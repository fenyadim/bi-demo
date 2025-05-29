import { cn } from '@/lib/utils'
import { Slider as SliderUI } from '@/shared/ui'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { useState } from 'react'

interface ISlider extends React.ComponentProps<typeof SliderPrimitive.Root> {
	countMarks: number
}

export const Slider = ({
	className,
	countMarks,
	max = 100,
	...props
}: ISlider) => {
	const [value, setValue] = useState([0])
	const count = countMarks - 1

	const handleChange = (value: number[]) => {
		setValue(value)
	}

	return (
		<div className={cn('relative px-1', className)}>
			<SliderUI
				value={value}
				max={max}
				{...props}
				onValueChange={handleChange}
			/>
			<ul className='flex justify-between w-full px-1'>
				{Array(countMarks)
					.fill(0)
					.map((_, index) => (
						<li className='flex justify-center relative' key={index}>
							<span
								className={cn(
									'absolute -z-10 -top-px transform -translate-y-1/2 block size-2 border border-muted bg-background! rounded-xs rotate-45',
									{
										'bg-primary! border-primary!':
											value[0] >= (index / count) * max,
									}
								)}
							/>
						</li>
					))}
			</ul>
		</div>
	)
}
