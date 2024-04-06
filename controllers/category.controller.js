const cat_model = require("../models/category.model")
const createNewCategory = async(req,res)=>{
    const cat_data = {
        name:req.body.name,
        description:req.body.description
    }
     try{ 
        const category = await cat_model.create(cat_data)
        return res.status(201).send(category)
    }catch(err){
        console.log("there some error in creating category file"+err)
        return res.status(500).send({
            message:"there some error in creating category file"
        })
    }
}
const viewCategory =async (req,res)=>{
    try{
    const view = await cat_model.find()
    res.status(201).send(view)
    }catch(err){
        console.log("there is some problem while viewing")
        res.status(501).send({
            message:"there is some problem while viewing"
        })
    }
}
module.exports={
    createNewCategory:createNewCategory,
    viewCategory:viewCategory

}