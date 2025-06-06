import { trpc } from '../../trpc'

export interface IOrder {
	/** Статус (long/short) */
	status: 'long' | 'short'
	/** Цена входа */
	price: number
	/** Плечо */
	leverage: number
	/** Маржа (USDT) */
	marginValue: number
	/** Валютная пара */
	couple: string
	/** Открытый ордер */
	isOpen: boolean
}

export const getOrdersTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
	const orders = await ctx.prisma.order.findMany()

	// const orders: IOrder[] = [
	// 	{
	// 		status: 'long',
	// 		price: 100,
	// 		leverage: 30,
	// 		marginValue: 100,
	// 		couple: 'BTCUSDT',
	// 		isOpen: true,
	// 	},
	// 	{
	// 		status: 'short',
	// 		price: 100,
	// 		leverage: 45,
	// 		marginValue: 100,
	// 		couple: 'BTCUSDT',
	// 		isOpen: true,
	// 	},
	// 	{
	// 		status: 'long',
	// 		price: 100,
	// 		leverage: 10,
	// 		marginValue: 100,
	// 		couple: 'BTCUSDT',
	// 		isOpen: false,
	// 	},
	// ]

	return orders
})
