const program = require('commander')
const https = require('https')
const fs = require('fs')
const unzipper = require('unzipper')

const { logError, logInfo, logSuccess, logBanner } = require('../src/logger')

const DEFAULT_OUTPUT_PATH = './'

program
  .option('-a, --api-key <apiKey>', 'The public/private API key of the project (mandatory).')
  .option('-o --output-path <outputPath>', 'The path where the translations are gonna be downloaded. By default is the current directory (optional)')
  .parse(process.argv)

if (!program.apiKey) {
  logError('missing required argument --api-key')
}

if (!program.apiKey) {
  process.exit(1)
}

(() => {
  const outputPath = program.outputPath ? program.outputPath.charAt(program.outputPath.length - 1) === '/' ? program.outputPath : `${program.outputPath}/` : DEFAULT_OUTPUT_PATH
  fs.stat(outputPath, (err, stats) => {
    if (stats && stats.isDirectory()) {
      logInfo(`Your translation files are gonna be downloaded in: ${outputPath}`)
      logInfo('Retrieving translations...')
      https.get(`https://webtranslateit.com/api/projects/${program.apiKey}/zip_file`, res => {
        const fileName = `temp_translations_${Date.now()}.zip`
        logSuccess('Downloaded!', `Translations retrieved successfully!: ${fileName}`)
        const file = fs.createWriteStream(fileName)
        res.pipe(file) // create zip file
          .on('close', () => {
            fs.createReadStream(file.path)
              .pipe(unzipper.Parse())
              .on('entry', entry => {
                entry.pipe(fs.createWriteStream(`${outputPath}${entry.path}`))
                logInfo(`File generated: ${entry.path}`)
              })
              .promise()
              .then(() => {
                logSuccess('Unzipped!', 'Zip decompressed successfully!')
                fs.unlinkSync(file.path) // delete zip file
                logInfo(`${file.path} deleted!`)
                logBanner(`
                              _     _                       _       _       _ _             _ _ 
                __      _____| |__ | |_ _ __ __ _ _ __  ___| | __ _| |_ ___(_) |_       ___| (_)
                \\ \\ /\\ / / _ \\ '_ \\| __| '__/ _\` | '_ \\/ __| |/ _\` | __/ _ \\ | __|____ / __| | |
                 \\ V  V /  __/ |_) | |_| | | (_| | | | \\__ \\ | (_| | ||  __/ | ||_____| (__| | |
                  \\_/\\_/ \\___|_.__/ \\__|_|  \\__,_|_| |_|___/_|\\__,_|\\__\\___|_|\\__|     \\___|_|_|
                `)
                process.exit()
              }, e => console.log('error: ', e))
          })
      }).on('error', e => {
        console.log(e)
        process.exit(1)
      })
    } else {
      logError(`The directory given does not exist: ${err.message}`)
      process.exit(1)
    }
  })
})()
