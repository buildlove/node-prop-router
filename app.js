let http = require('http');
let fs = require('fs');
let url = require('url');
const config = require('./config.js')

/**
 *  异步读取图片流
 * @param {string} path 文件路径
 * @param {function} fn 
 */
let readImg = (path, fn) => {
  fs.readFile(path, 'binary', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (typeof fn === 'function') {
        fn(data);
      }
    }
  });   //图片是转成二进制流传的
}

/**
 * 判断请求文件是否为图片
 * @param {*} filename 文件名加后缀
 */
let imgOrOther = function (filename){
  // 获取后缀名
  let index1 = filename.lastIndexOf(".");
  let type = filename.substr(index1 + 1).toLowerCase();

  // 匹配以下格式 能匹配上则为图片
  let imgFormat = config.imageFormat;
  let isImage = false
  for(let i=0;i<imgFormat.length;i++){
    let format = imgFormat[i];
    if (type === format){
      isImage = true;
      break;
    }
  }

  return isImage
}

/**
 * 创建服务
 */
http.createServer(function (request, response) {

  var pathname = url.parse(request.url).pathname;

  console.log("request path: ", pathname);

  if (pathname === '/'){
    pathname = '/index.html'
  }

  // 如果是图片格式 返回浏览器可见图片给浏览器;
  let isImage = imgOrOther(pathname.substr(1), response);
  
  if (isImage) {
    let localPath = __dirname + pathname;

    fs.exists(localPath, function (exists) {
      if (!exists) {
        response.write("200");
        response.end();
      }else{
        // 读取文件返回给前端
        readImg(pathname.substr(1), (data) => {
          response.write(data, 'binary');
          response.end();
        });
      }
    });
  } else {
    fs.readFile(pathname.substr(1), function (err, data) {

      if (err && pathname !== '/') {
        response.writeHead(404, { 'Content-Type': 'text/html' });
      } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data.toString());
      }
      response.end();

    });

  }
}).listen(3000);