import { trpc } from '../../trpc'

export const getOrdersTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
	return await ctx.prisma.order.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	})
})
