import express from 'express'
import sequelize from '../config/db'
const router = express.Router()
const article = require('../model/index').article
import index from '../controller/index/index'
router.post('/pruduct-type',index.searchTotalList)
router.post('/products',index.searchTotalList)
module.exports = router;