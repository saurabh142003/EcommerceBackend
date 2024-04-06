const mongoose = require("mongoose")
const Category = require("../models/category.model")
const prodSchema = new mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("Product",prodSchema)