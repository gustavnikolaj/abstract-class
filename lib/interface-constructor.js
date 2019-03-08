module.exports = function interfaceConstructor(instanceRef, interfaceRef) {
  if (instanceRef.constructor === interfaceRef) {
    throw new Error(`You may not instantiate ${interfaceRef.name} directly.`);
  }

  const instanceProto = Object.getPrototypeOf(instanceRef);
  const instanceProps = Object.getOwnPropertyNames(instanceProto).filter(
    key => key !== "constructor" && typeof instanceProto[key] === "function"
  );

  const interfaceProps = Object.getOwnPropertyNames(
    interfaceRef.prototype
  ).filter(
    key =>
      key !== "constructor" && typeof interfaceRef.prototype[key] === "function"
  );

  for (const prop of interfaceProps) {
    if (!instanceProps.includes(prop)) {
      const instanceName = instanceRef.constructor.name;
      const interfaceName = interfaceRef.name;
      throw new Error(
        `${instanceName} does not implement ${prop} method from ${interfaceName}.`
      );
    }
  }
};
