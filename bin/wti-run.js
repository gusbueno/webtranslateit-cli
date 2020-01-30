const program = require('commander')
const https = require('https')
const fs = require('fs')
const unzipper = require('unzipper')

const { logError } = require('../src/logger')

const FAKE_PATH = './translations/'

program
  .option('-a, --api-key <apiKey>', 'The public/private API key of the project (mandatory).')
  .parse(process.argv)

if (!program.apiKey) {
  logError('missing required argument --api-key')
}

if (!program.apiKey) {
  process.exit()
}

(() => {
  https.get(`https://webtranslateit.com/api/projects/${program.apiKey}/zip_file`, res => {
    fs.stat(FAKE_PATH, (err, stats) => {
      if (stats && stats.isDirectory()) {
        const fileName = `temp_translations_${Date.now()}.zip`
        const file = fs.createWriteStream(fileName)
        res.pipe(file) // create zip file
          .on('close', () => {
            fs.createReadStream(file.path)
              .pipe(unzipper.Parse())
              .on('entry', entry => {
                entry.pipe(fs.createWriteStream(`${FAKE_PATH}${entry.path}`))
              })
              .promise()
              .then(() => {
                fs.unlinkSync(file.path) // delete zip file
                console.log('DONE')
              }, e => console.log('error: ', e))
          })
      } else {
        console.log('no existe pavo: ', err.message)
      }
    })
  }).on('error', e => {
    console.log(e)
  })
})()
