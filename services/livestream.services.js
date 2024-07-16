const livestreamModel = require("../models/livestream.model");
const mongoose = require("mongoose");

class livestreamServices{
    static async createLivestream(userId, url, bookingId){
        const createLivestream = new livestreamModel({ userId, url, bookingId});
        return await createLivestream.save();
    }

    static async getLivestream(userId){
        const getLivestream = await livestreamModel.find({userId});
        return getLivestream;
    }

    static async getLivestreamDetailsByBookingId(bookingId) {
        try {
            const livestreamDetails = await livestreamModel.find({bookingId: bookingId});
            return livestreamDetails;
        } catch (error) {
            console.error('Error fetching meeting details:', error);
            throw error;
        }
    }

    static async deleteLivestream(id){
        const deletedLivestream = await livestreamModel.findOneAndDelete({_id: id});

        if(!deletedLivestream){
            throw new Error("Livestream session not found!");
        }
        return deletedLivestream;
    }

    static async updateLivestream(id, updatedData){
        try{
            const updatedLivestream = await livestreamModel.findOneAndUpdate(
                {_id: id}, 
                {$set: { url: updatedData.url}},
                { new: true }
            );
            return updatedLivestream;
        }catch(error){
            console.error("Error updating livestream session: ", error);
            throw error;
        }
    }
    
    static async getLivestreamDetails(id){
        try {
            const livestreamDetails = await livestreamModel.findById({_id: id});
            return livestreamDetails;
        }catch(error){
            console.error("Error fetching livestream details: ", error);
            throw error;
        }
    }

    static async getAllLivestreams() {
        try{
            const allLivestreams = await livestreamModel.find();
            return allLivestreams;
        }catch(error){
            console.error("Error fetching all livestream sessions: ", error);
            throw error;
        }
    }

}

module.exports = livestreamServices;