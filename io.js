const path = require('path')
const fs = require('fs').promises

const rootDir = process.cwd()

const pathExists = async (p) => {
  try {
    await fs.access(p, fs.F_OK)
    return true
  } catch { }

  return false
}

const searchFile = async (onDirectory, toFind, matches = []) => {
  const validDirectory = await pathExists(onDirectory)

  if (!validDirectory) {
    return null
  }

  const result = await fs.readdir(onDirectory)

  for (const i in result) {
    const currentPath = path.join(onDirectory, result[i])
    const stat = await fs.lstat(currentPath)

    if (stat.isDirectory()) {
      await searchFile(currentPath, toFind, matches)
    }

    if (result[i].toLowerCase() === toFind.toLowerCase()) {
      matches.push(currentPath)
    }
  }

  return matches[0]
}

const readFile = async (file) => {
  const contents = await fs.readFile(file)
  return contents.toString() || ''
}

module.exports = { rootDir, pathExists, searchFile, readFile }
