import { IConfig } from './config.interface'
import devConfig from './dev'
import prodConfig from './prod'

const isDev = process.env.NODE_ENV === 'development'
const config: IConfig = !isDev ? prodConfig : devConfig

export default config
