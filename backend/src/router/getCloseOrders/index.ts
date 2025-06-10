import { trpc } from '../../trpc'

export const getCloseOrdersTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
	return await ctx.prisma.order.findMany({
		where: {
			isOpen: false,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})
})
