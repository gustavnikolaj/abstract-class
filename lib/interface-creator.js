const interfaceConstructor = require("./interface-constructor");

module.exports = function interfaceCreator(interfaceRef) {
  return class extends interfaceRef {
    constructor() {
      super();
      interfaceConstructor(this, interfaceRef);
    }
  };
};
