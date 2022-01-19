const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
// const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "kingfrosh11",
  email: "kingfrosh11@gmail.com",
  password: "comeonboys",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

// const userTwoId = new mongoose.Types.ObjectId();
// const userTwo = {
//   _id: userTwoId,
//   name: "Baller",
//   email: "Baller@gmail.com",
//   password: "gunners01",
//   tokens: [
//     {
//       token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
//     },
//   ],
// };

// const taskOne = {
//   _id: new mongoose.Types.ObjectId(),
//   description: "My first Task",
//   completed: true,
//   owner: userOne._id,
// };

// const taskTwo = {
//   _id: new mongoose.Types.ObjectId(),
//   description: "My second Task",
//   completed: false,
//   owner: userOne._id,
// };

// const taskThree = {
//   _id: new mongoose.Types.ObjectId(),
//   description: "My third Task",
//   completed: false,
//   owner: userTwo.id,
// };
const setupDatabase = async () => {
  await User.deleteMany();
  // await Task.deleteMany();
  await new User(userOne).save();
  // await new User(userTwo).save();
  // await new Task(taskOne).save();
  // await new Task(taskTwo).save();
  // await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  // userTwoId,
  // userTwo,
  // taskOne,
  // taskTwo,
  // taskThree,
  setupDatabase,
  // setupDatabase,
};
