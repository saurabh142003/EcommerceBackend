const mw = require("../middlewares/auth.mw")
const authController = require("../controllers/auth.controller")
module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",[mw.verifyAllReq],authController.signup)
    app.post("/ecomm/api/v1/auth/signin",[mw.verifySignIn],authController.signin)
}