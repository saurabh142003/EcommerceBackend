const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const configSecret = require("../configs/secretMessage.config")
exports.signup=async (req,res)=>{
  
    const reqBody = req.body
    const userObj = {
        name:reqBody.name,
        userId:reqBody.userId,
        password:bcrypt.hashSync(reqBody.password,8),
        email:reqBody.email,
        userType:reqBody.userType
    }
    try{
        const cust = await userModel.create(userObj)
        res.status(201).send(cust)
        // res.status(201).send(cust)
    }catch(error){
        console.log("error while registering")
        res.status(500).send({
            message:"there is some issue"
        })
    }
}
exports.signin =async (req,res)=>{
    const user= await userModel.findOne({userId:req.body.userId})
   
    if(user==null){
        return res.status(400).send({
            message:"Username dosesnt exist"
        })
    }
    const pass = bcrypt.compareSync(req.body.password,user.password)
    if(!pass){
        return res.status(401).send({
            message:"incorrect password"
        })
    }
    const token = jwt.sign({id:user.userId},configSecret.msg,{
        expiresIn:1200
    })
    res.status(201).send({
        name:user.name,
        accessToken:token
    })
}


