const expect = require("unexpected");
const interfaceCreator = require("../lib/interface-creator");

it("should complain about missing methods", () => {
  const Interface = interfaceCreator(
    class Interface {
      get() {}
    }
  );

  class Implementation extends Interface {}

  expect(
    () => new Implementation(),
    "to throw",
    "Implementation does not implement get method from Interface."
  );
});
