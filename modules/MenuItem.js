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


module.exports = mongoose.model('MenuItem', menuItem)