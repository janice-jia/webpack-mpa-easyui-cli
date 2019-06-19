
# webpack-mpa-easyui-cli
easyui模块化
## 目录结构
|- src (源代码)
| |- lib (引用的第三方的库，不参与压缩等...直接复制使用)
| |- views (业务页面)
| |- styles (样式文件)
| |- scripts (公共的js)
| |- index.html (首页)
| |- index.js (首页的入口js)
| |- login.html (登录)
| |- login.js (登录的入口js)
|
|- dist (分发代码)
|– postcss.config.js (1 && 2 (recommended))
|– webpack.config.js
|
|– package.json
