import { CreateOrderContainer } from './components/control'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { OrderList } from './components/orders'
import { ThemeProvider } from './shared/providers/theme-provider'

function App() {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='theme'>
			<main className='relative h-screen'>
				<Header />
				<CreateOrderContainer />
				<OrderList />
				<Footer />
			</main>
		</ThemeProvider>
	)
}

export default App
