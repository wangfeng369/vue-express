import User from '../model/user'
import express from 'express'

const router = express.Router()


/* GET home page. */
router.get('/', function (req, res, next) {
    //   res.render('index', { title: 'Express' });
    res.send('11111');
  
    // res.sendfile("./views/index.html");
});
router.get('/userInfo', function (req, res, next) {
    User.findOne({
            where: {
                id: 1
            }
        })
        .then(data => {
            req.data = data;
            return User.findAll()
        })
        .then(data=>{
            res.send({demo:data,test:req.data});
        })
        .catch(err => {
            console.log(err)
        })
        console.log('3333')
})

module.exports = router;