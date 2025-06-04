import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import './globals.css'
import { routeTree } from './routeTree.gen.ts'

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'],
})

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  history: memoryHistory,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
