const fs = require('fs');
const path = require('path');

const videoServices = require("../services/video.services");

// Route handler for uploading videos
exports.createVideo = async (req, res, next) => {
    try {
        const { userId, videoTitle, videoDescription, childId, filePath, thumbnail} = req.body;
        let video = await videoServices.createVideo(userId, videoTitle, videoDescription, childId, filePath, thumbnail);
        res.json({ status: true, success: video });
        
    } catch (error) {
        console.error('Error creating video:', error);
        return res.status(500).json({ status: false, error: 'Failed to create video' });
    }
};

exports.getVideo = async (req, res, next) => {
    try{
        const userId = req.query.userId;
        let video = await videoServices.getVideo(userId);
        res.json({ status: true, success: video});
    }catch(error){
        next(error);
    }
}

exports.getVideoDetails = async (req, res, next) => {
    try{
        const { id } = req.params;
        let videoDetails = await videoServices.getVideoDetails(id);
        if(!videoDetails){
            return res.status(404).json({status: false, error: 'Video not found!'});
        }
        return res.json({status: true, success: videoDetails});
    }catch(error){
        console.error('Error fetching video details: ', error);
        return res.status(500).json({status: true, error: 'Error fetching video details' });
    }
}

exports.deleteVideo = async (req, res, next) =>{
    try{
        const { id } = req.body;
        let deletedVideo = await videoServices.deleteVideo(id);

        if (!deletedVideo) {
            return res.status(404).json({ status: false, error: 'Video not found' });
        }
        return res.json({status: true, success: "Video deleted successfully"});
    } catch(error){
        console.error('Error deleting video:', error);
        return res.status(500).json({ status: false, error: 'Error deleting video' });
    }
}

exports.updateVideo = async (req, res, next) => {
    try {
        const videoId = req.params.id;
        const updatedData = req.body;
        const updatedVideo = await videoServices.updateVideo(videoId, updatedData);
        res.json({ status: true, success: updatedVideo });
    } catch (error) {
      console.error('Error updating video:', error);
      return res.status(500).json({ status: false, error: 'Error updating video' });
    }
}

exports.getAllVideos = async (req, res, next) => {
    try {
        const allVideos = await videoServices.getAllVideos();
        res.json({ status: true, success: allVideos });
    } catch (error) {
        console.error('Error fetching all videos:', error);
        return res.status(500).json({ status: false, error: 'Error fetching all videos' });
    }
};