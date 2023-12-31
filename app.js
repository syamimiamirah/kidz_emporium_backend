const express = require('express');
const body_parser = require('body-parser');
const userRouter = require('./routes/user.routes');
const reminderRouter = require('./routes/reminder.routes');
const childRouter = require('./routes/child.routes');

const app = express();

app.use(body_parser.json());
app.use('/',userRouter);
app.use('/', reminderRouter);
app.use('/', childRouter);

module.exports = app;
