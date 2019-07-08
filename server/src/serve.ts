import { connectPostgreSQL } from './connectPostgreSQL'
import { bootstrapApp } from './bootstrapApp'
import config from './config'
import { log } from './log'
import { createUser } from './modules/user/user.service'

const PORT: number = config.app.port

connectPostgreSQL()
  .then(async () => {
    log.info('数据库连接成功。')

    if (config.defaultUser) {
      try {
        await createUser(config.defaultUser)
        log.info(
          `创建默认用户[name=${config.defaultUser.name}, password=${
            config.defaultUser.password
          }]成功`,
        )
      } catch (e) {
        log.warn(
          '创建默认用户失败，您可能需要自己手动创建默认用户！error: ',
          e.message || e,
        )
      }
    }

    bootstrapApp(PORT)
  })
  .catch(err => {
    log.error('Start server failed!', err)
  })
