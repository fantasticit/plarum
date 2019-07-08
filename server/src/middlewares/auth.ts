import * as jwt from 'koa-jwt'
import config from '../config'

export function useAuth() {
  const { secret, unless } = config.token
  return jwt({ secret }).unless({ path: unless })
}
