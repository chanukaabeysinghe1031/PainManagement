const mongoose = require('mongoose');

const URI = "mongodb+srv://admin:admin@cluster0.qcboash.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () =>{
    await mongoose.connect(URI,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
    });
    console.log("Pain Management APP DATABASE CONNECTION HAS BEEN SET UP!")
}

module.exports = connectDB;