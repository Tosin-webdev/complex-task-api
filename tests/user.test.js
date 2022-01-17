const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const User = require("../src/models/user");
const jwt = require("jsonwebtoken");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  name: "feal",
  email: "feal@gmail.com",
  password: "comeonboys",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

// beforeEach(async () => {
//   // console.log("beforeEach");
//   await User.deleteMany();
//   await new User(userOne).save();
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });
// afterEach(() => {
//   console.log("afterEach");
// });

test("should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Andrew",
      email: "pet@gmail.com",
      password: "indeed01",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("should not login non existence user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "skjdnkjfme",
    })
    .expect(400);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});
