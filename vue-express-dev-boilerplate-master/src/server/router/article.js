import express from 'express'
const router = express.Router()
const article = require('../model/index').article
import index from '../controller/index/index'
import User from '../controller/index/user'

router.post('/article',index.indexArticle)
router.post('/uploadDetail',index.uploadFile().array('files',5),index.uploadFoodDetail)
router.post('/getList',index.searchTotalList)
router.post('/getTableList',index.searchAdminName)
router.post('/deleteDetail',index.deleteDetail)
router.post('/uploadBg',index.uploadFile().fields([{name:'bg'},{name:'logo'}]),User.createOrUpdateImage)
router.post('/searchBg',User.searchUserImage)
module.exports = router;