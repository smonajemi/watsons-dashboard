const mongoose = require('mongoose');
require('dotenv/config')
const connectDB = async () => {
   await mongoose.connect(process.env.DB_CONNECTION,{ useUnifiedTopology: true, useNewUrlParser: true}).then(() =>{
    console.log("Connected to Mongoose");
   }).catch((e)=>{
    console.log("Error connecting to Mongoose: " , e.message);
   })    
}
module.exports = connectDB;
