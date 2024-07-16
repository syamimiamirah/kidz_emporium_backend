// scheduler/reminderScheduler.js
const cron = require('node-cron');
const ReminderModel = require('../models/reminder.model');
const { sendNotificationReminder } = require('../services/notification.services');

const checkReminders = async () => {
    const now = new Date();
    const reminders = await ReminderModel.find({
        notificationDate: { $lte: now },
        toDate: { $gte: now }
    });

    reminders.forEach(async (reminder) => {
        await sendNotificationReminder(reminder);
    });
};

// Schedule the checkReminders function to run every day at a specific time (e.g., 8:00 AM)
cron.schedule('0 8 * * *', checkReminders);

module.exports = { checkReminders };
