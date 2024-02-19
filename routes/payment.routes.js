const routes = require('express').Router();
const PaymentController = require("../controllers/payment.controller");

routes.post("/payment", PaymentController.createPayment);
routes.get("/get-payment", PaymentController.getPayment);
routes.put("/update-payment/:id", PaymentController.updatePayment);
routes.delete("/delete-payment/:id", PaymentController.deletePayment);  
routes.get('/get-payment-details/:id', PaymentController.getPaymentDetails);
routes.get('/payments', PaymentController.getAllPayment);



module.exports = routes;