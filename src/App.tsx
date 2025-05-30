import { CreateOrderContainer } from './components/control'
import { Header } from './components/header'
import { OrderList } from './components/orders'
import { ThemeProvider } from './shared/providers/theme-provider'

function App() {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='theme'>
			<main className='h-screen'>
				<Header />
				<CreateOrderContainer />
				<OrderList />
			</main>
		</ThemeProvider>
	)
}

export default App
