const paymentModel = require('../models/payment.model');
const mongoose = require("mongoose");

class paymentServices{
    static async createPayment(userId, amount, currency, paymentMethod, transactionId, status){
        const createPayment = new paymentModel({userId, amount, currency, paymentMethod, transactionId, status});
        return await createPayment.save();
    }
    

    static async getPayment(userId, amount, currency, paymentMethod, transactionId, status){
        const getPayment = await paymentModel.find({userId});
        return getPayment;
    }

    static async getPaymentDetails(id){
        try{
            const paymentDetails = await paymentModel.findById({_id: id});
            return paymentDetails;
        }catch(error){
            console.error('Error fetching payment details:', error);
            throw error;
        }
    }

    static async deletePayment(id){
        const deletedPayment = await paymentModel.findOneAndDelete({_id:id});

        if(!deletedPayment){
            throw new Error("Payment not found");
        }
        return deletedPayment;
    }

    static async updatePayment(id, updatedData) {
        try {
          // Check if the reminder exists
          const updatedPayment = await paymentModel.findOneAndUpdate(
            {_id:id},
            {$set: { amount: updatedData.amount, currency: updatedData.currency, paymentMethod: updatedData.paymentMethod, transactionId: updatedData.transactionId, status: updatedData.status}},
            { new: true } // Return the updated document
          );
      
          return updatedPayment;
        } catch (error) {
          console.error(`Error updating payment: ${error.message}`);
          throw error;
        }
      }

    static async getAllPayment() {
        try {
            const allPayment = await paymentModel.find();
            return allPayment;
        } catch (error) {
            console.error('Error fetching all payment:', error);
            throw error;
        }
    }

      
}
module.exports = paymentServices;