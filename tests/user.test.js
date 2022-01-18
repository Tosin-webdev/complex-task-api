const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const User = require("../src/models/user");
const jwt = require("jsonwebtoken");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

// afterAll(async () => {
//   await mongoose.connection.close();
// });
// afterEach(() => {
//   console.log("afterEach");
// });

test("should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "david",
      email: "david@gmail.com",
      password: "generality",
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.tobeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "david",
      email: "david@gmail.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("generality");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  // extra
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
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

test("Should not get Profile for unauthorized user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("should not delete account for unauthenticate user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/pari.jpg")
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Jess",
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Jess");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Philadelphia",
    })
    .expect(400);
});
