const db = require('../config/db');
const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const BookingModel = require("../models/booking.model");
const { Schema } = mongoose;

const therapist = new Schema({
        therapistId: {
            type: Schema.Types.ObjectId,
            ref: UserModel.modelName, // Assuming UserModel is the model for users
            required: true
        },
        // therapistName: {
        //     type:String,
        //     required: true
        // },
        hiringDate: {
            type: Date,
            required: true
        },
        specialization: {
            type: String,
            required: true
        },
        aboutMe: {
            type: String,
            required: true
        },
        bookings: {
            type: Schema.Types.ObjectId,
            ref: 'booking'
        },
        managedBy: {
            type: Schema.Types.ObjectId,
            ref: UserModel.modelName 
        }

    },
    //  {
    //     toJson: {
    //         transform: function(doc, ret){
    //             ret.therapistId = ret._id.toString();
    //             delete ret._id;
    //             delete ret.__v;
    //         },
    //     },
    // },
    {
        timestamps: true
    });

const TherapistModel = mongoose.model('therapist', therapist);
module.exports = TherapistModel;