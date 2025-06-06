import z from 'zod'
import { trpc } from '../../trpc'

export const closeOrderTrpcRoute = trpc.procedure
	.input(
		z.object({
			id: z.string(),
			priceClose: z.number(),
			pnlClose: z.number(),
		})
	)
	.mutation(async ({ input, ctx }) => {
		await ctx.prisma.order.update({
			where: {
				id: input.id,
			},
			data: {
				pnlClose: input.pnlClose,
				priceClose: input.priceClose,
				isOpen: false,
			},
		})

		return input
	})
