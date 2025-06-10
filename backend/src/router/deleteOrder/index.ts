import z from 'zod'
import { trpc } from '../../trpc'

export const deleteOrderTrpcRoute = trpc.procedure
	.input(z.object({ id: z.string() }))
	.mutation(async ({ ctx, input }) => {
		return await ctx.prisma.order.delete({
			where: {
				id: input.id,
			},
		})
	})
