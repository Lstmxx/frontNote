const fs = require('fs')
const path = require('path')
const basePath = path.join(__dirname, '../../')
const resolve = dir => {
  return path.join(basePath, dir)
}
const targetFilePath = [
  {
    title: '开始',
    children: ['index/']
  }
]
const filepath = fs.readdirSync(basePath)
filepath.forEach(path => {
  if (path !== '.vuepress' && path !== 'README.md' && path !== 'index') {
    const children = fs.readdirSync(resolve(path)).map(item => `${path}/${item}`)
    const target = {
      title: path,
      children
    }
    targetFilePath.push(target)
  }
})

module.exports = {
  targetFilePath
}
