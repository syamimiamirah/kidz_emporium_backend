const routes = require('express').Router();
const BookingController = require("../controllers/booking.controller");

routes.post("/booking", BookingController.createBooking);
routes.get("/get-booking", BookingController.getBooking);
routes.put("/update-booking/:id", BookingController.updateBooking);
routes.delete("/delete-booking", BookingController.deleteBooking);
routes.get('/get-booking-details/:id', BookingController.getBookingDetails);
routes.get('/bookings', BookingController.getAllBookings);

module.exports = routes;