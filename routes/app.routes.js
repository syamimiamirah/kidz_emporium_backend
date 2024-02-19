const express = require("express");

const UserController = require("../controllers/user.controller");
const ReminderController = require('../controllers/reminder.controller');
const ChildController = require('../controllers/child.controller');
const TherapistController = require("../controllers/therapist.controller");
const BookingController = require("../controllers/booking.controller");
const PaymentController = require("../controllers/payment.controller");

const routes = express.Router();

//registration & login
routes.post("/register", UserController.register);
routes.post("/login", UserController.login);

//reminder
routes.post("/reminder", ReminderController.createReminder);
routes.get("/get-reminder", ReminderController.getReminder);
routes.put("/update-reminder/:id", ReminderController.updateReminder);
routes.delete("/delete-reminder", ReminderController.deleteReminder);
routes.get('/get-reminder-details/:id', ReminderController.getReminderDetails);

//child
routes.post("/child", ChildController.createChild);
routes.get("/get-child", ChildController.getChild);
routes.put("/update-child/:id", ChildController.updateChild);
routes.delete("/delete-child", ChildController.deleteChild);
routes.get('/get-child-details/:id', ChildController.getChildDetails);
routes.get('/children', ChildController.getAllChildren);

//therapist
routes.post("/therapist", TherapistController.createTherapist);
routes.get("/get-therapist", TherapistController.getTherapist);
routes.put("/update-therapist/:id", TherapistController.updateTherapist);
routes.delete("/delete-therapist", TherapistController.deleteTherapist);
routes.get('/get-therapist-details/:id', TherapistController.getTherapistDetails);
routes.get('/therapists', TherapistController.getAllTherapists);
routes.get('/check-therapist-availability/:id', TherapistController.checkTherapistAvailability);


//booking
routes.post("/booking", BookingController.createBooking);
routes.get("/get-booking", BookingController.getBooking);
routes.put("/update-booking/:id", BookingController.updateBooking);
routes.delete("/delete-booking", BookingController.deleteBooking);
routes.get('/get-booking-details/:id', BookingController.getBookingDetails);
routes.get('/bookings', BookingController.getAllBookings);

//payment
routes.post("/payment", PaymentController.createPayment);
routes.get("/get-payment", PaymentController.getPayment);
routes.put("/update-payment/:id", PaymentController.updatePayment);
routes.delete("/delete-payment/:id", PaymentController.deletePayment);  
routes.get('/get-payment-details/:id', PaymentController.getPaymentDetails);
routes.get('/payments', PaymentController.getAllPayment);


module.exports = routes;