const mongoose  = require('mongoose')
const menuItem = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : 'menuSchema'
    },
    menuTitle: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
    
    }
})

const menuSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : 'Menu'
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    data: {
        type: [menuItem],
        required: true
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

module.exports = mongoose.model('Menu', menuSchema)