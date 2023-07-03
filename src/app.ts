import fastify from 'fastify'

import { appRoutes } from './http/routes/register.routes'

const app = fastify()

app.register(appRoutes)

export { app }
