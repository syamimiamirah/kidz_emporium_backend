const therapistModel = require('../models/therapist.model');
const bookingModel = require('../models/booking.model');
const taskModel = require('../models/task.model');
const { DateTime } = require('luxon');
const mongoose = require("mongoose");

class therapistServices{
  
    static async createTherapist(therapistId, hiringDate, specialization, aboutMe, managedBy){
        const createTherapist = new therapistModel({therapistId, hiringDate, specialization, aboutMe, managedBy});
        return await createTherapist.save();
    }

    static async getTherapist(managedBy){
        const getTherapist = await therapistModel.find({managedBy});
        return getTherapist;
    }

    static async updateTherapist(therapistId, updatedData) {
        try {
          // Check if the reminder exists
          const updatedTherapist = await therapistModel.findOneAndUpdate(
            {therapistId: therapistId},
            {$set: { hiringDate: updatedData.hiringDate, specialization: updatedData.specialization, aboutMe: updatedData.aboutMe}},
            { new: true } // Return the updated document
          );
      
          return updatedTherapist;
        } catch (error) {
          console.error(`Error updating therapist: ${error.message}`);
          throw error;
        }
      }

    static async deleteTherapist(id) {
        const deletedTherapist = await therapistModel.findOneAndDelete({_id:id});
    
        if (!deletedTherapist) {
            throw new Error('Therapist not found');
        }
    
        return deletedTherapist;
    }

    static async getTherapistDetails(therapistId) {
      try {
          const therapistDetails = await therapistModel.findOne({ therapistId: therapistId });
          return therapistDetails;
      } catch (error) {
          console.error('Error fetching therapist details:', error);
          throw error;
      }
  }
  

    static async getAllTherapists() {
      try {
          const allTherapists = await therapistModel.find();
          return allTherapists;
      } catch (error) {
          console.error('Error fetching all theraspists:', error);
          throw error;
      }
  }

  static async checkTherapistAvailability(therapistId, fromDate, toDate) {
    try {
        // Convert fromDate and toDate to JavaScript Date objects
        const fromDateTime = new Date(fromDate);
        const toDateTime = new Date(toDate);

        // Check for overlapping bookings in taskModel
        const existingTasks = await taskModel.find({
            therapistId: therapistId,
            $or: [
                { fromDate: { $lt: toDateTime }, toDate: { $gt: fromDateTime } }, // Check for overlapping time range
                { fromDate: { $gte: fromDateTime, $lt: toDateTime } },
                { toDate: { $gt: fromDateTime, $lte: toDateTime } }
            ]
        }).exec();

        // Check for overlapping bookings in bookingModel
        const existingBookings = await bookingModel.find({
            therapistId: therapistId,
            $or: [
                { fromDate: { $lt: toDateTime }, toDate: { $gt: fromDateTime } }, // Check for overlapping time range
                { fromDate: { $gte: fromDateTime, $lt: toDateTime } },
                { toDate: { $gt: fromDateTime, $lte: toDateTime } }
            ]
        }).exec();

        // Combine both existing tasks and bookings
        const existingEvents = existingTasks.concat(existingBookings);
        console.log(existingEvents.length);
        // If there are no existing events, the therapist is available
        return existingEvents.length === 0;
    } catch (error) {
        console.error('Error checking therapist availability:', error);
        throw new Error('Error checking therapist availability');
    }
  }
}

module.exports = therapistServices;