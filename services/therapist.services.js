const therapistModel = require('../models/therapist.model');
const bookingModel = require('../models/booking.model');
const { DateTime } = require('luxon');
const mongoose = require("mongoose");

class therapistServices{
    static async createTherapist(userId, therapistName, hiringDate, specialization, aboutMe){
        const createTherapist = new therapistModel({userId, therapistName, hiringDate, specialization, aboutMe});
        return await createTherapist.save();
    }

    static async getTherapist(userId, eventName, details, fromDate, toDate){
        const getTherapist = await therapistModel.find({userId});
        return getTherapist;
    }

    static async updateTherapist(id, updatedData) {
        try {
          // Check if the reminder exists
          const updatedTherapist = await therapistModel.findOneAndUpdate(
            {_id:id},
            {$set: { therapistName: updatedData.therapistName, hiringDate: updatedData.hiringDate, specialization: updatedData.specialization, aboutMe: updatedData.aboutMe}},
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

    static async getTherapistDetails(id) {
        try {
            const therapistDetails = await therapistModel.findById({_id: id});
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

  static async isTherapistAvailable(therapistId, startTime, endTime) {
    try {
      // Find the therapist by ID
      const therapist = await therapistModel.findById({ _id: therapistId }).exec();
  
      if (!therapist) {
        throw new Error('Therapist not found');
      }
      console.log(startTime);
      // Convert dates to Luxon DateTime objects and ensure they are in UTC
      const fromDateTime = DateTime.fromISO(startTime, { zone: 'utc' });
      const toDateTime = DateTime.fromISO(endTime, { zone: 'utc' });
  
      console.log('adjustedFromDate:', fromDateTime.toISO());
      console.log('adjustedToDate:', toDateTime.toISO());
  
      // Check for existing bookings within the specified date and time range
      const existingBookings = await bookingModel.find({
        therapistId: therapistId,
        $or: [
            {
                startTime: { $lt: toDateTime.toJSDate() },
                endTime: { $gt: fromDateTime.toJSDate() },
            },
            {
                startTime: { $gte: fromDateTime.toJSDate(), $lt: toDateTime.toJSDate() },
            },
            {
                endTime: { $gt: fromDateTime.toJSDate(), $lte: toDateTime.toJSDate() },
            },
        ],
    }).exec();

    console.log(existingBookings.length)
    // If there are no existing bookings, the therapist is available
    return existingBookings.length === 0;
    } catch (error) {
      console.error('Error services checking therapist availability:', error);
      throw new Error('Error checking therapist availability');
    }
  }
}

module.exports = therapistServices;