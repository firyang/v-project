const fs = require('fs')

const copyDir = function (src, dest) {
  fs.readdir(src, (err, paths) => {
    if (err) throw err

    paths.forEach(path => {
      let _src = src + '/' + path
      let _dest = dest + '/' + path
      fs.stat(_src, (_err, st) => {
        if (_err) throw _err
        if (st.isFile()) {
          fs.createReadStream(_src).pipe(fs.createWriteStream(_dest))
        } else if (st.isDirectory()) {
          checkDest(_src, _dest, copyDir)
        }
      })
    })
  })
}
const copyFile = function (src, dest) {
  fs.stat(src, (err, st) => {
    if (err) throw err
    if (st.isFile()) {
      fs.createReadStream(src).pipe(fs.createWriteStream(dest + '/' + src.split('\\').pop()))
    } else {
      throw new Error('expected a file')
    }
  })
}

const checkDest = function (src, dest, callback) {
  if (!fs.existsSync(dest)) {
    fs.mkdir(dest, () => {
      callback(src, dest)
    })
  } else {
    callback(src, dest)
  }
}

module.exports = {
  copyDir,
  copyFile,
  checkDest
}
