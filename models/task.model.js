const db = require('../config/db');
const mongoose = require("mongoose");
const UserModel = require('../models/user.model');
const TherapistModel= require('../models/therapist.model');
const { Schema } = mongoose;

const task = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    taskTitle:{
        type:String,
        required: true
    },
    taskDescription:{
        type:String,
        required: true
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    },
    therapistId:[{
        type: Schema.Types.ObjectId,
        ref: 'therapist',
        required: true,
    }],

 }, 
// {
//     toJSON: {
//         transform: function(doc, ret){
//             ret.taskId = ret._id.toString();
//             delete ret._id;
//             delete ret.__v;
//         },
//     },
// },
{
    timestamps: true
});

const TaskModel = mongoose.model('task', task);
module.exports = TaskModel;