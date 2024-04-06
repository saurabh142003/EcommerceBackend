const cartController = require("../controllers/cart.controller")
const auth_mw = require("../middlewares/auth.mw")
module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/cart/add",cartController.createOrder)
    app.get("/ecomm/api/v1/auth/cart",cartController.getAllOrders)
    app.get("/ecomm/api/v1/auth/cart/:id",cartController.getOrderById)
    app.put("/ecomm/api/v1/auth/cart/update/:id",cartController.updateOrderById)
    app.delete("/ecomm/api/v1/auth/cart/delete/:id",cartController.deleteOrderById)

}