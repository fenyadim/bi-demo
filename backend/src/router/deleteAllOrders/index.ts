import { trpc } from '../../trpc'

export const deleteAllOrdersTrpcRoute = trpc.procedure.mutation(
	async ({ ctx }) => {
		await ctx.prisma.order.deleteMany()
	}
)
