const expect = require("unexpected");
const interfaceConstructor = require("../lib/interface-constructor");

it("should be a function", () => {
  expect(interfaceConstructor, "to be a function");
});

it("should prevent instantiating an interface", () => {
  class Interface {
    constructor() {
      interfaceConstructor(this, Interface);
    }
  }

  expect(
    () => new Interface(),
    "to throw",
    "You may not instantiate Interface directly."
  );
});

it("should allow instantiating instantiating a subclass", () => {
  class Interface {
    constructor() {
      interfaceConstructor(this, Interface);
    }
  }

  class Implementation extends Interface {}

  expect(() => new Implementation(), "not to throw");
});

it("should complain if not all methods on the interface is implemented", () => {
  class Interface {
    constructor() {
      interfaceConstructor(this, Interface);
    }

    get() {}
  }

  class Implementation extends Interface {}

  expect(
    () => new Implementation(),
    "to throw",
    "Implementation does not implement get method from Interface."
  );
});

it("should not complain if all methods on the interface is implemented", () => {
  class Interface {
    constructor() {
      interfaceConstructor(this, Interface);
    }

    get() {}
  }

  class Implementation extends Interface {
    get() {}
  }

  expect(() => new Implementation(), "not to throw");
});

it("should pass instance of checks", () => {
  class Interface {
    constructor() {
      interfaceConstructor(this, Interface);
    }
  }

  class Implementation extends Interface {}

  expect(new Implementation(), "to be an", Interface);
});
