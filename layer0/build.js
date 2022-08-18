const { join } = require('path')
const { exit } = require('process')
const { nodeFileTrace } = require('@vercel/nft')
const { DeploymentBuilder } = require('@layer0/core/deploy')

const appDir = process.cwd()
const builder = new DeploymentBuilder(appDir)

module.exports = async function build(options) {
  try {
    builder.clearPreviousBuildOutput()
    let command = 'npm run build'
    await builder.exec(command)
    builder.addJSAsset(join(appDir, 'dist'))
    builder.addJSAsset(join(appDir, 'server'))
    let dictNodeModules = await getNodeModules()
    Object.keys(dictNodeModules).forEach(async (i) => {
      await builder.addJSAsset(`${appDir}/${i}`)
    })
    await builder.build()
  } catch (e) {
    console.log(e)
    exit()
  }
}

async function getNodeModules() {
  const files = ['./server/server.mjs']
  const { fileList } = await nodeFileTrace(files)
  let packages = {}
  fileList.forEach((i) => {
    if (i.includes('node_modules/')) {
      let temp = i.replace('node_modules/', '')
      temp = temp.substring(0, temp.indexOf('/'))
      packages[`node_modules/${temp}`] = true
    } else {
      packages[i] = true
    }
  })
  return Object.keys(packages)
    .sort()
    .reduce((obj, key) => {
      obj[key] = packages[key]
      return obj
    }, {})
}
