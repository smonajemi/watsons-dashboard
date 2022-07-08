const mongoose = require('mongoose');
const Grid = require('gridfs-stream')
require('dotenv/config')
const connectDB = async () => {
   await mongoose.connect(process.env.DB_CONNECTION,{ useUnifiedTopology: true, useNewUrlParser: true}).then(() =>{
    console.log("Connected to Mongoose");
   }).catch((e)=>{
    console.log("Error connecting to Mongoose: " , e.message);
   })    
}


let gfs, gridfsBucket
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'menus'
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('menus');
})
module.exports = {connectDB, gridfsBucket, gfs};
