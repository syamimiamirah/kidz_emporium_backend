const express = require("express");
const app = express(); // Create Express app instance
const { MONGO_DB_CONFIG } = require('./config/db');
const mongoose = require("mongoose");
const UserModel = require('./models/user.model');
const ReminderModel = require('./models/reminder.model');
const errors = require("./middlewares/errors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const multer = require('multer');
const cron = require('node-cron');
const { DateTime } = require('luxon');
const stripe = require('stripe')('sk_test_51Oaa1OHJ2EAdcao3N47ys1pvDo2VP2YI4wslqtgFt4L0VBL0p7Sj3nD6u4Lg7sx0SXlgbHkqA1XNBQADTlyuAru800SfbiS1mn');

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    () => {
        console.log("Database Connected");
    },
    (error) => {
        console.log("Database Failed " + error);
    }
);

// Initialize Firebase Admin SDK
const admin = require('firebase-admin');
// the correct path to service account key file
// uncomment this 
//const serviceAccount = require('./kidz-emporium-7ae9f-firebase-adminsdk-lba0h-ef9198f5e2.json'); 
const { sendNotificationReminder } = require("./services/notification.services");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


cron.schedule('* * * * *', async () => {
  const now = new Date();

  for (let daysBefore = 3; daysBefore >= 1; daysBefore--) {
    const targetDate = new Date();
    targetDate.setDate(now.getUTCDate() + daysBefore);
    targetDate.setUTCHours(0, 0, 0, 0);

    console.log(`Current UTC time: ${now.toISOString()}`);
    console.log(`Target UTC date: ${targetDate.toISOString()} for day ${daysBefore} before`);

    try {
      // Find reminders that need notifications sent out daysBefore from fromDate
      const reminders = await ReminderModel.find({
        fromDate: { $gte: targetDate, $lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000) },
        $or: [
          { notificationsSent: { $exists: false } },
          { notificationsSent: { $size: 0 } },
          { notificationsSent: { $not: { $elemMatch: { $eq: now.toISOString().split('T')[0] } } } }
        ]
      }).populate('userId'); // Join with User model to get user details

      console.log(`Found ${reminders.length} reminders to process for day ${daysBefore} before`);

      // Send notifications for eligible reminders
      for (const reminder of reminders) {
        const user = reminder.userId;

        console.log(`Processing reminder for userId ${user._id} with event "${reminder.eventName}"`);

        // Convert reminder's fromDate to local time for the message
        const fromDateObj = DateTime.fromISO(reminder.fromDate.toISOString(), { zone: 'utc' }); // Convert to user's timezone
        const localFromDateString = fromDateObj.toFormat('h:mm a'); // Format to '2:45 PM'

        const message = {
          title: "Reminder",
          body: `Your ${reminder.eventName} for ${reminder.details} is on ${localFromDateString}`
        };

        try {
          await sendNotificationReminder(user._id, message);

          // Update reminder to mark notification as sent for this specific day
          reminder.notificationsSent.push(now.toISOString().split('T')[0]);
          await reminder.save();
          console.log(`Successfully sent reminder notification for userId ${user._id}:`, message);
          console.log(`Updated reminder for userId ${user._id}:`, reminder);
        } catch (error) {
          console.error(`Failed to send reminder notification for userId ${user._id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error processing reminders:', error);
    }
  }
});

const port = 4000;

app.use(express.json());
app.use("/api", require("./routes/app.routes")); //to use the routes 
app.use(errors.errorHandler);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.post('/webhook', (req, res) => {
    // Handle webhook event
    const event = req.body;
    // Process the event
    res.sendStatus(200); // Respond to Stripe with a success status
});

app.get('/', (req, res) => {
    res.send("hello world!")
});

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`); //use to check the connection to localhost
});
//Handle Firebase Admin SDK initialization error
// admin.auth().listUsers()
//     .then(() => {
//         console.log('Firebase Admin SDK initialized successfully');
//     })
//     .catch((error) => {
//         console.error('Error initializing Firebase Admin SDK:', error);
//     });