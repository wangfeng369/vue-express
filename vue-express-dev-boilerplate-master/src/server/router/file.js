import express from 'express'
const router = express.Router();
import fs from 'fs'
import multer from 'multer'


let createFolder = function(folder){
  try{
      fs.accessSync(folder); 
  }catch(e){
      fs.mkdirSync(folder);
  }  
};

let uploadFolder = './file';
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

/* GET home page. */
router.post('/file',upload.single('file'), function(req, res, next) {
    let file = req.file;
    console.log(file)
    res.send({ret_code: '0'});
});

router.get('/form', function(req, res, next){
  var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
  res.send(form);
});


module.exports = router;