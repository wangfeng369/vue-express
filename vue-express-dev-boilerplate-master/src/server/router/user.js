import express from 'express'
import sequelize from '../config/db'
const router = express.Router()
const Student = require('../model/').student
const Class = require('../model/').class
const User = require('../model/').user
const tokenScrete = require('../public/token')
const multiparty = require('multiparty');
const util = require('util');
const fs = require('fs');
const jwt = require('jsonwebtoken')
const secret = tokenScrete.secret
/* GET home page. */

router.get('/', function (req, res, next) {
    //   res.render('index', { title: 'Express' });
    res.send('11111');

    // res.sendfile("./views/index.html");
});
router.post('/userInfo', function (req, res, next) {
    let include = [{
        association: Student.belongsTo(Class, {
            foreignKey: 'classId'
        }),

    }];
    let currentPage = req.body.currentPage
    let pageSize = req.body.pageSize
    let totalCount = 0
    let offset = (currentPage - 1) * pageSize
    let _token = req.headers.token
    sequelize.transaction(t => {
        return Student.findAndCountAll({
                include: include,
                offset: offset,
                limit: pageSize
            })
            .then((result) => {
                totalCount = result.count
                res.send({
                    'data': result.rows,
                    'totalCount': totalCount
                })
            }).catch((err) => {
                console.error(err);
            });
    })
})
router.post('/login', function (req, res, next) {
    console.log(req.body)
    let username = req.body.userName
    let pwd = req.body.password
    User.findOne({
        where: {
            userName: username
        }
    }).then(data => {
        let token = jwt.sign(
            data.toJSON(),
            secret, {
                'expiresIn': tokenScrete.tokenExp
            }
        );
        if (data.userName == username && data.password == pwd) {
            res.send({
                sucess: '0',
                token: token
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
        if (data.userName == username) {
            res.send({
                'info': '用户名已注册'
            })
        }
    }).catch(error => {
        User.create({
            userName: username,
            password: pwd,
            name: name
        }).then(data => {
            res.send({
                sucess: '0'
            })
        })
        console.log(error)
    })
})

module.exports = router;