const URIS = [
  'https://douban.uieee.com',
  'https://douban-api.uieee.com',
  'https://douban-api.now.sh',
  'https://douban-api.zce.now.sh',
  'https://douban-api-git-master.zce.now.sh',
  'https://api.douban.com/v2/movie'
]

module.exports.URI = URIS[Math.floor(Math.random() * URIS.length)]
