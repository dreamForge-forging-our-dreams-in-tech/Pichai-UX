//reqrittes the define function on customElements so we can track all existing elements and their attributes

let existingCustomElements = [];

let customElementsRegistry = window.customElements;
const registry = {};

registry.define = function(name, constructor, options) { // create custom registry
  if (!Object.keys(existingCustomElements).includes(name)) {
    console.log(constructor);

    existingCustomElements[name] = { // add custome element information to an object that can be read
        name: name
    }

    customElementsRegistry.define(name, constructor, options); // define custom element like you would do normally
  }
};

export { registry }