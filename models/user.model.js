const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        minlength:7,
        lowercase:true
    },
    userType:{
        type:String,
        required:true,
        default:"CUSTOMER",
        enum:["ADMIN","CUSTOMER"]
    }
},{timestamps:true,versionKey:false})
module.exports=mongoose.model("Users",userSchema)