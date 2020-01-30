#!/usr/bin/env node

const program = require('commander')

const pkg = require('../package.json')

program
  .version(pkg.version, '-v, --version')
  .command('run', 'retrive translations')
  .alias('r')
  .parse(process.argv)
