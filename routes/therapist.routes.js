const routes = require('express').Router();
const TherapistController = require("../controllers/therapist.controller");

routes.post("/therapist", TherapistController.createTherapist);
routes.get("/get-therapist", TherapistController.getTherapist);
routes.put("/update-therapist/:therapistId", TherapistController.updateTherapist);
routes.delete("/delete-therapist", TherapistController.deleteTherapist);
routes.get('/get-therapist-details/:therapistId', TherapistController.getTherapistDetails);
routes.get('/therapists', TherapistController.getAllTherapists);
routes.get('/check-therapist-availability/:therapistId', TherapistController.checkTherapistAvailability);
routes.get('/get-available-therapist', TherapistController.getAvailableTherapists);

module.exports = routes;