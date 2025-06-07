import cors from 'cors'
import express from 'express'
import { AppContext, createAppContext } from './lib/ctx'
import { applyServeWebApp } from './lib/serveFrontend'
import { trpcRouter } from './router'
import { applyTrpcToExpressApp } from './trpc'

void (async () => {
	let ctx: AppContext | null = null

	try {
		ctx = createAppContext()
		const expressApp = express()
		expressApp.use(cors())

		expressApp.get('/ping', (req, res) => {
			res.send('pong')
		})

		await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)

		await applyServeWebApp(expressApp)

		expressApp.listen(3000, () => {
			console.info('Listening at port 3000')
		})
	} catch (e) {
		console.error(e)
		void ctx?.stop()
	}
})()
