import { trpc } from '../../trpc'

export interface IOrder {
	/** Статус (long/short) */
	status: 'long' | 'short'
	/** Цена входа */
	price: number
	/** Плечо */
	shoulder: number
	/** Маржа (USDT) */
	marginValue: number
	/** Валютная пара */
	couple: string
	/** Цена ликвидации */
	liquidation: number
	/** Открытый ордер */
	openOrder: boolean
}

export const getOrdersTrpcRoute = trpc.procedure.query(() => {
	const orders: IOrder[] = [
		{
			status: 'long',
			price: 100,
			shoulder: 30,
			marginValue: 100,
			couple: 'BTCUSDT',
			liquidation: 100,
			openOrder: true,
		},
		{
			status: 'short',
			price: 100,
			shoulder: 45,
			marginValue: 100,
			couple: 'BTCUSDT',
			liquidation: 100,
			openOrder: true,
		},
		{
			status: 'long',
			price: 100,
			shoulder: 10,
			marginValue: 100,
			couple: 'BTCUSDT',
			liquidation: 100,
			openOrder: false,
		},
	]

	return orders
})
