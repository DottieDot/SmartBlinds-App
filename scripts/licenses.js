const checker = require('license-checker')
const path = require('path')
const fs = require('fs')

const getLicenseUrlFromPackage = (package) => 
  `${package.repository}/master/${package.licenseFile.substr(package.path.length + 1)}`
    .replace('github.com', 'raw.githubusercontent.com')


const appFolder = path.join(__dirname, '../app')
checker.init({
  start: appFolder,
}, (err, packages) => {
  if (err) {
    console.error(err)
    return
  }

  const result = Object.keys(packages).map(key => {
    const package = packages[key]
    const [name, version] = key.split(/(?<=.)@/, 2)
    return {
      name         : name,
      version      : version,
      licenses     : package.licenses,
      repository   : package.repository,
      license_file : package.licenseFile && package.repository && getLicenseUrlFromPackage(package),
    }
  })

  fs.writeFileSync(path.join(appFolder, '/assets/licenses.json'), JSON.stringify(result))
})
