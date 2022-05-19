const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },
    username: {
        type: String,
        lowercase: true
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
        min: 1,
    },
    lastName: {
        type: String,
        min: 1
    },
    email : {
        type: String
    },
    role: String,
    createAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()    },
    updateAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
})

module.exports = mongoose.model('user', userSchema)