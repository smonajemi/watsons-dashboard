const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        min: 1,
        required: true
    },
    lastName: {
        type: String,
        min: 1,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "user"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    lastLog: {
        type: String, 
        default: "Never logged in"
    }
}, {
    toJSON: { virtuals: true },  
    toObject: { virtuals: true } 
});


module.exports = mongoose.model('User', userSchema);
