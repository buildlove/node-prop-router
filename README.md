快速开始
-------------

```
  node app.js
```

访问 html
------------

* 使用 localhost:3000/index.html 访问 index.html。
* 使用 localhost:3000/routes/Route.html 访问 Route.html。
* 使用 localhost:3000/routes/Route1.html 访问 Route1.html。

访问 json

> 如需使用已经编辑好的 custom.html, 在该项目下放入 custom.html 即可

* 使用 localhost:3000/mock/mock.json 访问 mock.json。
* 使用 localhost:3000/custom.html 访问 custom.html。

访问 图片

> 图片已经根据 config.js 里面的后缀格式进行判断可直接访问

* http://localhost:3000/images/0.png

路由优势
------------

使用 node 原生接口实现路由的操作。

本项目不依赖任何第三方插件(只需使用 node app.js 即可运行)。

使用场景
---------

1. 作为多页面路由。

2. 写一个例子或者在网站上找到一个 demo, 迫切的需要一个服务器来运行这个实例的时候。

3. 制作假数据：直接在目录下放上 /mock/mock.json 然后访问 localhost:3000/mock/mock.json。

路由实现原理
-------

根据浏览器或者请求的链接地址使用 fs 接口直接读取本地 html 文件进行返回
