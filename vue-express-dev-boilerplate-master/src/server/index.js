import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import cors from 'cors'
import indexRouter from './router/index'
import userRouter from './router/user'
import fileRouter from './router/file'
import apiRouter from './router/api'
import articleRouter from './router/article'
import weChat from './router/wechat'
// 引入history模块
import history from 'connect-history-api-fallback'
import fs from 'fs'
// 正式环境时，下面两个模块不需要引入
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
const jwt = require('jsonwebtoken')
const tokenCommon = require('./public/token')
import config from '../../build/webpack.dev.conf'
import socketFn from './controller/socket/socket'

const https = require('https');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let privatekey = fs.readFileSync('./src/server/config/1633057_www.wangfeng.kim.key', 'utf8');
let certificate = fs.readFileSync('./src/server/config/1633057_www.wangfeng.kim.pem', 'utf8');
let options={key:privatekey, cert:certificate};
let httpsServer = https.createServer(options, app);
// 引入history模式让浏览器进行前端路由页面跳转
// app.use(history())

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(path.join(__dirname, 'public')))

// app.use(express.static(path.resolve(__dirname, '../../dist')));
// 访问单页
// app.get('*', function (req, res) {
//     var html = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html'), 'utf-8');
//     res.send(html);
// });
app.use(cors());
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(function (req, res, next) {
  let url = req.url
  let urlA = url.split('.')
  let urlB = ''
  if(urlA[0] != undefined){
    urlB = urlA[0].split('/')
  }
  if (urlB[0] !=''&&urlA[1] !='html'&&urlB[1] != 'user' && req.url != '/user/register' && urlA[1] != 'html'&&urlA[1] !='js' && req.url != '/__webpack_hmr'&&urlA[0] != '/socket'&&urlB[1] !='api') {
    let token = req.headers.token;
    jwt.verify(token, tokenCommon.secret, function (err, decoded) {
      if (err) {
       
        res.send({
          success: false,
          message: 'token过期',
          code: 1001,
          err:err
        });
      } else {
        
        next();
      }
    })
  } else {
    next();
  }
});
app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/article',articleRouter)
app.use('/file', fileRouter)
app.use('/api',apiRouter)
app.use('/wechat',weChat)
const compiler = webpack(config)
//webpack 中间件
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, 'view')))
app.get('/', function (req, res) {
 
    // res.sendFile('../views/index.html')
})

//socket部分
io.on('connection', function(socket) {
  socketFn.socketInit(socket)
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  console.log(err)
  res.send(err.message)
})

// 设置监听端口
const SERVER_PORT = 8888
server.listen(SERVER_PORT, () => {
  console.info(`服务已经启动，监听端口${SERVER_PORT}`)
})
// const httpsPort = 1111
// httpsServer.listen(httpsPort,function () { console.log('Https server listening on port ' + httpsPort); });
export default app