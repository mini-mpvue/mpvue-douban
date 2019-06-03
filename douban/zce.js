const url = require('url')
const express = require('express')
const httpProxy = require('http-proxy')
const URI = require('./uri').URI

const app = express()

const proxy = httpProxy.createProxyServer({
  target: URI + '/v2/movie',
  changeOrigin: true,
  secure: false
})

proxy.on('proxyReq', (proxyReq, req, res, options) => {
  // append apikey
  const { query, pathname } = url.parse(proxyReq.path, true, true)
  query.apikey = query.apikey || process.env.API_KEY
  proxyReq.path = url.format({ query, pathname })

  // change referer
  proxyReq.setHeader('referer', 'https://developers.douban.com')
})

// proxy.on('proxyRes', (proxyRes, req, res) => {
//   proxyRes.set('Access-Control-Allow-Origin', '*');
//   proxyRes.set('Access-Control-Allow-Methods', 'GET');
//   proxyRes.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
// })

proxy.on('error', (err, req, res) => {
  console.error(err)

  res.writeHead(500, { 'Content-Type': 'text/plain' })

  res.end('Something went wrong. And we are reporting a custom error message.')
})

app.use((req, res) => {
  proxy.web(req, res)
})

app.listen(3003, () => {
  console.log(`Server started on 3003`)
})
