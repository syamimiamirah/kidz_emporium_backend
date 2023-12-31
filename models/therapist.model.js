const db = require('../config/db');
const mongoose = require("mongoose");
const UserModel = require("../models/user.model")
const { Schema } = mongoose;

const therapist = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: UserModel.modelName
        },
        therapistName: {
            type:String,
            required: true
        },
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

    }, {
        toJson: {
            transform: function(doc, ret){
                ret.therapistId = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            },
        },
    },
    {
        timestamps: true
    });

const TherapistModel = mongoose.model('therapist', therapist);
module.exports = TherapistModel;