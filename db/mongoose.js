//Import the mongoose module
const mongoose = require('mongoose');
const User = require('../modules/User')

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const User = new User({username: 'smon@gmail.com', firstName: 'Sina', lastName: 'Monajemi', role: 'Admin'})