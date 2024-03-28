const bookingServices = require('../services/booking.services');
const therapistServices = require('../services/therapist.services');
const { DateTime } = require('luxon');


// exports.createBooking = async (req, res, next) => {
//   try {
//     const {userId, therapistId, childId, startTime, endTime, status, paymentId} = req.body;
//     let booking = await bookingServices.createBooking(userId, therapistId, childId, startTime, endTime, status, paymentId);
//     res.json({status: true, success: booking});

//   } catch (error) {
//     next(error);
//   }
// }

exports.createBooking = async (req, res, next) => {
  try {
    const { userId, service, therapistId, childId, fromDate, toDate, paymentId } = req.body;
    console.log('Request Body:', req.body);


    console.log('Parsed fromDate:', fromDate);
    console.log('Parsed toDate:', toDate);
    console.log("TherapistId:", therapistId);

    const fromDateObj = DateTime.fromISO(fromDate, { zone: 'utc' });
    const toDateObj = DateTime.fromISO(toDate, { zone: 'utc' });
    console.log('adjustedFromDate:', fromDateObj.toISO());
      console.log('adjustedToDate:', toDateObj.toISO());

    // Check therapist availability before creating the booking
    /*const isAvailable = await therapistServices.isTherapistAvailable(therapistId, fromDateObj, toDateObj);

    if (!isAvailable) {
      return res.status(200).json({ status: false, error: 'Therapist is not available during the specified time range' });
    }*/

    // If therapist is available, proceed with creating the booking
    let booking = await bookingServices.createBooking(userId, service, therapistId, childId, fromDate, toDate, paymentId);
    res.json({ status: true, success: booking });

  } catch (error) {
    next(error);
  }
}

exports.getAllBookings = async (req, res, next) => {
    try {
        const allBooking = await bookingServices.getAllBooking();
        res.json({ status: true, success: allBooking });
    } catch (error) {
        console.error('Error fetching all booking:', error);
        return res.status(500).json({ status: false, error: 'Error fetching all booking' });
    }
};

exports.getBooking = async (req, res, next) => {
  try{
      const userId = req.query.userId;
      let booking = await bookingServices.getBooking(userId);
      res.json({ status: true, success: booking});
  }catch(error){
      next(error);
  }
}

exports.getBookingDetails = async (req, res, next) => {
  try{
      const { id } = req.params;
      let bookingDetails = await bookingServices.getBookingDetails(id);

      if(!bookingDetails){
          return res.status(404).json({status: false, error: "Booking not found!"});
      }
      res.json({status: true, success: bookingDetails});
  }catch(error){
      console.error('Error fetching booking details:', error);
      return res.status(500).json({ status: false, error: 'Error fetching booking details' });
  }
}

exports.deleteBooking = async (req, res, next) => {
  try{
      const { id } = req.body;
      let deletedBooking = await bookingServices.deleteBooking(id);

      if (!deletedBooking) {
          return res.status(404).json({ status: false, error: 'Booking not found' });
      }
      return res.json({status: true, success: "Booking deleted successfully"});
  } catch(error){
      console.error('Error deleting booking:', error);
      return res.status(500).json({ status: false, error: 'Error deleting booking' });
  }
}

exports.updateBooking = async (req, res, next) => {
  try {
      const bookingId = req.params.id;
      const updatedData = req.body.updatedData;
      const updatedBooking = await bookingServices.updateBooking(bookingId, updatedData);
      res.json({ status: true, success: updatedBooking });
  } catch (error) {
    console.error('Error updating booking:', error);
    return res.status(500).json({ status: false, error: 'Error updating booking' });
  }
}