import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WebFont from 'webfontloader'
import App from './App.tsx'
import './globals.css'

WebFont.load({
	custom: {
		families: ['BinancePlex: n2,n3,n4,n5'],
		urls: ['/styles/fonts.css'],
	},
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
