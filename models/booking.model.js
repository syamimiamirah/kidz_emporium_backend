const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const TherapistModel = require("../models/therapist.model");
const ChildModel = require("../models/child.model");
const PaymentModel = require('../models/payment.model');
const { Schema } = mongoose;

// Define the Booking Schema
const booking = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: true
    },
    service: {
        type: String,
        required: true,
    },
    therapistId: {
        type: Schema.Types.ObjectId,
        ref: 'therapist',
        default: null // Default value is null
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
        ref: PaymentModel.modelName,
        required: function() {
            return this.service !== "Screening Session"; // Payment is required if the service is not Screening Session
        },
        default: null // Default value is null
    },
    statusBooking: {
        type: String,
        required: true, // Default value is null
    },
}, {
    timestamps: true 
});

// Create Booking model using the schema
const BookingModel = mongoose.model('booking', booking);

// Export the Booking model
module.exports = BookingModel;
