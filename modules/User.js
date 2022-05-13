const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String
})

module.exports = mongoose.model('User', userSchema)