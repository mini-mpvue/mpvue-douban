const Koa = require('koa')
const mount = require('koa-mount')

const router = require('./router')

const app = new Koa()

app.use(mount('/', router))

app.listen(3001, () => {
  console.log(`Server started on 3000`)
})
