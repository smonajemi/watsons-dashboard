const mongoose  = require('mongoose')
const menuItem = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : 'menuSchema'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
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
    description: {
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