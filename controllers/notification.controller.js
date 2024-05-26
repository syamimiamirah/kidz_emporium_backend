const NotificationService = require('../services/notification.services');
const BookingModel = require('../models/booking.model');

const sendNotification = async (req, res) => {
  try {
    const { bookingId, title, body } = req.body;

    // Send notification using the bookingId
    await NotificationService.sendNotification(bookingId, { title, body });

    res.status(200).send("Notification sent successfully");
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send("Internal Server Error");
  }
};

// const sendNotification = async (req, res) => {
//   try {
//     const { userId, title, body } = req.body;
//     await NotificationService.sendNotification(userId, { title, body });
//     res.status(200).send("Notification sent successfully");
//   } catch (error) {
//     console.error('Error sending notification:', error);
//     res.status(500).send("Internal Server Error");
//   }
// };

const notifyUsersOfRescheduledAppointments = async (req, res) => {
  try {
    await NotificationService.notifyUsersOfRescheduledAppointments();
    res.status(200).send("Notifications sent to users with rescheduled appointments");
  } catch (error) {
    console.error('Error notifying users of rescheduled appointments:', error);
    res.status(500).send("Internal Server Error");
  }
};



module.exports = {
  sendNotification,
  notifyUsersOfRescheduledAppointments,
};
