import { trpc } from '../trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { closeOrderTrpcRoute } from './closeOrder'
import { createOrderTrpcRoute } from './createOrder'
import { deleteAllOrdersTrpcRoute } from './deleteAllOrders'
import { deleteOrderTrpcRoute } from './deleteOrder'
import { getCloseOrdersTrpcRoute } from './getCloseOrders'
import { getOrdersTrpcRoute } from './getOrders'
import { updateOrderTrpcRoute } from './updateOrder'
// @endindex

export const trpcRouter = trpc.router({
	// @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
	closeOrder: closeOrderTrpcRoute,
	createOrder: createOrderTrpcRoute,
	getCloseOrders: getCloseOrdersTrpcRoute,
	getOrders: getOrdersTrpcRoute,
	updateOrder: updateOrderTrpcRoute,
	deleteOrder: deleteOrderTrpcRoute,
	deleteAllOrders: deleteAllOrdersTrpcRoute,
	// @endindex
})

export type TrpcRouter = typeof trpcRouter
