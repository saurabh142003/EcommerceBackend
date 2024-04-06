const categoryModel = require("../models/category.model")
const productModel =require("../models/product.model")
const addProduct = async (req,res)=>{
   try{ 
    const existCategory = await categoryModel.findById(req.body.categoryId)
    if(!existCategory){
        console.log("invalid category")
        return res.status(501).send({
            message:req.body.categoryId+" this categoryId doesnt exist"
        })
    }
    const product ={
        categoryId:req.body.categoryId,
        name:req.body.name,
        price:req.body.price,
    }
    const storingData= await productModel.create(product)
   
    return res.status(201).send(storingData)

    }catch(err){
        console.log("there is some error while creating product"+err)
        return res.status(501).send({
            message:"there is some error while creating product"
        })

    }
    }
const showProducts = async(req,res)=>{
    try{
    const show = await productModel.find().populate('categoryId')      
    // const viewProducts =await productModel.find()
    res.status(201).send(show)
    }catch(err){
        console.log("error while viewing products",err)
        res.status(501).send({
            message:"error while viewing products"
        })
    }
}
module.exports = {
    addProduct:addProduct,
    showProducts:showProducts
}