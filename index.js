const express = require("express");
const app = require('./app');
const {MONGO_DB_CONFIG} = require('./config/db');
const mongoose = require("mongoose");
const UserModel = require('./models/user.model');
const ReminderModel = require('./models/reminder.model');
const errors = require("./middlewares/errors");
const swaggerUI = require("swagger-ui-express"), swaggerDocument = require("./swagger.json");
const multer = require('multer');
const stripe = require('stripe')('sk_test_51Oaa1OHJ2EAdcao3N47ys1pvDo2VP2YI4wslqtgFt4L0VBL0p7Sj3nD6u4Lg7sx0SXlgbHkqA1XNBQADTlyuAru800SfbiS1mn');

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(
    () =>{
        console.log("Database Connected");
    },
    (error) => {
        console.log("Database Failed "+ error);
    }
);
    
const port = 4000;

app.use(express.json());
app.use("/api", require("./routes/app.routes"));
app.use(errors.errorHandler);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.post('/webhook', (req, res) => {
    // Handle webhook event
    const event = req.body;
    // Process the event
    res.sendStatus(200); // Respond to Stripe with a success status
  });


app.get('/', (req, res)=>{
    res.send("hello world!")
});

app.listen(port,()=>{
    console.log(`Server listening on port http://localhost:${port}`);
});



