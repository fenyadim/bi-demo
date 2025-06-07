import z from 'zod'
import { trpc } from '../../trpc'

export const updateOrderTrpcRoute = trpc.procedure
	.input(
		z.object({
			status: z.enum(['long', 'short']),
			id: z.string(),
			priceClose: z.number().nullable(),
			pnlClose: z.number().nullable(),
			price: z.number(),
			leverage: z.number(),
			marginValue: z.number(),
			couple: z.string(),
			isOpen: z.boolean(),
			createdAt: z.string(),
			updatedAt: z.string(),
		})
	)
	.mutation(async ({ input, ctx }) => {
		await ctx.prisma.order.update({
			where: { id: input.id },
			data: input,
		})

		return input
	})
