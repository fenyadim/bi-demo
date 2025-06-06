import { initTRPC } from '@trpc/server'
import { AppContext } from './lib/ctx'

export const trpc = initTRPC.context<AppContext>().create()
