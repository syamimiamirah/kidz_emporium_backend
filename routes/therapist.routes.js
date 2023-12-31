const routes = require('express').Router();
const TherapistController = require("../controllers/therapist.controller");

routes.post("/therapist", TherapistController.createTherapist);
routes.get("/get-therapist", TherapistController.getTherapist);
routes.put("/update-therapist/:id", TherapistController.updateTherapist);
routes.delete("/delete-therapist", TherapistController.deleteTherapist);
routes.get('/get-therapist-details/:id', TherapistController.getTherapistDetail);


module.exports = routes;