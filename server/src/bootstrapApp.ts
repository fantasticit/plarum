import * as Koa from 'koa'
import * as Router from 'koa-router'
import { bootstrapModules } from './bootstrapModules'
import { useMiddlewares } from './useMiddlewares'
import { log } from './log'

export function bootstrapApp(port: number) {
  const app: Koa = new Koa()

  const router: Router = new Router()

  useMiddlewares(app)
  bootstrapModules(app, router)

  app.listen(port, () => {
    log.info(`服务运行在 http://localhost:${port}`)
  })
}
