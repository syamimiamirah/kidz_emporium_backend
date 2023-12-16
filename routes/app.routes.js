const express = require("express");

const UserController = require("../controllers/user.controller");
const ReminderController = require('../controllers/reminder.controller');
const routes = express.Router();

routes.post("/register", UserController.register);
routes.post("/login", UserController.login);

routes.post("/reminder", ReminderController.createReminder);
routes.get("/get-reminder", ReminderController.getReminder);
routes.post("/update-reminder", ReminderController.updateReminder);
routes.delete("/delete-reminder", ReminderController.deleteReminder);
routes.get('/get-reminder-details/:id', ReminderController.getReminderDetails);

module.exports = routes;