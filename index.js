const mongoose = require('mongoose')
const userSchema=require("./models/user.model")
const bcrypt = require('bcryptjs')
const express = require("express")
const configdb = require("./configs/db.config")
const configport = require("./configs/port.config")
const app = express()
app.use(express.json())


mongoose.connect(configdb.dbURL)
const db = mongoose.connection
db.on("error",()=>{
    console.log('error while connecting to db')
})
db.once("open",()=>{
    console.log("connected to database")
    innit()
})
async function innit(){

   try{
    let admin = await userSchema.findOne({userId:"admin"})
    if(admin){
        console.log("admin is present")
        return
    }}catch(error){
        console.log("issues are there")
    }
    try{
        admin = await userSchema.create({
        name:"Saurabh",
        userId:"admin",
        password:bcrypt.hashSync("saurabh@90",8),
        email:"saurm@gmail.com",
        userType:"ADMIN"

    })
    console.log("ADMIN",admin)
   
}catch(error){
    console.log("facing issue while creating admin"+error)
    }
}
require("./routes/auth.route")(app)
require("./routes/category.route")(app)
require("./routes/product.route")(app)
require("./routes/cart.route")(app)
app.listen(configport.PORT,()=>{
    console.log("server connected")
})
