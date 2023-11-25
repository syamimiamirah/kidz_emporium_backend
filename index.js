const express = require("express");
const app = require('./app');
const {MONGO_DB_CONFIG} = require('./config/db');
const mongoose = require("mongoose");
const UserModel = require('./models/user.model');
const ReminderModel = require('./models/reminder.model');
const errors = require("./middlewares/errors");
const swaggerUI = require("swagger-ui-express"), swaggerDocument = require("./swagger.json");
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


app.get('/', (req, res)=>{
    res.send("hello world!")
});

app.listen(port,()=>{
    console.log(`Server listening on port http://localhost:${port}`);
});



