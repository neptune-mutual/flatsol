#!/usr/bin / env node
'use strict'

const { readFile } = require('./io')
const { flatten } = require('./flat')
const { patterns } = require('./expressions')

const run = async () => {
  const sourceFile = process.argv[2]
  let contents = await readFile(sourceFile)
  contents = await flatten(contents)

  contents = patterns.removeAllButLast(patterns.spdxLicense, contents)
  contents = patterns.removeAllButLast(patterns.pragma, contents)

  console.log(contents)
}

run()
