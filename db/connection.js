const mongoose = require('mongoose');
require('dotenv/config');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_CONNECTION, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected to Mongoose");
    } catch (error) {
        console.log("Error connecting to Mongoose:", error.message);
    }
};

module.exports = connectDB;


// let gfs, gridfsBucket
// const conn = mongoose.connection;
// conn.once('open', () => {
//     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'menus'
//     });
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('menus');
// })
module.exports = connectDB;
