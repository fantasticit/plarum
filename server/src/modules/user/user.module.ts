import * as Koa from 'koa'
import * as Router from 'koa-router'
import userController from './user.controller'

export function bootstrapUserModule(router: Router) {
  const prefix = '/user'

  // 获取所有用户
  router.get(`${prefix}`, userController.findUsers)
  // 获取指定用户信息
  router.get(`${prefix}/:id`, userController.findUserById)
  // 登录
  router.post(`${prefix}/login`, userController.login)
  // 注册
  router.post(`${prefix}/register`, userController.register)
  // 修改用户信息
  router.patch(`${prefix}/:id`, userController.updateUserById)
  // 删除用户
  router.delete(`${prefix}/:id`, userController.deleteUserById)
}
