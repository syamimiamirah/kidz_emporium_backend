const express = require("express");

const UserController = require("../controllers/user.controller");
const ReminderController = require('../controllers/reminder.controller');
const ChildController = require('../controllers/child.controller');
const TherapistController = require("../controllers/therapist.controller");

const routes = express.Router();

routes.post("/register", UserController.register);
routes.post("/login", UserController.login);

routes.post("/reminder", ReminderController.createReminder);
routes.get("/get-reminder", ReminderController.getReminder);
routes.put("/update-reminder/:id", ReminderController.updateReminder);
routes.delete("/delete-reminder", ReminderController.deleteReminder);
routes.get('/get-reminder-details/:id', ReminderController.getReminderDetails);

routes.post("/child", ChildController.createChild);
routes.get("/get-child", ChildController.getChild);
routes.put("/update-child/:id", ChildController.updateChild);
routes.delete("/delete-child", ChildController.deleteChild);
routes.get('/get-child-details/:id', ChildController.getChildDetails);

routes.post("/therapist", TherapistController.createTherapist);
routes.get("/get-therapist", TherapistController.getTherapist);
routes.put("/update-therapist/:id", TherapistController.updateTherapist);
routes.delete("/delete-therapist", TherapistController.deleteTherapist);
routes.get('/get-therapist-details/:id', TherapistController.getTherapistDetails);


module.exports = routes;