const db = require('../config/db');
const mongoose = require("mongoose");
const UserModel = require("../models/user.model")
const { Schema } = mongoose;

const child = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: UserModel.modelName
        },
        childName: {
            type:String,
            required: true
        },
        birthDate: {
            type: Date,
            required: true
        },
        gender: {
            type:String,
            required: true
        },
        program: {
            type: String,
            required: true
        },
    },
    //  {
    //     toJson: {
    //         transform: function(doc, ret){
    //             ret.childId = ret._id.toString();
    //             delete ret._id;
    //             delete ret.__v;
    //         },
    //     },
    // },
    {
        timestamps: true
    });

const ChildModel = mongoose.model('child', child);
module.exports = ChildModel;