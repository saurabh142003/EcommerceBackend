const cat_controller = require("../controllers/category.controller")
const auth_mw = require("../middlewares/auth.mw")
module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/categories",[auth_mw.verifyToken,auth_mw.isAdmin],cat_controller.createNewCategory)
    app.get("/ecomm/api/v1/auth/categories/view",[auth_mw.verifyToken],cat_controller.viewCategory)
}