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

const checkDir = function (src, dest, callback) {
  dest = dest.replace(process.cwd(), '').replace('/', '\\').slice(1)
  let fromi = 0,
      i = 0,
      _dest = ""
  do {
    i = dest.indexOf('\\', fromi)
    if (i === -1) {
      _dest = dest.slice(0)
    } else {
      _dest = dest.slice(0, i)
    }
    _dest = path.join(process.cwd(), _dest)
    if (!fs.existsSync(_dest)) {
      fs.mkdirSync(_dest)
    }
    fromi = i + 1
  } while (i !== -1)

  if (i === -1) {
    callback(src, _dest)
  }
}

module.exports = {
  copyDir,
  copyFile,
  checkDest,
  checkDir
}
