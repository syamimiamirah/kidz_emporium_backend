const reminderModel = require('../models/reminder.model');
const mongoose = require("mongoose");

class reminderServices{
    static async createReminder(userId, eventName, details, fromDate, toDate){
        const createReminder = new reminderModel({userId, eventName, details, fromDate, toDate});
        return await createReminder.save();
    }

    static async getReminder(userId, eventName, details, fromDate, toDate){
        const getReminder = await reminderModel.find({userId});
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
      try {
        // Check if the reminder exists
        const updatedReminder = await reminderModel.findOneAndUpdate(
          {_id:id},
          {$set: { eventName: updatedData.eventName, details: updatedData.details, fromDate: updatedData.fromDate, toDate: updatedData.toDate}},
          { new: true } // Return the updated document
        );
    
        return updatedReminder;
      } catch (error) {
        console.error(`Error updating reminder: ${error.message}`);
        throw error;
      }
    }
    
    static async getReminderDetails(id) {
      try {
          const reminderDetails = await reminderModel.findById({_id: id});
          return reminderDetails;
      } catch (error) {
          console.error('Error fetching reminder details:', error);
          throw error;
      }
    }
    
}

module.exports = reminderServices;
