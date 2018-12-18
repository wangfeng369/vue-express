import express from 'express'
import sequelize from '../config/db'
const router = express.Router()
const article = require('../model/index').article
import index from '../controller/index/index'
import User from '../controller/index/user'
router.post('/pruduct-type',index.searchTotalList)
router.post('/products',index.searchTotalList)
router.post('/list',index.searchTypeProductsList)
router.post('/searchBg',User.searchUserImage)
module.exports = router;