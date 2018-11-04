import express from 'express'
import sequelize from '../config/db'
const router = express.Router()
const article = require('../model/index').article

router.post('/article', function (req, res, next) {
  let currentPage = req.body.currentPage
  let pageSize = req.body.pageSize
  let totalCount = 0
  let offset = (currentPage - 1) * pageSize
  sequelize.transaction(t => {
      return article.findAndCountAll({
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

module.exports = router;