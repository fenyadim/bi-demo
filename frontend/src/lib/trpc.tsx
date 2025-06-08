import type { TrpcRouter } from '@bi-demo/backend/src/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createTRPCReact,
  httpBatchLink,
  type inferReactQueryProcedureOptions,
} from '@trpc/react-query'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export type ReactQueryOptions = inferReactQueryProcedureOptions<TrpcRouter>
export type RouterInputs = inferRouterInputs<TrpcRouter>
export type RouterOutputs = inferRouterOutputs<TrpcRouter>

export const trpc = createTRPCReact<TrpcRouter>()

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://a0808s8swwwkkg4s0404w044.79.174.86.132.sslip.io/trpc',
    }),
  ],
})

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  )
}
