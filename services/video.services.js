const videoModel = require('../models/video.model');
const mongoose = require("mongoose");

class videoServices{
    static async createVideo(userId, videoTitle, videoDescription, childId, filePath) {
        try {
            const createVideo = new videoModel({ userId, videoTitle, videoDescription, childId, filePath });
            return await createVideo.save();
        } catch (error) {
            console.error('Error creating video:', error);
            throw error;
        }
    }
    

    static async getVideo(userId, videoTitle, videoDescription, filePath){
        const getVideo = await videoModel.find({userId});
        return getVideo;
    }

    static async getVideoDetails(id){
        try{
            const videoDetails = await videoModel.findById({_id: id});
            return videoDetails;
        }catch(error){
            console.error('Error fetching video details:', error);
            throw error;
        }
    }

    static async deleteVideo(id){
        const deletedVideo = await videoModel.findOneAndDelete({_id:id});

        if(!deletedVideo){
            throw new Error("Video not found");
        }
        return deletedVideo;
    }

    static async updateVideo(id, updatedData) {
        try {
            console.log('updatedData:', updatedData);
          // Check if the reminder exists
          const updatedVideo = await videoModel.findOneAndUpdate(
            {_id:id},
            {$set: { videoTitle: updatedData.videoTitle, videoDescription: updatedData.videoDescription, childId: updatedData.childId, filePath: updatedData.filePath}},
            { new: true } // Return the updated document
          );
      
          return updatedVideo;
        } catch (error) {
          console.error(`Error updating video: ${error.message}`);
          throw error;
        }
      }

    static async getAllVideos() {
        try {
            const allVideos = await videoModel.find();
            return allVideos;
        } catch (error) {
            console.error('Error fetching all videos:', error);
            throw error;
        }
    }

      
}
module.exports = videoServices;