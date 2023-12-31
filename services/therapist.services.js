const therapistModel = require('../models/therapist.model');
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
}

module.exports = therapistServices;