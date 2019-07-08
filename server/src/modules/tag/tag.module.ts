import * as Router from 'koa-router'
import tagController from './tag.controller'

export function bootstrapTagModule(router: Router) {
  const prefix = '/tag'

  router.get(`${prefix}/`, tagController.findTags)
  router.get(`${prefix}/:id`, tagController.findTagById)
  router.post(`${prefix}`, tagController.addTag)
  router.patch(`${prefix}/:id`, tagController.updateTagById)
  router.delete(`${prefix}/:id`, tagController.deleteTagById)
}
