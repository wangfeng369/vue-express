import express from 'express'
import sequelize from '../config/db'
const router = express.Router()
let Student = require('../model/').student
let Class = require('../model/').class
let User = require('../model/').user
/* GET home page. */

router.get('/', function (req, res, next) {
    //   res.render('index', { title: 'Express' });
    res.send('11111');
  
    // res.sendfile("./views/index.html");
});
router.post('/userInfo', function (req, res, next) {
    let include = [{
        association: Student.belongsTo(Class, {foreignKey:'classId'}),
        
       }];
       Student.findAll({include:include}).then((result) => {
            res.send(result)
       }).catch((err) => {
        console.error(err);
       });
    // let search = 'SELECT `student`.`id`, `student`.`name`, `student`.`sex`, `student`.`classId`, `student`.`isDel`, `student`.`ClassId`, `class`.`id` AS `class.id`, `class`.`name` AS `class.name` FROM  `student` AS `student` LEFT OUTER JOIN `class` AS `class` ON `student`.`ClassId` = `class`.`id`;'
    // sequelize.query(search,{type:sequelize.QueryTypes.SELECT}).then(data=>{
    //     console.log(data)
    //     res.send(data)
    // })

})

router.post('/login', function (req, res, next) {
    console.log(req.body)
    let username = req.body.userName
    let pwd = req.body.password
    User.findOne({
        where:{
            userName:username
        }
    }).then(data=>{
        if(data.userName==username&&data.password==pwd){
            res.send({code:'0'})
        }else{
            res.send('用户名或密码错误')
        }
    }).catch(error=>{
        res.send('用户名或密码错误')
        console.log(error)
    })
})

module.exports = router;