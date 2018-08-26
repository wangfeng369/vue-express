import express from 'express'
const router = express.Router();
import Sequelize from 'sequelize'

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('1111111')
});


module.exports = router;