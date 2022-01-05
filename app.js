const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("./src/middleware/auth");
require("./src/db/mongoose");
const userRouter = require("./src/routes/user");
const taskRouter = require("./src/routes/task");
const Task = require("./src/models/task");
const User = require("./src/models/user");
// const { findById } = require("./src/models/user");
const app = express();
const port = process.env.PORT;

// parse incoming json request
app.use(express.json());
// load routes
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
