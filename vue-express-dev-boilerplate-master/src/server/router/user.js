import express from 'express'
const router = express.Router()
const User = require('../model/').user
const tokenScrete = require('../public/token')
const jwt = require('jsonwebtoken')
const secret = tokenScrete.secret
import UserControl from '../controller/index/user'
/* GET home page. */
router.get('/', function (req, res, next) {
    //   res.render('index', { title: 'Express' });
    res.send('11111');

    // res.sendfile("./views/index.html");
});
router.post('/code',UserControl.sendEmail)
router.post('/registerAdmin',UserControl.registerAccount)
router.post('/login', function (req, res, next) {
    let userName = req.body.userName
    let pwd = req.body.password
    console.log(req.body)
    User.findOne({
        where: {
            userName: userName
        }
    }).then(data => {
        console.log('1111'+data)
        let token = jwt.sign(
            data.toJSON(),
            secret, {
                'expiresIn': tokenScrete.tokenExp
            }
        );
       
        if (data.userName == userName && data.password == pwd) {
            res.send({
                sucess: '0',
                token: token,
                name: data.userName
            })
        } else {
            res.send({
                'info': '用户名或密码错误'
            })
        }
    }).catch(error => {
        res.send('用户名或密码错误')
        console.log(error)
    })
})
router.post('/register', function (req, res, next) {
    console.log(req.body)
    let username = req.body.userName
    let pwd = req.body.password
    let name = req.body.name
    User.findOne({
        where: {
            userName: username
        }
    }).then(data => {
        if (data &&data.userName == username) {
            res.send({
                'info': '用户名已注册'
            })
        }else{
            User.create({
                userName: username,
                password: pwd,
                name: name
            }).then(data => {
                res.send({
                    sucess: '0'
                })
            })
        }
    }).catch(error => {
        res.send({
            sucess: '-1',
            info:'发生未知错误'
        })
        console.log(error)
    })
})

module.exports = router;