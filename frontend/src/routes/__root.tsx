import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { PhoneHead } from '@/components/phone-head'
import { TrpcProvider } from '@/lib/trpc'
import { SheetProvider } from '@/shared/providers/sheet-provider'
import { ThemeProvider } from '@/shared/providers/theme-provider'
import { Toaster } from '@/shared/ui'

export const Route = createRootRoute({
  component: () => (
    <>
      <TrpcProvider>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          <div className="fixed z-60 top-0 left-0 right-0 bg-background h-[70px]">
            <PhoneHead />
          </div>
          <SheetProvider>
            <main className="relative pt-[70px]">
              <Outlet />
              <Toaster />
            </main>
          </SheetProvider>
          <div className="fixed bottom-0 left-0 right-0 z-70 flex items-center justify-center py-[9px]">
            <span className="block h-1 w-[158px] rounded-full bg-foreground" />
          </div>
        </ThemeProvider>
      </TrpcProvider>
      <TanStackRouterDevtools />
    </>
  ),
})
