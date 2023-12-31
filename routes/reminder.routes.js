const routes = require('express').Router();
const ReminderController = require("../controllers/reminder.controller");

routes.post("/reminder", ReminderController.createReminder);
routes.get("/get-reminder", ReminderController.getReminder);
routes.put("/update-reminder/:id", ReminderController.updateReminder);
routes.delete("/delete-reminder", ReminderController.deleteReminder);
routes.get('/get-reminder-details/:id', ReminderController.getReminderDetails);


module.exports = routes;