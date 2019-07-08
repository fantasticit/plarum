import chalk from 'chalk'

const info = '#409EFF'
const warn = '#E6A23C'
const error = '#F56C6C'

export const log = {
  info(...args: string[]): void {
    console.log(chalk.hex(info)(args.join(' ')))
  },
  warn(...args: string[]): void {
    console.log(chalk.hex(warn)(args.join(' ')))
  },
  error(...args: string[]): void {
    console.log(chalk.hex(error)(args.join(' ')))
  },
}
