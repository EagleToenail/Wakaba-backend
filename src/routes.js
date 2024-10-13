// const isAuthenticated = require("./middleware/isAuthenticated")
const UserController = require("./controllers/UserController")
const CustomerController = require("./controllers/CustomerController")
const SalesController = require("./controllers/SalesController")
const MasterContoller = require("./controllers/MasterController")
// const ImageController = require("./controllers/ImageController")
const AuthenticationController = require("./controllers/AuthenticationController")
// const AuthenticationControllerPolicy = require("./middleware/AuthenticationControllerPolicy");
const SettingController = require("./controllers/SettingController")
const InboxController = require("./controllers/InboxController")
const ContactController = require("./controllers/ContactController")
const ChatController = require("./controllers/ChatController")
const ProductTypeController = require("./controllers/ProductTypeController")
const MonthlyIncomeController = require('./controllers/MonthlyIncomeController')
const CashRegisterController = require('./controllers/CashRegisterController')

const TodoMessageConroller = require("./controllers/TodoMessageController")
const GeneralChatMessageController = require('./controllers/GeneralChatController');
const StoreChatMessaeContorller = require('./controllers/StoreChatContoller');
const WithdrawalBankATMMessageController = require("./controllers/WithdrawalBankATMMessageController")
const WithdrawalVariousPurchaseMessageController = require("./controllers/WithdrawalVariousPurchaseMessageController")
const WithdrawalApplyController = require("./controllers/WithdrawalApplyController")
const PurchaseToRShopMessageController = require("./controllers/PurchaseToRShopMessageController")
const OnSitePurchaseMessageController = require("./controllers/OnSitePurchaseMessageController")
const DisposalPermissionMessageController = require("./controllers/DisposalPermissionMessageController")
const InquiryController = require("./controllers/InquiryController")
const SchedulerController = require("./controllers/SchedulerController")

const StampController = require("./controllers/StampsController")
const CommemorativeCoinAndBillController = require('./controllers/CommemorativeCoinAndBillController')
const MasterController = require("./controllers/MasterController")

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
    app.post("/api/profile/getProfileById",UserController.getProfileById)
    app.post("/api/user/updateuserprofile",  UserController.upload.fields([
      { name: 'avatar', maxCount: 1 },
      { name: 'idcard_image', maxCount: 1 },
      { name: 'resume', maxCount: 1 },
      { name: 'job_description', maxCount: 1 },
      { name: 'pledge_image', maxCount: 1 },
    ]),UserController.upadateRegisterUserProfile)
    // app.get("/api/user/checkUserName/:userName", UserController.checkUserName)
    // app.delete("/api/user/deleteAccount/:userId", UserController.deleteAccount)
    app.get("/api/user/getUserList",  UserController.getUserList)
    app.post("/api/user/getStoreProfileList",  UserController.getStoreProfileList)
    app.post("/api/user/getStoreUserList",  UserController.getStoreUserList)
    app.get("/api/admin/user/getUserList",  UserController.getUserProfileList)
    app.post("/api/admin/users/search",  UserController.userSearch)
    app.post("/api/admin/profile/getindividualprofile",  UserController.getIndividualProfileById)
    app.post("/api/admin/user/updateuserprofile",  UserController.upload.fields([
      { name: 'avatar', maxCount: 1 },
      { name: 'idcard_image', maxCount: 1 },
      { name: 'resume', maxCount: 1 },
      { name: 'job_description', maxCount: 1 },
      { name: 'pledge_image', maxCount: 1 },
    ]),UserController.updateUserProfile)
    // app.post("/api/user/updateUser", UserController.updateUser)

    app.post("/api/user/getSuperVisorList",  UserController.getSuperVisorList)//get supervisor of this shop
    //==============login or logout timecard
    app.post("/api/logintime", AuthenticationController.loginTime)
    app.post("/api/logouttime", AuthenticationController.logoutTime)
    app.get("/api/workingtime" , AuthenticationController.workingTime)
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
    app.get("/api/customer/customerpastvisithistory/:customerId", CustomerController.getCustomerPastVisitHistory)
    app.post("/api/customer/customerItem",CustomerController.addCustomerItem)
    app.post("/api/customer/createcustomeritem",CustomerController.createCustomerInvoice)
    app.post("/api/customer/updatecustomeritem",CustomerController.updateCustomerInvoice)
    // //============sales
    app.get("/api/sales/getSalesList", MasterContoller.getSalesList)
    app.get("/api/sales/getSalesById/:id", MasterContoller.getSalesById)
    app.post("/api/sales/filter", MasterContoller.getSalesFilter)
    app.post("/api/sales/vendorfilter", MasterContoller.getSalesVendorFilter)
    app.post("/api/sales/createSales", MasterContoller.createSales)
    app.post("/api/sales/updateSales", MasterContoller.updateSales)
    app.get("/api/sales/deleteSales", MasterContoller.deleteSales)

    app.post("/api/vendor/getVendorList",MasterContoller.getVendorList)
    app.get("/api/vendor/getVendorListAll",MasterContoller.getVendorListAll)
    app.post("/api/purchaseinvoice", MasterContoller.saveInvoice)
    app.post('/api/purchaseinvoice/create',MasterContoller.upload.fields([
      { name: 'product_photo', maxCount: 1 },
    ]), MasterContoller.createInvoice);
    app.post('/api/purchaseinvoice/update',MasterContoller.upload.fields([
      { name: 'product_photo', maxCount: 1 },
    ]), MasterContoller.updateInvoice);
    app.post('/api/purchaseinvoice/delete', MasterContoller.deleteInvoice);
    app.post('/api/purchaseinvoice/alldelete', MasterContoller.allInvoiceClear);
    app.post('/api/purchaseinvoice/getregistereddata', MasterContoller.getRegisteredData);
    app.post('/api/purchaseinvoice/commentsave', MasterController.commentSave)

    app.post("/api/category/initialdata", MasterContoller.getCategoryInitialData)
    app.post("/api/category/data", MasterContoller.getCategoryData)
    app.post("/api/vendor/updateestimate", MasterContoller.updateEstimate)

    app.post("/api/purchaseinvoice/uploadimage",MasterContoller.upload.fields([
      { name: 'entire_items_url', maxCount: 1 },
      { name: 'document_url', maxCount: 1 },
    ]), MasterContoller.uploadItemsImage)
    
    app.post("/api/purchaseinvoice/purchasepermit", MasterContoller.purchasePermission)
    app.post("/api/purchaseinvoice/customerreceiptpermit", MasterContoller.purchaseReceiptPermit)
    app.post("/api/purchaseinvoice/stamps", MasterContoller.purchaseStamp)

    app.post("/api/purchaseinvoice/getinvoicelist", MasterContoller.getInvoiceList)
    app.post("/api/purchaseinvoice/invoicedetail", MasterContoller.getInvoiceDetail)
    app.post("/api/purchaseinvoice/confirm", MasterContoller.purchaseInvoiceConfirm)//by customer
    app.post("/api/purchaseinvoice/getinvoicenumber", MasterContoller.getInvoiceNumber)//calculate invoice count(no need)

    app.post("/api/purchaseinvoice/changePurchasePaymentStaff", MasterContoller.changePurchasePaymentStaff)
    //==============shipping=======
    app.post("/api/sales/getSalesById", MasterContoller.getSalesByIdForShipping)
    app.post("/api/sales/purchaserequestfromwholesaler", MasterContoller.savePurchaseRequestFromwholeSaler)
    app.post("/api/sales/wholelist", MasterContoller.getWholeList)

    app.post("/api/wholesalershipping/save", MasterContoller.getWholeSalerShippingSave)
    //===============YahooAcution=======
    app.get("/api/sales/getYahooAcution" ,MasterContoller.getYahooAction)
    //===============salesList==========
    app.post("/api/sales/searchsaleslist" ,MasterContoller.getSalesListBySearch)
    //================monthly Income===============
    app.post("/api/monthlyincome" ,MonthlyIncomeController.getMonthlyIncomeList)
    app.post("/api/monthlyincomefordate" ,MonthlyIncomeController.postMonthlyIncomeList)
    app.post("/api/monthlyincomeperiod" ,MonthlyIncomeController.postPeriodMonthlyIncomeList)
    app.post("/api/monthlyincome/update" ,MonthlyIncomeController.updateMonthlyIncome)
    //================cash Register==========
    app.get("/api/cashregister" ,CashRegisterController.getCashRegisteList)
    app.post("/api/cashregister" ,CashRegisterController.postCashRegisteList)
    app.post("/api/cashregisterperiod" ,CashRegisterController.postPeriodCashRegisteList)
  
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
    app.post('/api/ProductType2sfilter',  ProductTypeController.getProductType2FilterList);
    app.get('/api/ProductType3s',  ProductTypeController.getProductType3List);
    app.get('/api/ProductType4s',  ProductTypeController.getProductType4List);
    //========todoListMessage
    //app.get('/api/todomessages/:userId', TodoMessageConroller.getMessagesAndRepliesForUser);
    app.get('/api/todomessages/:userId', TodoMessageConroller.getMessages);
    app.post('/api/todomessages/getmessagelist',TodoMessageConroller.upload.fields([
      { name: 'fileUrl', maxCount: 1 },
    ]), TodoMessageConroller.createReply);

    app.post('/api/todomessage/permitok', TodoMessageConroller.permitOk);
    app.post('/api/todomessage/completeok', TodoMessageConroller.completeOk);

    app.post('/api/todochat/alerts', TodoMessageConroller.getAlerts);
    //========GeneralChatMessage
    //app.get('/api/todomessages/:userId', TodoMessageConroller.getMessagesAndRepliesForUser);
    app.post('/api/generalchat', GeneralChatMessageController.getMessages);
    app.post('/api/generalchat/getmessagelist',GeneralChatMessageController.upload.fields([
      { name: 'fileUrl', maxCount: 1 },
    ]), GeneralChatMessageController.createReply);

  
    app.post('/api/generalchat/alerts', GeneralChatMessageController.getAlerts);
    app.post('/api/generalchat/removealert', GeneralChatMessageController.removeAlerts);
    //========StoreChatMessage
    //app.get('/api/todomessages/:userId', TodoMessageConroller.getMessagesAndRepliesForUser);
    app.post('/api/storechat', StoreChatMessaeContorller.getMessages);
    app.post('/api/storechat/getmessagelist',StoreChatMessaeContorller.upload.fields([
      { name: 'fileUrl', maxCount: 1 },
    ]), StoreChatMessaeContorller.createReply);

    app.post('/api/storechat/alerts', StoreChatMessaeContorller.getAlerts);
    app.post('/api/storechat/removealert', StoreChatMessaeContorller.removeAlerts);

    //========WithdrawalBankATMMessage
    //app.get('/api/todomessages/:userId', TodoMessageConroller.getMessagesAndRepliesForUser);
    app.post('/api/withdrawalbankatmmessages', WithdrawalBankATMMessageController.getMessages);
    app.post('/api/withdrawalbankatmmessages/getmessagelist',WithdrawalBankATMMessageController.upload.fields([
      { name: 'fileUrl', maxCount: 1 },
    ]), WithdrawalBankATMMessageController.createReply);

    app.post('/api/withdrawbankatmmessage/permitok', WithdrawalBankATMMessageController.permitOk);
    app.post('/api/withdrawbankatmmessage/completeok', WithdrawalBankATMMessageController.completeOk);


    app.post('/api/withdrawbankatmmessage/alerts', WithdrawalBankATMMessageController.getAlerts);
    //========Withdrawal Various purchase
    //app.get('/api/todomessages/:userId', TodoMessageConroller.getMessagesAndRepliesForUser);
    app.post('/api/withdrawalvariouspurchasemessages', WithdrawalVariousPurchaseMessageController.getMessages);
    app.post('/api/withdrawalvariouspurchasemessages/getmessagelist',WithdrawalVariousPurchaseMessageController.upload.fields([
      { name: 'fileUrl', maxCount: 1 },
    ]), WithdrawalVariousPurchaseMessageController.createReply);

    //========Withdrawal Various purchase approval
    //app.get('/api/todomessages/:userId', TodoMessageConroller.getMessagesAndRepliesForUser);
    app.post('/api/withdrawalvariouspurchaseapprovalmessages', WithdrawalVariousPurchaseMessageController.getMessagesApproval);
    
    app.post('/api/withdrawvariouspurchaseapprovalmessage/permitok', WithdrawalVariousPurchaseMessageController.permitOk);
    app.post('/api/withdrawvariouspurchaseapprovalmessage/completeok', WithdrawalVariousPurchaseMessageController.completeOk);

    app.post('/api/withdrawvariouspurchaseapproval/alerts', WithdrawalVariousPurchaseMessageController.getAlerts);
    //========WithdrawalApplyMessage
    //app.get('/api/todomessages/:userId', TodoMessageConroller.getMessagesAndRepliesForUser);
    app.get('/api/withdrawalapplymessages/:userId', WithdrawalApplyController.getMessages);
    app.post('/api/withdrawalapplymessages/getmessagelist',WithdrawalApplyController.upload.fields([
      { name: 'fileUrl', maxCount: 1 },
    ]), WithdrawalApplyController.createReply);

    //========PurchaseToRShop
    //app.get('/api/todomessages/:userId', TodoMessageConroller.getMessagesAndRepliesForUser);
    app.post('/api/purchasetorshopmessages', PurchaseToRShopMessageController.getMessages);
    app.post('/api/purchasetorshopmessages/getmessagelist',PurchaseToRShopMessageController.upload.fields([
      { name: 'fileUrl', maxCount: 1 },
    ]), PurchaseToRShopMessageController.createReply);
    //========OnSitePurchase
    //app.get('/api/todomessages/:userId', TodoMessageConroller.getMessagesAndRepliesForUser);
    app.post('/api/onsitepurchasemessages', OnSitePurchaseMessageController.getMessages);
    app.post('/api/onsitepurchasemessages/getmessagelist',OnSitePurchaseMessageController.upload.fields([
      { name: 'fileUrl', maxCount: 1 },
    ]), OnSitePurchaseMessageController.createReply);

    app.post('/api/onsitepurchasemessages/permitok', OnSitePurchaseMessageController.permitOk);
    app.post('/api/onsitepurchasemessages/completeok', OnSitePurchaseMessageController.completeOk);

    app.post('/api/onsitepurchasemessages/alerts', OnSitePurchaseMessageController.getAlerts);
    //========Disposal Permission
    //app.get('/api/todomessages/:userId', TodoMessageConroller.getMessagesAndRepliesForUser);
    app.get('/api/disposalpermissionmessages/:userId', DisposalPermissionMessageController.getMessages);
    app.post('/api/disposalpermissionmessages/getmessagelist',DisposalPermissionMessageController.upload.fields([
      { name: 'fileUrl', maxCount: 1 },
    ]), DisposalPermissionMessageController.createReply);
  //============Scheduler
    app.post('/api/scheduler/create',SchedulerController.create)
    app.post('/api/scheduler/update',SchedulerController.update)
    app.post('/api/scheduler/read',SchedulerController.read)
  //============Inquiry
  app.post('/api/inquiry/create',InquiryController.create)
  app.post('/api/inquiry/read',InquiryController.read)
  //=============OwnerTop
  app.get('/api/ownertop/getdata',MasterContoller.getOwnerTopData)
  app.get('/api/comprehensiveanalysis/getdata',MasterContoller.getComprehensiveAnalysis)
  app.post('/api/staffindividualresult/getdata',MasterContoller.getiveAnalysisIndividualResult)
  //============stamp Rate
  app.get('/api/stamprate',StampController.getStampRate)
  app.post('/api/stamprate/update',StampController.updateStampRate)
  //============stamp sheet
  app.post('/api/stamp/update',StampController.updateStamp)

  app.post('/api/stampsheet/create',StampController.createStampSheet)
  app.get('/api/stampsheet',StampController.getStampSheetList)
  app.post('/api/stampsheet/update',StampController.updateStampSheet)
  //============stamp Pasting
  app.post('/api/stamppasting/create',StampController.createStampPasting)
  app.get('/api/stamppasting',StampController.getStampPastingList)
  app.post('/api/stamppasting/update',StampController.updateStampPasting)
  //============stamp Rose
  app.post('/api/stamprose/create',StampController.createStampRose)
  app.get('/api/stamprose',StampController.getStampRoseList)
  app.post('/api/stamprose/update',StampController.updateStampRose)
  //============stamp Pack
  app.post('/api/stamppack/create',StampController.createStampPack)
  app.get('/api/stamppack',StampController.getStampPackList)
  app.post('/api/stamppack/update',StampController.updateStampPack)
  //============stamp Card
  app.post('/api/stampcard/create',StampController.createStampCard)
  app.get('/api/stampcard',StampController.getStampCardList)
  app.post('/api/stampcard/update',StampController.updateStampCard)
  //=============stamp shipping history
  app.post('/api/stampinbound/create',StampController.createStampInbound)
  app.post('/api/stampoutbound/create',StampController.createStampOutbound)
  app.get('/api/stampshippinghistory',StampController.getStampShippingHistory)
  app.post('/api/stampshippinghistory',StampController.postStampShippingHistory)
  app.post('/api/stampshippinghistory/search',StampController.searchStampShippingHistory)
  app.post('/api/stampshippinghistorydetail',StampController.detailStampShippingHistory)
//===============coin
app.get('/api/coin',CommemorativeCoinAndBillController.getCoinList)
app.post('/api/coin/create',CommemorativeCoinAndBillController.createCoin)
//===============bill
app.get('/api/bill',CommemorativeCoinAndBillController.getBillList)
app.post('/api/bill/create',CommemorativeCoinAndBillController.createBill)
app.post('/api/profiledata',CommemorativeCoinAndBillController.getProfile)//get user profile
//===============coin and bill exchange
app.post('/api/coinandbillhistorydetail',CommemorativeCoinAndBillController.getExchangeHistoryById)
app.get('/api/coinandbillexchange',CommemorativeCoinAndBillController.getExchangeHistory)
app.post('/api/coinandbillexchange/create',CommemorativeCoinAndBillController.createExchange)
app.post('/api/coinandbillexchange/search',CommemorativeCoinAndBillController.searchExchange)


}