# mpvue-douban

> 基于 mpvue 实现豆瓣电影微信小程序

## 演示

![mpvue-douban](mpvue-douban.gif)

## 代理

### Nginx 代理：

`src/utils/request.js`

```javascript
request.config.baseURL = 'https://movie.douban.gusaifei.com/v2/movie'
```

随着应用一起启动

### 本地代理：

`douban/app.js`

```bash
npm run server
```

`douban/proxy.js`

```bash
npm run proxy
```

需要借助 npm scripts 启动，或者进入到 `douban` 目录，运行 `node app.js` 或 `node proxy.js`

## 运行

### 基于本地代理1

```bash
npm run dev:proxy1
```

### 基于本地代理2

```bash
npm run dev:proxy2
```

### 基于nginx 代理

```bash
npm run dev:nginx
```

## 构建

``` bash
# 安装依赖
npm install

# 开发
npm run dev

# 基于本地代理1 开发
npm run dev:proxy1

# 基于本地代理2 开发
npm run dev:proxy2

# 基于nginx 代理开发
npm run dev:nginx

# 生产
npm run build

# 生产分析图表
npm run build --report

# 启动本地代理1
npm run server

# 启动本地代理2
npm run proxy
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
