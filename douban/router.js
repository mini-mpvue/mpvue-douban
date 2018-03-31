const router = require('koa-router')()
const request = require('co-request')
// const qs = require('querystring')

const URI = 'https://api.douban.com/v2/movie'

router.prefix('/douban')

router.get('/:type', async ctx => {
  let url = ctx.url.replace(/\/douban(\w*)/, URI + '$1')
  console.log(':::', url, ':::')
  let result = await request({uri: url, method: ctx.method})
  ctx.body = result.body
})

router.get('/:type/:id', async ctx => {
  let url = ctx.url.replace(/\/douban(\w*)/, URI + '$1')
  console.log(':::', url, ':::')
  let result = await request({uri: url, method: this.method})
  ctx.body = result.body
})

module.exports = router.routes()
