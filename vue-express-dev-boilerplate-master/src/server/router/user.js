// import User from '../model/user'
import express from 'express'

const router = express.Router()
let User = require('../model/').userinfo
let good = require('../model/').goods
let article = require('../model').article
/* GET home page. */





router.get('/', function (req, res, next) {
    //   res.render('index', { title: 'Express' });
    res.send('11111');
  
    // res.sendfile("./views/index.html");
});
router.post('/userInfo', function (req, res, next) {
    var id = req.body.id
    var include = [{
        association: User.hasOne(good, {foreignKey:'userInfoId'}),
        where:{
            userInfoId:2
        }
       }];
       User.findAll({include:include}).then((result) => {
            res.send(result)
       }).catch((err) => {
        console.error(err);
       });    
})

module.exports = router;