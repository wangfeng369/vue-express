let express = require('express');
let router = express.Router();
let wechat = require('wechat');
const utils = require('../common/utils');
let config = require('../config.json') 
import wechatApi from '../common/wechatapi'
let List = wechat.List
List.add('view',[
    ['回复1查看靓照',function(info,req,res){
        res.reply({
            title: '你来我家接我吧',
            description: '这是女神与高富帅之间的对话',
            picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
            url: 'http://nodeapi.cloudfoundry.com/'
        })
    }],
    ['回复2听音乐',function(info,req,res){
        res.reply({
            title: "来段音乐吧",
            description: "一无所有",
            musicUrl: "http://mp3.com/xx.mp3",
            hqMusicUrl: "http://mp3.com/xx.mp3",
            thumbMediaId: "thisThumbMediaId"
        })
    }],
])
// router.get('/',utils.sign(config))
router.use(express.query());
router.get('/',wechatApi.wxLogin)
router.get('/getWxAuthAcessToken',wechatApi.getWxAuthAcessToken)
router.post('/getSign',wechatApi.getSign)
router.use('/', wechat('wechat', function(req, res, next) {
	console.log(req.weixin);
    var message = req.weixin;
    //文本
	if (message.Content === '谁是大帅哥') {
		res.reply('当然是王沣');
	}else if(message.MsgType == 'event'&& message.Event == 'subscribe'){
        console.log('@!!!!!!!!!')
        let openId = req.weixin.FromUserName
        wechatApi.saveOpenId(openId)
        res.reply([{
            title:'金刚.骷髅岛',
            description:'南太平洋上的神秘岛屿——骷髅岛。史上最大金刚与邪恶骷髅蜥蜴的较量。',
            picUrl:'http://tu.23juqing.com/d/file/html/gndy/dyzz/2017-04-09/da9c7a64ab7df196d08b4b327ef248f2.jpg',
            url:'http://www.piaohua.com/html/dongzuo/2017/0409/31921.html' //可下载观看喔
          }]
    );
    }else if(message.Content == '图文'){
        res.reply([{
            title:'金刚.骷髅岛',
            description:'南太平洋上的神秘岛屿——骷髅岛。史上最大金刚与邪恶骷髅蜥蜴的较量。',
            picUrl:'http://tu.23juqing.com/d/file/html/gndy/dyzz/2017-04-09/da9c7a64ab7df196d08b4b327ef248f2.jpg',
            url:'http://www.piaohua.com/html/dongzuo/2017/0409/31921.html' //可下载观看喔
          }]
        );
    }else if(message.EventKey == 'music'){
        res.reply(
            {
                type: "video",
                content: {
                  title: '来段视频吧',
                  description: '女神与高富帅',
                  mediaId: 'mediaId'
                }
              }
        );
    }
 
}));
module.exports = router;