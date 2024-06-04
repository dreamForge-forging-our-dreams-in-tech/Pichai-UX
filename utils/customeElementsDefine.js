//reqrittes the define function on customElements so we can track all existing elements and their attributes

let existingCustomElements = [];

let customElementsRegistry = window.customElements;
const registry = {};
registry.define = function(name, constructor, options) {
    console.log(name);
  if (existingCustomElements.includes(name)) {
    console.log(name);

    existingCustomElements.push(name);
    customElementsRegistry.define(name, constructor, options);
  }
};

export { registry }