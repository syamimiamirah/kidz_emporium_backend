const db = require('../config/db');
const mongoose = require('mongoose');
const UserModel = require("./user.model");
const { Schema } = mongoose;

const livestream = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    url: {
        type: String,
        required: true
    },
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'booking',
        required: true,
    }
},
{
    timestamps: true
});

const LivestreamModel = mongoose.model('livestream', livestream);
module.exports = LivestreamModel;