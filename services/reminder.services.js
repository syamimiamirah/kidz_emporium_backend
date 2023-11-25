const reminderModel = require('../models/reminder.model');

class ReminderServices{
    static async createReminder(userId, eventName, details, fromDate, toDate){
        const createReminder = new reminderModel({userId, eventName, details, fromDate, toDate});
        return await createReminder.save();
    }
}
module.exports = ReminderServices;
