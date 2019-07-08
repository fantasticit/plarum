import { IConfig } from './config.interface'

const config: IConfig = {
  database: {
    host: 'db',
    port: 5432,
    username: 'plarum',
    password: 'plarum',
    database: 'postgres',
    entities: ['./**/*.entity.js'],
  },
  app: {
    port: 4000,
  },
  router: {
    prefix: '/api/v1',
  },
  token: {
    secret: 'plarum',
    expires: 1000 * 60 * 60 * 24 * 7,
    unless: [
      /^\/api\/v1\/user\/login/,
      /^\/api\/v1\/user\/register/,
      /^\/api\/v1\/article/,
      /^\/api\/v1\/tag/,
    ],
  },
  defaultUser: {
    name: 'plarum',
    password: 'plarum',
    role: 'admin',
  },
}
export default config
