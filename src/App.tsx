import { Content } from './components/content'
import { Header } from './components/header'
import { ThemeProvider } from './shared/providers/theme-provider'

function App() {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='theme'>
			<main className='h-screen'>
				<Header />
				<Content />
			</main>
		</ThemeProvider>
	)
}

export default App
