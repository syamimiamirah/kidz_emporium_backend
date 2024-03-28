const db = require('../config/db');
const mongoose = require("mongoose");
const UserModel = require("../models/user.model")
const TherapistModel = require("../models/therapist.model")
const ChildModel = require("../models/child.model")
const PaymentModel = require('../models/payment.model')
const { Schema } = mongoose;


// Define the Booking Schema
const booking = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: UserModel.modelName
        },
        service: {
            type: String, 
            required: true,
        },
        therapistId: {
            type: Schema.Types.ObjectId,
            ref: 'therapist',
            required: true,
        },
        childId: {
            type: Schema.Types.ObjectId,
            ref: 'child',
            required: true,
        },
        fromDate: {
            type: Date,
            required: true,
        },
        toDate: {
            type: Date,
            required: true,
        },
        paymentId: {
            type: Schema.Types.ObjectId,
            ref: PaymentModel.modelName
        },
        }, 
        // {
        //     toJson: {
        //         transform: function(doc, ret){
        //             ret.bookingId = ret._id.toString();
        //             delete ret._id;
        //             delete ret.__v;
        //         },
        //     },
        // },
        { 
            timestamps: true 
        });

// Create Booking model using the schema
const BookingModel = mongoose.model('booking', booking);

// Export the Booking model
module.exports = BookingModel;
