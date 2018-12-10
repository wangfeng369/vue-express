import express from 'express'
import sequelize from '../config/db'
const router = express.Router()
const article = require('../model/index').article
import index from '../controller/index/index'
import base from '../controller/base/index'
import fs from 'fs'
import multer from 'multer'
let createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
  };
  
  let uploadFolder = './upload';
  createFolder(uploadFolder)
  
  // 通过 filename 属性定制
  let storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
      },
      filename: function (req, file, cb) {
          // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
          cb(null, file.originalname);  
      }
  });
  
  // 通过 storage 选项来对 上传行为 进行定制化
  let upload = multer({ storage: storage })
// router.post('/article', function (req, res, next) {
//   let currentPage = req.body.currentPage
//   let pageSize = req.body.pageSize
//   let totalCount = 0
//   let offset = (currentPage - 1) * pageSize
//   sequelize.transaction(t => {
//       return article.findAndCountAll({
//               offset: offset,
//               limit: pageSize
//           })
//           .then((result) => {
//               totalCount = result.count
//               res.send({
//                   'data': result.rows,
//                   'totalCount': totalCount
//               })
//           }).catch((err) => {
//               console.error(err);
//           });
//   })
// })
router.post('/article',index.indexArticle)
router.post('/uploadDetail',upload.array('file',2),index.uploadFoodDetail)
router.post('/getList',index.searchTotalList)
module.exports = router;