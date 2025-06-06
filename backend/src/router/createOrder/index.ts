import z from 'zod'
import { trpc } from '../../trpc'

export const createOrderTrpcRoute = trpc.procedure
	.input(
		z.object({
			status: z.enum(['long', 'short']),
			price: z.number(),
			leverage: z.number(),
			marginValue: z.number(),
			couple: z.string(),
			isOpen: z.boolean(),
		})
	)
	.mutation(async ({ input, ctx }) => {
		await ctx.prisma.order.create({
			data: input,
		})

		return input
	})
