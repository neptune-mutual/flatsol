const { rootDir, pathExists, searchFile } = require('./io')
const path = require('path')

const guessPath = async pathLike => {
  let prefix = 'node_modules'

  if (pathLike.startsWith('./')) {
    prefix = 'contracts'
    pathLike = pathLike.replace('./', '')
  }

  const guessed = path.join(rootDir, prefix, pathLike)

  if (await pathExists(guessed)) {
    return guessed
  }

  const fileName = pathLike.split('/').pop()
  const fromDependencies = await searchFile(path.join(rootDir, 'node_modules'), fileName)
  const inContracts = await searchFile(path.join(rootDir, 'contracts'), fileName)

  return fromDependencies || inContracts
}

module.exports = { guessPath }
