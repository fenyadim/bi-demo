import { initTRPC } from '@trpc/server'

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getTest: trpc.procedure.query(() => {
    return 'Test'
  }),
})

export type TrpcRouter = typeof trpcRouter
