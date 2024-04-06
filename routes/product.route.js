const prod_controller = require("../controllers/product.controller")
const auth_mw = require("../middlewares/auth.mw")
module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/products",[auth_mw.verifyToken,auth_mw.isAdmin],prod_controller.addProduct)
    app.get("/ecomm/api/v1/auth/products/view",[auth_mw.verifyToken],prod_controller.showProducts)
}
   