import * as Koa from 'koa'
import { ErrorStatusCodes } from '../ErrorStatusCodes'
import { log } from '../log'

export function useErrorHandler() {
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
      await next()
    } catch (err) {
      const status = +(err.statusCode || err.status || 500)
      err.status = ctx.status = status

      if (status === 401 || status === 403) {
        err = {
          message:
            status === 401
              ? ErrorStatusCodes.AUTHORIZATION_EXPIRED
              : ErrorStatusCodes.AUTHENTICATION_FAILED,
        }
      }

      ctx.body = { status: 'no', msg: err.message || err }
      log.error(
        `响应码：${status}`,
        `，请求地址：${ctx.request.url}`,
        `，错误信息：${err.message || err}`,
      )
    }
  }
}
