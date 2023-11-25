const routes = require('express').Router();
const ReminderController = require("../controllers/reminder.controller");

routes.post("/reminder", ReminderController.createReminder);
// routes.get("/reminder/:id", ReminderController.findOne);
// routes.put("/reminder/:id", ReminderController.update);
// routes.delete("/reminder/:id", ReminderController.delete);

module.exports = routes;