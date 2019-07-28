// 连接池模块
const mysql = require('mysql')
let pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'xuezi',
  port: 3306,
  conectionLimit: 5
})
module.exports = pool
