const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const configSecret = require("../configs/secretMessage.config")
const verifyAllReq=async (req,res,next)=>{
   try{ if(!req.body.name){
        res.status(401).send({
            message:"you have not entered the name"
        })
    }
    if(!req.body.userId){
        res.status(401).send({
            message:"you have not entered the userId"
        })
    }
    if(!req.body.password){
        res.status(401).send({
            message:"you have not entered the password"
        })
    }
    if(!req.body.email){
        res.status(401).send({
            message:"you have not entered the email"
        })
    }
   
    
     const isUserAvailable = await userModel.findOne({userId:req.body.userId})
    if(isUserAvailable){
        res.status(401).send({
            message:"userid is already available try new one"
        })
    
    }
    next()
}catch(err){
    console.log("there is some error while checking the userid")
    res.status(401).send({
        message:"checking user  id is giving problems"
    })
}
}
const verifySignIn = (req,res,next)=>{

    if(!req.body.userId){
        res.status(401).send({
            message:"you have not entered the userId"
        })
    }
    if(!req.body.password){
        res.status(401).send({
            message:"you have not entered the password"
        })

    }
    next()

}
const verifyToken = (req,res,next)=>{
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message : "No token found : UnAuthorized"
        })
    }
    jwt.verify(token,configSecret.msg,async (err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"invalid token"
            })
        }
        const user = await userModel.findOne({userId:decoded.id})
        if(!user){
            return res.status(402).send({
                message:"Unauthorised Token"
            })
        }
        req.user=user
        next()
    })
}
const isAdmin = (req,res,next)=>{
    const user = req.user
    if(user && user.userType=='ADMIN' ){
        next()
    }else{
        return res.status(401).send({
            message:"Only admin can add categories"
        })
    }
}

module.exports={
    verifyAllReq:verifyAllReq,
    verifySignIn:verifySignIn,
    verifyToken:verifyToken,
    isAdmin:isAdmin

}