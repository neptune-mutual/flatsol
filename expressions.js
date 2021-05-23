const removeAllButLast = (pattern, contents) => {
  let i = 0

  const matches = contents.match(pattern) || []

  const delegate = (match) => {
    i++
    return i === matches.length ? match : ''
  }

  return contents.replace(pattern, delegate)
}

const patterns = {
  import: /import.*?;/i,
  spdxLicense: /\/\/ SPDX(.*?)(\n|$)/g,
  pragma: /pragma solidity(.*?)(\n|$)/g,
  removeAllButLast
}

module.exports = { patterns }
