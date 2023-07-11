import fastify from 'fastify'

import { appRoutes } from './http/routes/register.routes'
import { ZodError } from 'zod'
import { env } from './env'

const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO: fix me
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})

export { app }
