import { Header } from './components/header'
import { ThemeProvider } from './shared/providers/theme-provider'

function App() {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='theme'>
			<div className='h-screen'>
				<Header />
			</div>
		</ThemeProvider>
	)
}

export default App
