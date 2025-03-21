const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
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
        default: function () {
            return moment(this.updateAt).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}, {
    toJSON: { virtuals: true },  
    toObject: { virtuals: true } 
});

// Update `updateAt` and `lastLog` 
userSchema.pre('save', function (next) {
    this.updateAt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.lastLog = moment(this.updateAt).format('YYYY-MM-DD HH:mm:ss');
    next();
});



module.exports = mongoose.model('User', userSchema);
