import * as Koa from 'koa'
import { ErrorStatusCodes } from '../../ErrorStatusCodes'
import {
  isAdmin,
  createUser,
  createToken,
  findUsers,
  findUserByNameAndPassword,
  findUserById,
  updateUserById,
  deleteUserById,
} from './user.service'
import { Roles } from './user.interface'

class UserController {
  async login(ctx: Koa.Context) {
    let { name, password } = ctx.request.body

    if (!name || !password) {
      ctx.throw(400, ErrorStatusCodes.MISSING_PARAMETERS)
    }

    const user = await findUserByNameAndPassword({
      name,
      password,
    })

    if (!user) {
      ctx.throw(400, ErrorStatusCodes.NAME_OR_PASSWORD_ERROR)
    }

    const token = await createToken(user)
    delete user.password
    ctx.body = { status: 'ok', data: user, token }
  }

  async register(ctx: Koa.Context) {
    let { name, password, role, currentUser } = ctx.request.body
    if (!name || !password) {
      ctx.throw(400, ErrorStatusCodes.MISSING_PARAMETERS)
    }

    if (role) {
      // 只有管理员可以注册指定角色的用户
      if (!currentUser || !(await isAdmin(currentUser))) {
        ctx.throw(403)
      }
    }

    try {
      const user = await createUser({
        name,
        password,
        role: role || Roles.normal,
      })
      delete user.password
      ctx.body = { status: 'ok', data: user }
    } catch (e) {
      if (e.code == '23505') {
        ctx.throw(400, ErrorStatusCodes.NAME_ALREADY_EXSIT)
      }
    }
  }

  async findUsers(ctx: Koa.Context) {
    const currentUser = ctx.request.body.currentUser

    if (!(await isAdmin(currentUser))) {
      ctx.throw(403)
    } else {
      const users = await findUsers()
      ctx.body = { status: 'ok', data: users }
    }
  }

  async findUserById(ctx: Koa.Context) {
    const { id } = ctx.params
    const currentUser = ctx.request.body.currentUser

    if (id !== currentUser.id || !(await isAdmin(currentUser))) {
      ctx.throw(403)
    }

    const user = await findUserById(id)
    if (!user) {
      ctx.throw(404)
    }
    ctx.body = { status: 'ok', data: user }
  }

  async updateUserById(ctx: Koa.Context) {
    const id = ctx.params.id
    const newInfo = ctx.request.body
    const currentUser = ctx.request.body.currentUser

    if (id !== currentUser.id && !(await isAdmin(currentUser))) {
      ctx.throw(403)
    }

    const user = await updateUserById(id, newInfo)
    ctx.body = { status: 'ok', data: user }
  }

  async deleteUserById(ctx: Koa.Context) {
    const id = ctx.params.id
    const currentUser = ctx.request.body.currentUser

    if (!(await isAdmin(currentUser))) {
      ctx.throw(403)
    } else {
      await deleteUserById(id)
      ctx.status = 204
      ctx.body = { status: 'ok' }
    }
  }
}

export default new UserController()
