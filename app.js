const http = require('http'),
      path = require('path')

const {fs, url, qs, pack, getBody} = require('./lib/node-server')

//连接mysql redis
// const conn = require('./services/connect_mysql');
// const client = require('./services/connect_redis');

const port = 3001

http.createServer((req, res) => {

    //挂载方法到请求和响应
    pack(req, res)

    //业务代码
    if (req.url === '/') {
        res.render('index.html')
    }

    else {
        let root = path.resolve(process.argv[2] || '.')
        // 获得URL的path，类似 '/css/bootstrap.css':
        let pathname = url.parse(req.url).pathname
        // // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
        let filepath = path.join(root, pathname)
        // // 获取文件状态:
        fs.stat(filepath, (err, stats) => {
            if (!err && stats.isFile()) {
                // 没有出错并且文件存在:
                console.log('200 ' + req.url)
                // 发送200响应:
                res.writeHead(200)
                // 将文件流导向response:
                fs.createReadStream(filepath).pipe(res)
            } else {
                // 出错了或者文件不存在:
                console.log('404 ' + req.url)
                // 发送404响应:
                res.writeHead(404)
                res.end('404 Not Found')
            }
        });
    }

}).listen(port, () => {
    console.log(`app is listening at ${port} port`)
})