const express = require("express");

const UserController = require("../controllers/user.controller");
const ReminderController = require('../controllers/reminder.controller');
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.post("/reminder", ReminderController.createReminder);
// router.get("/reminder/:id", ReminderController.findOne);
// router.put("/reminder/:id", ReminderController.update);
// router.delete("/reminder/:id", ReminderController.delete);

module.exports = router;