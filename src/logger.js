const chalk = require('chalk')

const logError = errorMessage =>
  console.error(`${chalk.bgRed(chalk.black(' Error '))} ${errorMessage}`)

const logSuccess = (label, message) =>
  console.log(`${chalk.bgGreen(chalk.black(` ${label} `))} ${chalk.green(message)}`)

const logInfo = message => console.info(`${chalk.bgBlue(chalk.black(' Info '))} ${message}`)

const logBanner = message => console.log(chalk.green(message))

module.exports = {
  logError,
  logSuccess,
  logInfo,
  logBanner
}
