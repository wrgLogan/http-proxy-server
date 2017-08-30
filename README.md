# express + http-proxy 代理服务器
- 接口代理
- 解决跨域
- 实现开发环境完全的前后端分离

```javascript
npm install 
npm run dev  // 运行代理服务器 在3000端口
```
静态前端文件放在./app文件夹下
在proxy.config.js中配置代理
```javascript
var proxy = [
    {
        url: '/rest/v0/*',
        target: 'http://127.0.0.1:8080'
    }
]

module.exports = proxy;
```