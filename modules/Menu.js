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
    description: {
        type: String
    },
    file:
    {
        type: String,
        contentType: String
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