const path = require('path')
const multer = require('multer')
const crypto = require('crypto');
const {GridFsStorage} = require('multer-gridfs-storage');
require('dotenv').config()


const storage = new GridFsStorage({
    url: process.env.DB_CONNECTION,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      if (file.mimetype === 'application/pdf') {
        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) return reject(err)
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
              filename: filename,
              bucketName: 'uploads',
              metadata:  {
                menuType: req.body.selectControl,
                author: req.session.user.username
              }
            }
            resolve(fileInfo);
          });
        });

      } 
      return null
    }
  });
  
const upload = multer({storage})

module.exports = upload