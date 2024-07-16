const bookingModel = require('../models/booking.model');

class bookingServices {
  // Create a new booking
  static async createBooking(userId, service, therapistId, childId, fromDate, toDate, paymentId, statusBooking) {
    //create new booking in the database
    const createBooking = new bookingModel({userId, service, therapistId, childId, fromDate, toDate, paymentId, statusBooking});
    return await createBooking.save();
  }

  static async getAllBooking() {
    try {
        const allBooking = await bookingModel.find();// Search all bookings in the database
        return allBooking;
    } catch (error) {
        console.error('Error fetching all booking:', error);
        throw error;
    }
}

static async getBooking(userId){
  const getBooking = await bookingModel.find({userId}); //Find booking based on userId
  return getBooking;
}

static async getBookingDetails(id){
  try{
      const bookingDetails = await bookingModel.findById({_id: id}); //Find booking based on id
      return bookingDetails;
  }catch(error){
      console.error('Error fetching booking details:', error);
      throw error;
  }
}

static async deleteBooking(id){
  const deletedBooking = await bookingModel.findOneAndDelete({_id:id}); //Search booking based on id and delete it

  if(!deletedBooking){
      throw new Error("Booking not found");
  }
  return deletedBooking;
}

static async updateBooking(id, updatedData) {
  try {
    // Check if the reminder exists
    const updatedBooking = await bookingModel.findOneAndUpdate( 
      {_id:id},
      {$set: {service: updatedData.service, therapistId: updatedData.therapistId, childId: updatedData.childId, fromDate: updatedData.fromDate, toDate: updatedData.toDate, statusBooking: updatedData.statusBooking}},
      { new: true } // Return the updated document
    );
    return updatedBooking; //return the updated booking details
  } catch (error) {
    console.error(`Error updating booking: ${error.message}`);
    throw error;
  }
}
}

module.exports = bookingServices;
