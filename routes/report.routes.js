const routes = require('express').Router();
const ReportController = require("../controllers/report.controller");

routes.post("/report", ReportController.createReport);
routes.get("/get-report", ReportController.getReport);
routes.put("/update-report/:id", ReportController.updateReport);
routes.delete("/delete-report/:id", ReportController.deleteReport);  
routes.get('/get-report-details-By-BookingId/:bookingId', ReportController.getReportDetailsByBookingId);
routes.get('/get-report-details/:id', ReportController.getReportDetails);
routes.get('/reports', ReportController.getAllReports);
routes.get('/check-report/:bookingId', ReportController.checkReport);

module.exports = routes;