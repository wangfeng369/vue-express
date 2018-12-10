import fs from 'fs'
import multer from 'multer'

class Upload{
    constructor(){
    }
    uploadFile(){
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

          return upload
    }
}


export default new Upload