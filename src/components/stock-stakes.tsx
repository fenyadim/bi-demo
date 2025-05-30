import type { IStakes } from '@/shared/types/stakes'
import type { CSSProperties } from 'react'

type ModeType = 'long' | 'short'

interface IStockStakes {
	stakes: IStakes[]
	mode: ModeType
}

export const StockStakes = ({ stakes, mode }: IStockStakes) => {
	const modeTheme: Record<ModeType, 'success' | 'fail'> = {
		short: 'fail',
		long: 'success',
	}

	const fontColor: CSSProperties = {
		color: `var(--${modeTheme[mode]})`,
	}

	const fillBox: (fillProcent: number) => CSSProperties = fillProcent => ({
		backgroundColor: `var(--${modeTheme[mode]})`,
		width: `${fillProcent * 100}%`,
	})

	return (
		<div>
			{stakes.map(({ price, amount, fillProcent }) => (
				<div key={price} className='relative flex justify-between w-full py-px'>
					<p className='font-normal' style={fontColor}>
						{price}
					</p>
					<p>{amount}</p>
					<div
						className='absolute -z-10 right-0 opacity-5 h-full'
						style={fillBox(fillProcent)}
					/>
				</div>
			))}
		</div>
	)
}
