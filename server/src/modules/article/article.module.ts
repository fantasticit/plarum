import * as Router from 'koa-router'
import articleController from './article.controller'

export function bootstrapArticleModule(router: Router) {
  const prefix = '/article'

  router.get(`${prefix}/`, articleController.findArticles)
  router.get(`${prefix}/:id`, articleController.findArticleById)
  router.post(`${prefix}`, articleController.addArticle)
  router.patch(`${prefix}/:id`, articleController.updateArticleById)
  router.delete(`${prefix}/:id`, articleController.deleteArticleById)
}
