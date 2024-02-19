const db = require('../config/db');
const mongoose = require("mongoose");
const UserModel = require("../models/user.model")
const BookingModel = require("../models/booking.model")
const { Schema } = mongoose;

const payment = new Schema({
            userId: {
                type: Schema.Types.ObjectId,
                ref: UserModel.modelName,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            currency: {
                type: String,
                default: 'RM',
            },
            paymentMethod: {
                type: String,
                required: true,
            },
            transactionId: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                default: 'succeeded',
            },
        }, {
            toJson: {
                transform: function(doc, ret){
                    ret.paymentId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                },
            },
        },
        { 
            timestamps: true 
        });

const PaymentModel = mongoose.model('payment', payment);

module.exports = PaymentModel;
