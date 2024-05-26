// notificationService.js

const admin = require('firebase-admin');
const UserModel = require("../models/user.model");
const BookingModel = require('../models/booking.model');

const sendNotification = async (bookingId, message) => {
  try {
    // Retrieve booking from MongoDB based on the booking ID
    const booking = await BookingModel.findById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    // Retrieve user from MongoDB based on the userId in the booking
    const user = await UserModel.findById(booking.userId);

    if (!user || !user.fcmToken) {
      throw new Error('User not found or FCM token not available');
    }

    // Create the notification message
    const notificationMessage = {
      notification: {
        title: message.title,
        body: message.body,
      },
      data: {
        bookingId: bookingId, // Include the bookingId in the data payload
      },
      token: user.fcmToken,
    };

    // Send the notification using FCM
    const response = await admin.messaging().send(notificationMessage);
    console.log('Successfully sent notification:', response);

    // Log response details
    console.log('FCM response:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};



// const sendNotification = async (userId, message) => {
//   try {
//     // Retrieve user from MongoDB
//     const user = await userModel.findById({_id: userId});
//     //return user;
//     if (!user || !user.fcmToken) {
//       throw new Error('User or FCM token not found');
//     }

//     // Create the notification message
//     const notificationMessage = {
//       notification: {
//         title: message.title,
//         body: message.body,
//       },
//       token: user.fcmToken,
//     };

//     // Send the notification using FCM
//     const response = await admin.messaging().send(notificationMessage);
//     console.log('Successfully sent notification:', response);
//   } catch (error) {
//     console.error('Error sending notification:', error);
//   }
// };

const notifyUsersOfRescheduledAppointments = async () => {
    try {
      // Find users with appointments that need rescheduling
      const users = await User.find({ 'booking.statusBooking': 'Rejected' });
  
      for (const user of users) {
        const message = {
          title: 'Appointment Rescheduling',
          body: 'Your appointment needs to be rescheduled. Please check the app for details.',
        };
        await sendNotification(user._id, message);
      }
    } catch (error) {
      console.error('Error notifying users of rescheduled appointments:', error);
    }
  };
  
  module.exports = {
    sendNotification,
    notifyUsersOfRescheduledAppointments,
  };