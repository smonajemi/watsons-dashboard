const mongoose  = require('mongoose')

const fileSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : 'Menu'
    },
    fieldname: {
        type: String,
        lowercase: true
    },
    originalname: {
        type: String
    },
    encoding: {
        type: String
    },
    file:
    {
        data: Buffer
    },
    author:{
        type: String
    },
    mimetype: {
        type: String
    },
    createAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()},
    updateAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
})

module.exports = mongoose.model('Menu', fileSchema)