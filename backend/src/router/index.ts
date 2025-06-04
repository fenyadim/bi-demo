import { trpc } from '../trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getOrdersTrpcRoute } from './getOrders'
// @endindex

export const trpcRouter = trpc.router({
	// @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
	getOrders: getOrdersTrpcRoute,
	// @endindex
})

export type TrpcRouter = typeof trpcRouter
