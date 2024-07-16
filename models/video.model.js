const db = require('../config/db');
const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const { Schema } = mongoose;

const video = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    videoTitle: {
        type:String,
        required: true
    },
    videoDescription: {
        type:String,
        required: true
    },
    childId: [{
        type: Schema.Types.ObjectId,
        ref: 'child',
        required: true,
    }],
    filePath: {
        type:String,
        required: true
    },
    thumbnail: {
        type:String,
        required: true
    },

},{
    timestamps: true
});
const VideoModel = mongoose.model('video', video);
module.exports = VideoModel;