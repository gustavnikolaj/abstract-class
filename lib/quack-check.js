module.exports = function quackCheck(instance, spec) {
  const methods = Object.getOwnPropertyNames(spec.prototype).filter(
    key => key !== "constructor" && typeof spec.prototype[key] === "function"
  );

  const instanceProps = Object.getOwnPropertyNames(instance).filter(
    key => key !== "constructor" && typeof instance[key] === "function"
  );

  for (const method of methods) {
    if (!instanceProps.includes(method)) {
      const instanceName = instance.constructor.name;
      throw new Error(`${instanceName} does not implement ${method} method.`);
    }
  }
};
