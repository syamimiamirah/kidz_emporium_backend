const express = require("express");

const UserController = require("../controllers/user.controller");
const ReminderController = require('../controllers/reminder.controller');
const ChildController = require('../controllers/child.controller');
const TherapistController = require("../controllers/therapist.controller");
const BookingController = require("../controllers/booking.controller");
const PaymentController = require("../controllers/payment.controller");
const ReportController = require("../controllers/report.controller");
const TaskController = require("../controllers/task.controller");
const LivestreamController = require("../controllers/livestream.controller");
const VideoController = require('../controllers/video.controller');

const multer = require('multer');

const routes = express.Router();

//registration & login
routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.get('/users', UserController.getAllUsers);

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
routes.put("/update-therapist/:therapistId", TherapistController.updateTherapist);
routes.delete("/delete-therapist", TherapistController.deleteTherapist);
routes.get('/get-therapist-details/:therapistId', TherapistController.getTherapistDetails);
routes.get('/therapists', TherapistController.getAllTherapists);
routes.get('/check-therapist-availability/:therapistId', TherapistController.checkTherapistAvailability);

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

//report
routes.post("/report", ReportController.createReport);
routes.get("/get-report", ReportController.getReport);
routes.put("/update-report/:id", ReportController.updateReport);
routes.delete("/delete-report", ReportController.deleteReport);  
routes.get('/get-report-details-by-bookingId/:bookingId', ReportController.getReportDetailsByBookingId);
routes.get('/get-report-details', ReportController.getReportDetails);
routes.get('/reports', ReportController.getAllReports);
routes.get('/check-report/:bookingId', ReportController.checkReport);

//task
routes.post("/task", TaskController.createTask);
routes.get("/get-task", TaskController.getTask);
routes.put("/update-task/:id", TaskController.updateTask);
routes.delete("/delete-task", TaskController.deleteTask);  
routes.get('/get-task-details/:id', TaskController.getTaskDetails);
routes.get('/tasks', TaskController.getAllTasks);

//video-streaming
routes.post("/livestream", LivestreamController.createLivestream);
routes.get("/get-livestream", LivestreamController.getLivestream);
routes.put("/update-livestream/:id", LivestreamController.updateLivestream);
routes.delete("/delete-livestream/:id", LivestreamController.deleteLivestream);
routes.get("/get-livestream-details/:id", LivestreamController.getLivestreamDetails);
routes.get("/livestreams", LivestreamController.getAllLivestreams);


//video
// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos'); // Define the directory where uploaded videos will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define the filename for uploaded videos
  }
});

// Multer file filter function
const fileFilter = (req, file, cb) => {
  // Check file type and reject if not allowed (e.g., allow only video files)
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed'), false);
  }
};

// Initialize Multer with storage and file filter options
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route handler for uploading videos
routes.post("/video", upload.single('file'), VideoController.createVideo);
routes.get("/get-video", VideoController.getVideo);
routes.put("/update-video/:id", VideoController.updateVideo);
routes.delete("/delete-video", VideoController.deleteVideo);
routes.get('/get-video-details/:id', VideoController.getVideoDetails);
routes.get('/videos', VideoController.getAllVideos);

module.exports = routes;