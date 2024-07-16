const db = require('../config/db');
const mongoose = require("mongoose");
const UserModel = require("../models/user.model")
const { Schema } = mongoose;

const reminder = new Schema({
            userId: {
                type: Schema.Types.ObjectId,
                ref: UserModel.modelName
            }, 
            eventName: {
                type:String,
                required: true
            },
            details: {
                type: String,
                required: true
            },
            fromDate: {
                type: Date,
                required: true
            },
            toDate: {
                type: Date,
                required: true
            },
            notificationsSent: { 
                type: [Date], 
                default: [] },
        }, 
        // {
        //     toJson: {
        //         transform: function(doc, ret){
        //             ret.calendarId = ret._id.toString();
        //             delete ret._id;
        //             delete ret.__v;
        //         },
        //     },
        // },
        {
            timestamps: true
        });

const ReminderModel = mongoose.model('reminder', reminder);
module.exports = ReminderModel;

