// const isAuthenticated = require("./middleware/isAuthenticated")
const UserController = require("./controllers/UserController")
const CustomerController = require("./controllers/CustomerController")
const SalesController = require("./controllers/SalesController")
// const ImageController = require("./controllers/ImageController")
const AuthenticationController = require("./controllers/AuthenticationController")
// const AuthenticationControllerPolicy = require("./middleware/AuthenticationControllerPolicy");

module.exports = (app) => {
  // =========authentication
  // app.post("/api/auth/register", AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post("/api/auth/login", AuthenticationController.login)
  // app.get("/api/auth/verifyPassword/:password", isAuthenticated, AuthenticationController.verifyPassword)
  // app.post("/api/auth/updatePassword",isAuthenticated,AuthenticationControllerPolicy.updatePassword,AuthenticationController.updatePassword)
  // app.post("/api/auth/requestPasswordToken", AuthenticationController.requestPasswordToken)
  // app.get("/api/auth/verifyPasswordToken/:token", AuthenticationController.verifyPasswordToken)
  // app.post("/api/auth/checkRegsToken", AuthenticationController.checkRegsToken)
  // app.post("/api/auth/verifyRegsToken", AuthenticationController.verifyRegsToken)
  // app.post("/api/auth/resetPassword", AuthenticationController.resetPassword)
  // app.post("/api/auth/resetRegsToken", AuthenticationController.resetRegsToken)

    // // ==============user
    app.get("/api/user/checkUserName/:userName", UserController.checkUserName)
    app.delete("/api/user/deleteAccount/:userId", UserController.deleteAccount)
    app.get("/api/user/getUserById/:userId", UserController.getUserById)
    app.get("/api/user/getUserList",  UserController.getUserList)
    app.post("/api/user/updateUser", UserController.updateUser)
    app.get("/api/user/getUserByEmail/:email",UserController.getUserByEmail)
    // //============customer
    app.get("/api/customer/getCustomerList", CustomerController.getCustomerList)
    app.post("/api/customer/createCustomer", CustomerController.createCustomer)
    app.post("/api/customer/updateCustomer", CustomerController.updateCustomer)
    app.post("/api/customer/deleteCustomer", CustomerController.deleteCustomer)
    app.post("/api/customer/search", CustomerController.searchCustomer)
    app.get("/api/customer/getUserByCustomer/:customerId", CustomerController.getCustomerById)
    // //============sales
    app.get("/api/sales/getSalesList", SalesController.getSalesList)
    app.post("/api/sales/filter", SalesController.getSalesFilter)
    app.post("/api/sales/createSales", SalesController.createSales)
    app.post("/api/sales/updateSales", SalesController.updateSales)
    app.get("/api/sales/deleteSales", SalesController.deleteSales)


  // app.post("/api/products/createProduct",ImageController.uploadProductImage, ProductsController.createProduct)

}