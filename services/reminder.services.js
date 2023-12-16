const reminderModel = require('../models/reminder.model');

class ReminderServices{
    static async createReminder(userId, eventName, details, fromDate, toDate){
        const createReminder = new reminderModel({userId, eventName, details, fromDate, toDate});
        return await createReminder.save();
    }

    static async getReminder(userId, eventName, details, fromDate, toDate){
        const getReminder = await reminderModel.find({userId})
        return getReminder;
    }
    
    static async deleteReminder(id) {
        const deletedReminder = await reminderModel.findOneAndDelete({_id:id});
    
        if (!deletedReminder) {
            throw new Error('Reminder not found');
        }
    
        return deletedReminder;
    }
    
    
    static async updateReminder(id, updatedData) {
        const updatedReminder = await reminderModel.findByIdAndUpdate(id, updatedData, { new: true });
    
        if (!updatedReminder) {
          throw new Error('Reminder not found');
        }
    
        return updatedReminder;
      }

    static async getReminderDetails(id) {
        try {
            const reminderDetails = await reminderModel.findById(id);
            return reminderDetails;
        } catch (error) {
            console.error('Error fetching reminder details:', error);
            throw error;
        }
    }
    
}

module.exports = ReminderServices;
