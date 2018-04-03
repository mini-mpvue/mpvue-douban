# mpvue-douban

> 基于 mpvue 实现豆瓣电影微信小程序

## 演示

![mpvue-douban](mpvue-douban.gif)

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

## 目录结构

```bash
|__ douban                                    # 本地代理
    |__ app.js                                  # 方式 1
    |__ proxy.js                                # 方式 2
|__ src
    |__ App.vue
    |__ components                            # 组件
      |__ movie-item.vue                        # 电影列表项
      |__ movie-list.vue                        # 电影列表
    |__ main.js
    |__ pages
      |__ board                               # 榜单
        |__ index.vue
        |__ main.js
      |__ item                                # 电影详情
        |__ index.vue
        |__ main.js
      |__ list                                # 电影列表
        |__ index.vue
        |__ main.js
      |__ profile                             # 关于我
        |__ index.vue
        |__ main.js
      |__ search                              # 电影搜索
        |__ index.vue
        |__ main.js
      |__ splash                              # 启动页面
        |__ index.vue
        |__ main.js
    |__ store                                 # vuex
      |__ index.js                              # 全局
      |__ modules                               # 模块
        |__ item.js                               # 电影详情->对应 pages/item
      |__ mutations-type.js                     # mutations 常量
    |__ utils                                 # 工具
      |__ api.js                                # 豆瓣 api
      |__ index.js                              # 工具方法
      |__ request.js                            # flyio 配置
      |__ wechat.js                             # 微信小程序 api
      |__ wx.js                                 # wx
|__ static                                    # 静态资源
    |__ .gitkeep
    |__ images                                  # 图片
      |__ *.{png,jpg,gif,jpeg}
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
