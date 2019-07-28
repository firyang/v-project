// 1. 加载对应模块
// const http = require("http")
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const multiparty = require('connect-multiparty') // 文件上传
const multipartMiddleware = multiparty()
const path = require('path')
const fs = require('fs')
const cors = require('cors')
// 2. 引入连接池
const pool = require('./pool')
// 3. 创建 express 对象
const app = express()
const port = process.env.PORT || 3000
const www = process.env.WWW || './'
// old
// var server = http.createServer(app)
// server.listen(3000)

// new
app.use(express.static(www))

app.listen(port, () => console.log(`listening on http://localhost:${port}`))
// 4. 配置第三方模块
// 4.1 配置跨域
// app.use(cors({
//   origin: ['http://localhost:8080', 'http://127.0.0.1'],
//   credentials: true
// }))
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() === 'options') {
    res.send(200)
  } else {
    next()
  }
})
// 4.2 支持POST请求
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// 4.3 配置cookie 和session
app.use(cookieParser())
app.use(expressSession({
  resave: false, // 每次请求是否重新设置 session
  saveUninitialized: true, // 每次请求是否设置cookie
  secret: 'teducn' // https加密传输，密钥
}))
// 4.4 配置文件上传路径
app.use(multiparty({ uploadDir: path.resolve('./upload') }))

// 5. 指定静态资源目录 public

// 文件上传
app.post('/upload', multipartMiddleware, function (req, res) {
  console.log(req.body, req.files)
  // don't forget to delete all req.files when done
  let id = req.files.file.path.split('\\').pop().split('.')[0]
  let name = req.files.file.name
  res.json({ msg: 'ok', id, name  })
})

// 文件下载
app.get('/download', (req, res) => {
  var fileType = req.query.fileType
  var fileName = req.query.fileName

  if (fileType == 1) {
    // 直接访问文件进行下载
    res.redirect(fileName)
  } else if (fileType == 2) {
    // 以文件流的形式下载文件
    var filePath = path.join(__dirname, './data/' + fileName)
    var stats = fs.statSync(filePath)
    var isFile = stats.isFile()
    if (isFile) {
      res.set({
        'Content-Type': 'application/octet-stream', // 告诉浏览器这是一个二进制文件
        'Content-Disposition': 'attachment; filename=' + fileName, // 告诉浏览器这是一个需要下载的文件
        'Content-Length': stats.size // 文件大小
      })
      fs.createReadStream(filePath).pipe(res)
    } else {
      res.end(404)
    }
  } else if (fileType == 3) {
    // 读取文件内容后再响应给页面
    var filePath = path.join(__dirname, '../public/' + fileName)
    var stats = fs.statSync(filePath)
    var isFile = stats.isFile()
    if (isFile) {
      fs.readFile(filePath, function (isErr, data) {
        if (isErr) {
          res.end('Read file failed!')
          return
        }
        res.set({
          'Content-Type': 'application/octet-stream', // 告诉浏览器这是一个二进制文件
          'Content-Disposition': 'attachment; filename=' + fileName, // 告诉浏览器这是一个需要下载的文件
          'Content-Length': stats.size // 文件大小
        })

        res.setCharacterEncoding('UTF-8')
        res.end(data)
      })
    } else {
      res.end(404)
    }
  } else {
    res.end(404)
  }
})

// 模块一：后台管理员登录
app.get('/adminlogin', (req, res) => {
  // 获取参数
  var u = req.query.uname
  var p = req.query.upwd
  // console.log(u+":"+p)

  // 正则验证
  var reg = /^[a-z0-9]{3,12}$/i
  if (!reg.test(u)) {
    res.json({ code: -2, msg: '用户名格式不正确' })
    return
  }
  if (!reg.test(p)) {
    res.json({ code: -2, msg: '密码格式不正确' })
    return
  }

  // console.log(3)
  // 获取连接
  pool.getConnection((err, conn) => {
    if (err) throw err
    // 创建sql语句并发送sql获取返回结果
    var sql = 'SELECT uid FROM xz_user WHERE uname=? AND upwd=?'
    conn.query(sql, [u, p], (err, result) => {
      // console.log(result)
      if (err) throw err
      if (result.length > 0) {
        // 返回 json
        req.session.uid = result[0]
        res.json({ code: 1, msg: '登录成功' })
      } else {
        // 返回 json
        res.json({ code: -1, msg: '用户名或密码不正确' })
      }
      conn.release()
    })
  })
})
// 模块二：用户列表，分页
app.get('/userlist', (req, res) => {
  // 获取参数
  var pno = parseInt(req.query.pno)
  var pageSize = parseInt(req.query.pageSize)
  // 正则验证
  var reg = /^[0-9]{1,200}$/
  if (!reg.test(pno)) {
    res.json({ code: -2, msg: '参数不正确' })
    return
  }
  if (!reg.test(pageSize)) {
    res.json({ code: -2, msg: '参数不正确' })
    return
  }
  // 判断pno
  if (pno < 1) pno = 1
  if (pageSize < 1) pageSize = 8
  // 获取连接 总记录
  var total = 0
  var process = 0
  var output = { pno: pno, pageSize: pageSize }
  pool.getConnection((err, conn) => {
    if (err) throw err
    var sql = 'SELECT COUNT(uid) as c FROM xz_user'
    conn.query(sql, (err, result) => {
      if (err) throw err
      output.pageCount = Math.ceil(result[0].c / pageSize)
      process += 50
      if (process == 100) {
        res.json(output)
      }
      conn.release()
    })
  })
  // 获取连接 当前页面内容
  pool.getConnection((err, conn) => {
    if (err) throw err
    var offset = parseInt((pno - 1) * pageSize)
    var sql = 'SELECT uid,uname,upwd,avatar,user_name,email,phone,gender FROM xz_user LIMIT ?, ?'
    conn.query(sql, [offset, pageSize], (err, result) => {
      if (err) throw err
      output.data = result
      process += 50
      if (process == 100) {
        // 发送 pno/pageSize/pageCount/data
        res.json(output)
      }
      conn.release()
    })
  })
})
// 模块三：删除指定用户
app.get('/userdel', (req, res) => {
  // 获取用户编号
  var uid = parseInt(req.query.uid)
  var reg = /^[0-9]{1,}$/
  if (!reg.test(uid)) {
    res.json({ code: -3, msg: '参数不正确' })
    return
  }
  // 获取连接池中的连接
  pool.getConnection((err, conn) => {
    if (err) throw err
    // 创建sql语句
    var sql = 'DELETE FROM xz_user WHERE uid=?'
    conn.query(sql, [uid], (err, result) => {
      if (err) throw err
      // 判断结果并返回json
      if (result.affectedRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
      } else {
        res.json({ code: 1, msg: '删除失败' })
      }
      conn.release()
    })
  })
})
// 模块四：显示用户详细
app.get('/userdetail', (req, res) => {
  var uid = parseInt(req.query.uid)
  var reg = /^[0-9]{1,}$/
  if (!reg.test(uid)) {
    res.json({ code: -3, msg: '参数不正确' })
    return
  }
  pool.getConnection((err, conn) => {
    if (err) throw err
    var sql = 'SELECT uid,uname,phone,email,avatar FROM xz_user WHERE uid=?'
    conn.query(sql, [uid], (err, result) => {
      if (err) throw err
      res.json(result[0])
      conn.release()
    })
  })
})
// 模块五：搜索用户
app.get('/usersch', (req, res) => {
  // 1.获取参数，并验证
  var kw = req.query.kw
  var pno = parseInt(req.query.pno)
  var pageSize = parseInt(req.query.pageSize)
  var process = 0 // 标识两个查询的进度
  if (!pno) {
    pno = 1
  }
  if (!pageSize) {
    pageSize = 10
  }
  var output = { pno: pno, pageSize: pageSize }
  // 2. 获取连接 查询总记录数
  pool.getConnection((err, conn) => {
    if (err) throw err
    var sql = 'SELECT COUNT(uid) as c FROM xz_user WHERE uname LIKE ?'
    conn.query(sql, [`%${kw}%`], (err, result) => {
      if (err) throw err
      output.pageCount = Math.ceil(result[0].c / pageSize)
      process += 50
      if (process == 100) {
        res.json(output)
      }
      conn.release()
    })
  })
  // 3. 获取连接 查询用户信息
  pool.getConnection((err, conn) => {
    if (err) throw err
    var offset = (pno - 1) * pageSize
    var sql = 'SELECT uid,uname,user_name,email,avatar,phone,gender FROM xz_user WHERE uname LIKE ? LIMIT ?,?'
    console.log(kw)
    conn.query(sql, [`%${kw}%`, offset, pageSize], (err, result) => {
      if (err) throw err
      // 4. 返回数据
      if (result.length < 1) {
        res.json({ code: -2, msg: '没有查询到相关用户' })
      } else {
        output.data = result
        process += 50
        if (process == 100) {
          res.json(output)
        }
      }
      // 5. 归还连接
      conn.release()
    })
  })
})
