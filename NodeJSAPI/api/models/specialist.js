const mongoose = require('mongoose')
const specialistsSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})


module.exports =  mongoose.model('Specialists',specialistsSchema)