// const isAuthenticated = require("./middleware/isAuthenticated")
const UserController = require("./controllers/UserController")
const CustomerController = require("./controllers/CustomerController")
const SalesController = require("./controllers/SalesController")
// const ImageController = require("./controllers/ImageController")
const AuthenticationController = require("./controllers/AuthenticationController")
// const AuthenticationControllerPolicy = require("./middleware/AuthenticationControllerPolicy");
const SettingController = require("./controllers/SettingController")
const InboxController = require("./controllers/InboxController")
const ContactController = require("./controllers/ContactController")
const ChatController = require("./controllers/ChatController")
const ProductTypeController = require("./controllers/ProductTypeController")

module.exports = (app) => {
  // =========authentication
  app.post("/api/auth/register", AuthenticationController.register)
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
    app.post("/api/users", UserController.find)
    app.post("/api/user/confirmuser", UserController.confirmUser)
    app.post("/api/user/getUserById",UserController.getUserById)
    app.post("/api/user/createuserprofile",  UserController.upload.fields([
      { name: 'avatar', maxCount: 1 },
      { name: 'idcard_image', maxCount: 1 },
      { name: 'resume', maxCount: 1 },
      { name: 'job_description', maxCount: 1 },
      { name: 'pledge_image', maxCount: 1 },
    ]),UserController.createUserProfile)
    // app.get("/api/user/checkUserName/:userName", UserController.checkUserName)
    // app.delete("/api/user/deleteAccount/:userId", UserController.deleteAccount)
    // app.get("/api/user/getUserList",  UserController.getUserList)
    // app.post("/api/user/updateUser", UserController.updateUser)

    //==============login or logout timecard
    app.post("/api/logintime", AuthenticationController.loginTime)
    app.post("/api/logouttime", AuthenticationController.logoutTime)

    // //============customer
    app.get("/api/customer/getCustomerList", CustomerController.getCustomerList)
    app.post("/api/customer/createCustomer",  CustomerController.upload.fields([
      { name: 'avatarimage', maxCount: 1 },
      { name: 'idcard', maxCount: 1 }
    ]),CustomerController.createCustomer)
    app.post("/api/customer/updateCustomer", CustomerController.upload.fields([
      { name: 'avatarimage', maxCount: 1 },
      { name: 'idcard', maxCount: 1 }
    ]), CustomerController.updateCustomer)
    app.post("/api/customer/deleteCustomer", CustomerController.deleteCustomer)
    app.post("/api/customer/search", CustomerController.searchCustomer)
    app.get("/api/customer/getCustomerById/:customerId", CustomerController.getCustomerById)

    // //============sales
    app.get("/api/sales/getSalesList", SalesController.getSalesList)
    app.get("/api/sales/getSalesById/:id", SalesController.getSalesById)
    app.post("/api/sales/filter", SalesController.getSalesFilter)
    app.post("/api/sales/createSales", SalesController.createSales)
    app.post("/api/sales/updateSales", SalesController.updateSales)
    app.get("/api/sales/deleteSales", SalesController.deleteSales)

    app.post("/api/purchaseinvoice", SalesController.saveInvoice)

    //=============setting
    app.post("/api/settings", SettingController.find)
    app.post("/api/settings/update", SettingController.update)

    //=============Inbox
    app.post("/api/inboxes", InboxController.find)

    //============contacts
    app.post("/api/contacts", ContactController.insert)
    app.post("/api/contacts/find", ContactController.find)
    // app.post("/api/products/createProduct",ImageController.uploadProductImage, ProductsController.createProduct)

      
    //=============chat      
    app.get('/api/chats/:roomId',  ChatController.findByRoomId);
    app.delete('/api/chats/:roomId',  ChatController.deleteByRoomId);
    //==============ProductType
    app.get('/api/ProductType1s',  ProductTypeController.getProductType1List);
    app.get('/api/ProductType2s',  ProductTypeController.getProductType2List);
}