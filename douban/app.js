const Koa = require('koa')
const router = require('koa-router')()
const request = require('co-request')

const URI = 'https://api.douban.com/v2/movie'
router.prefix('/douban')
router.get(['/:type', '/:type/:id'], async ctx => {
  let result
  try {
    let url = ctx.url.replace(/\/douban(\w*)/, URI + '$1')
    console.log(':::', url, ':::')
    result = await request({uri: url, method: ctx.method}) // 返回的是字符串
  } catch (error) {
    throw new Error(error)
  } finally {
    ctx.body = JSON.parse(result.body)
  }
})

const app = new Koa()
app.use(router.routes())

app.listen(3001, () => {
  console.log(`Server started on 3001`)
})
