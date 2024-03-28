const db = require('../config/db');
const mongoose = require("mongoose");
const UserModel = require('../models/user.model');
const BookingModel = require('../models/booking.model');
const TherapistModel= require('../models/therapist.model');
const ChildModel = require('../models/child.model');
const { Schema } = mongoose;

const report = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    reportTitle:{
        type:String,
        required: true
    },
    reportDescription:{
        type:String,
        required: true
    },
    bookingId:{
        type: Schema.Types.ObjectId,
        ref: 'booking',
        required: true,
    },
    childId:{
        type: Schema.Types.ObjectId,
        ref: 'child',
        required: true,
    },

}, 
// {
//     toJSON: {
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

const ReportModel = mongoose.model('report', report);
module.exports = ReportModel;