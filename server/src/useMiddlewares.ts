import * as Koa from 'koa'
import * as cors from 'koa2-cors'
import * as bodyparser from 'koa-bodyparser'
import { useAuth } from './middlewares/auth'
import { useErrorHandler } from './middlewares/error'
import { useTokenParser } from './middlewares/tokenParser'

export function useMiddlewares(app: Koa) {
  void [useErrorHandler, cors, useAuth, bodyparser, useTokenParser].forEach(
    bootstrapMiddleware => {
      app.use(bootstrapMiddleware())
    },
  )
}
