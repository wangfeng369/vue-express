import express from 'express'
const router = express.Router()
const article = require('../model/index').article
import index from '../controller/index/index'


router.post('/article',index.indexArticle)
router.post('/uploadDetail',index.uploadFile().array('files',5),index.uploadFoodDetail)
router.post('/getList',index.searchTotalList)
router.post('/getTableList',index.searchAdminName)
router.post('/deleteDetail',index.deleteDetail)
module.exports = router;