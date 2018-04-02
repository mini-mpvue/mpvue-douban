const Koa = require('koa')
const Router = require('koa-router')
const c2k = require('koa2-connect')
const proxy = require('http-proxy-middleware')

const router = new Router()
router.get('*',
  c2k(
    proxy({
      target: 'https://api.douban.com/v2/movie',
      changeOrigin: true,
      headers: {
        referer: 'https://www.douban.com',
        'Content-Type': ''
      }
    })
  )
)

const app = new Koa()
app.use(router.routes())

app.listen(3002, () => {
  console.log(`Server started on 3002`)
})
