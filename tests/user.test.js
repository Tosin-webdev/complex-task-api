const request = require("supertest");
const app = require("../index");

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Andrewin",
      email: "andrew@placde.com",
      password: "MyPass777tru!",
    })
    .expect(201);
});
