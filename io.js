const path = require('path')
const fs = require('fs').promises

const rootDir = process.cwd()

const pathExists = async (path) => {
  try {
    await fs.access(path, fs.F_OK)
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

  for (let i = 0; i < result.length; i++) {
    const currentPath = path.join(onDirectory, result[i])
    const stat = await fs.lstat(currentPath)

    if (stat.isDirectory()) {
      searchFile(currentPath, toFind, matches)
    }

    if (result[i].toLowerCase() === toFind.toLowerCase()) {
      matches.push(currentPath)
    }
  }

  return matches[0]
}

const readFile = async (path) => {
  const contents = await fs.readFile(path)
  return contents.toString() || ''
}

module.exports = { rootDir, pathExists, searchFile, readFile }
