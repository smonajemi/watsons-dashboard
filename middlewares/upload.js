const path = require('path')
const multer = require('multer')
const fileStorage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, `./uploads`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer ({
    storage: fileStorage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "application/pdf") {
            callback(null, true)
        } else {
            console.log('Error Uploading PDF')
            callback(null, false)
        }
    }
})

module.exports = upload