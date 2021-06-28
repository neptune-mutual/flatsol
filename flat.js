const { readFile } = require('./io')
const { patterns } = require('./expressions')
const { guessPath } = require('./imports')

const imported = []

const flatten = async (contents, instruction) => {
  if (instruction && instruction.match && instruction.toImport) {
    if (imported.indexOf(instruction.toImport) === -1) {
      contents = contents.replace(instruction.match, await readFile(instruction.toImport))
      imported.push(instruction.toImport)
    }

    contents = contents.replace(instruction.match, '')
  }

  const matches = contents.match(patterns.import)

  if (matches && matches.length) {
    const matched = contents.match(patterns.import)[0]
    const path = matched.replace('import', '').replace(';', '').replace(/"/g, '').trim()
    const toImport = await guessPath(path)

    if (!toImport) {
      Promise.reject(new Error(`Invalid path: ${path}`))
      return null
    }

    return await flatten(contents, { match: matched, toImport })
  }

  return contents
}

module.exports = { flatten }
