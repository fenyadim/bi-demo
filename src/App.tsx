import { CreateOrderContainer } from './components/create-order-container'
import { Header } from './components/header'
import { PositionContainer } from './components/position-container'
import { ThemeProvider } from './shared/providers/theme-provider'

function App() {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='theme'>
			<main className='h-screen'>
				<Header />
				<CreateOrderContainer />
				<PositionContainer />
			</main>
		</ThemeProvider>
	)
}

export default App
