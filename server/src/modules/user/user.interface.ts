import { IArticle } from '../article/article.interface'

export enum Roles {
  admin = 'admin', // 管理员
  normal = 'normal', // 普通用户
}

export interface IUser {
  id?: string
  name: string
  password: string
  role?: string
  createAt?: string
  updateAt?: string
  lastLoginAt?: string
  articles?: IArticle[]
}
