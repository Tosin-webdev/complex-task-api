const express = require("express");
require("./src/db/mongoose");
const userRouter = require("./src/routes/user");
const taskRouter = require("./src/routes/task");
// const { findById } = require("./src/models/user");
const app = express();

// parse incoming json request
app.use(express.json());
// load routes
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
