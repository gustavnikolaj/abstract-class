const expect = require("unexpected");
const quackCheck = require("../lib/quack-check");

it("should be a function", () => {
  expect(quackCheck, "to be a function");
});

it("should complain about an object with a missing method", () => {
  expect(
    () =>
      quackCheck(
        {},
        class {
          get() {}
        }
      ),
    "to throw",
    "Object does not implement get method."
  );
});

it("should not complain about an object with a required method 1", () => {
  expect(
    () =>
      quackCheck(
        { get() {} },
        class {
          get() {}
        }
      ),
    "not to throw"
  );
});

it("should not complain about an object with a required method 2", () => {
  expect(
    () =>
      quackCheck(
        { get: () => {} },
        class {
          get() {}
        }
      ),
    "not to throw"
  );
});

it("should work when verifying against an actual implementation", () => {
  class Logger {
    log(...args) {
      console.log(...args);
    }

    info(...args) {
      console.log(...args);
    }

    error(...args) {
      console.error(...args);
    }
  }

  const mockLoggerForTests = {
    log: () => {},
    info: () => {},
    error: () => {}
  };

  expect(() => quackCheck(mockLoggerForTests, Logger), "not to throw");
});
