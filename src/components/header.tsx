import { Menu } from 'lucide-react'

export const Header = () => {
	return (
		<header className='pt-17.5 px-4 pr-3 pb-1.5 flex justify-between border-b-1'>
			<nav className='flex gap-3.5'>
				<h2 className='font-semibold text-lg antialiased'>USDⓈ-M</h2>
				<h2 className='font-semibold text-lg text-muted'>COIN-M</h2>
				<h2 className='font-semibold text-lg text-muted'>Опционы</h2>
			</nav>
			<Menu className='scale-x-75' strokeWidth={3} radius={0} />
		</header>
	)
}
