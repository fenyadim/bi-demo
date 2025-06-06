import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import express from 'express'
import { AppContext, createAppContext } from './lib/ctx'
import { trpcRouter } from './router'

let ctx: AppContext | null = null

try {
	ctx = createAppContext()
	const expressApp = express()
	expressApp.use(cors())

	expressApp.get('/ping', (req, res) => {
		res.send('pong')
	})

	expressApp.use(
		'/trpc',
		trpcExpress.createExpressMiddleware({
			router: trpcRouter,
			createContext: () => ctx!,
		})
	)

	expressApp.listen(3000, () => {
		console.info('Listening at port 3000')
	})
} catch (e) {
	console.error(e)
	void ctx?.stop()
}
