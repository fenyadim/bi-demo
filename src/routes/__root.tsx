import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { ThemeProvider } from '@/shared/providers/theme-provider'

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <div className="fixed z-20 top-0 left-0 right-0 bg-background h-[70px]"></div>
        <main className="relative top-[70px] h-full">
          <Outlet />
        </main>
        <div className="fixed bottom-0 left-0 right-0 z-[60] flex items-center justify-center py-[9px]">
          <span className="block h-1 w-[158px] rounded-full bg-foreground" />
        </div>
      </ThemeProvider>
      <TanStackRouterDevtools />
    </>
  ),
})
