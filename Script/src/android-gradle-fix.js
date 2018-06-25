#!/usr/bin/env node

const fs = require('fs')

try {
  console.log('Fix Start')
  var rootDir = process.cwd()
  // @nhancv: Preparing path
  var androidSettingGradleFile = `${rootDir}/android/settings.gradle`
  var androidSettingGradleFileData = fs.readFileSync(androidSettingGradleFile, 'utf8')
  var pathArr = []
  var keySearch = ".projectDir = new File(rootProject.projectDir, '../"
  var keyIndex = 0
  while ((keyIndex = androidSettingGradleFileData.indexOf(keySearch, keyIndex)) !== -1) {
    var nextIndex = keyIndex + keySearch.length
    var path = androidSettingGradleFileData.substring(nextIndex, androidSettingGradleFileData.indexOf("')", nextIndex))
    pathArr.push(path)
    keyIndex++
  }

  var newVersion = '11.8.0'
  var key = 'com.google.android.gms'
  // @nhancv: Update version
  for (var i = 0; i < pathArr.length; i++) {
    var file = `${rootDir}/${pathArr[i]}/build.gradle`
    var data = fs.readFileSync(file, 'utf8')
    var array = data.toString().split("\n")
    var logs = []

    for(j in array) {
      var line = array[j]
      var index = line.indexOf(key, index)
      if(index !== -1) {
        var comment = line.indexOf('//')
        if(comment === -1 || comment > index) {
          var versionIndexOf = line.indexOf(':', index + key.length + 1) + 1
          var endVersionIndexOf = line.indexOf(line[index-1], versionIndexOf + 1)
          var moduleOrigin = line.substring(index, endVersionIndexOf)
          var moduleNew = line.substring(index, versionIndexOf) + newVersion
          if (moduleOrigin !== moduleNew) {
            logs.push(`Replace: ${moduleOrigin} -> ${moduleNew}`)
            data = data.replace(moduleOrigin, moduleNew)
            fs.writeFileSync(file, data, 'utf8')
          }
        }
      }
    }
    
    if (logs.length > 0) {
      console.log(`Fix path: ${pathArr[i]}`)
      for (var j = 0; j < logs.length; j++) {
        console.log(`=> ${logs[j]}`)
      }
    }
  }
  console.log('Fix Done')
} catch (error) {
  console.error(error)
}
