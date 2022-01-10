const {
  sum,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../src/math");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("expect temperature in fahrenheit", () => {
  expect(fahrenheitToCelsius(5)).toBe(-15);
});

test("expect temperature in celsius", () => {
  expect(celsiusToFahrenheit(5)).toBe(41);
});

test("Async test demo", (done) => {
  setTimeout(() => {
    expect(2).toBe(2);
    done();
  }, 2000);
});

test("Should add two numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test("Should add two numbers async/await", async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});
