import * as Koa from 'koa'
import * as Router from 'koa-router'
import { bootstrapUserModule } from './modules/user/user.module'
import { bootstrapTagModule } from './modules/tag/tag.module'
import { bootstrapArticleModule } from './modules/article/article.module'
import config from './config'

export function bootstrapModules(app: Koa, router: Router) {
  router.prefix(config.router.prefix)

  void [
    bootstrapUserModule,
    bootstrapTagModule,
    bootstrapArticleModule,
  ].forEach(bootstrapModule => {
    bootstrapModule(router)
  })

  app.use(router.routes())
  app.use(router.allowedMethods())
}
