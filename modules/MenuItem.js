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
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('MenuItem', menuItem)