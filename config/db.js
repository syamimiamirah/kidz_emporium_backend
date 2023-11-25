const MONGO_DB_CONFIG ={
    DB: "mongodb://127.0.0.1:27017/KidzEmporium",
};

module.exports = {
    MONGO_DB_CONFIG,
};


// const mongoose = require('mongoose');

// const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/KidzEmporium').on('open', ()=>{
//     console.log("MongoDB Connected");
// }).on('error',()=>{
//     console.log("MongoDB Connection Error");
// });


// module.exports = connection;