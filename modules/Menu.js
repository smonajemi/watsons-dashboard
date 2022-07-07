const mongoose  = require('mongoose')

const fileSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : 'Menu'
    },
    name: {
        type: String,
        lowercase: true
    },
    author: {
        type: String
    },
    file:
    {
        data: Buffer
    },
    contentType: {
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