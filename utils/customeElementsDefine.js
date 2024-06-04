//reqrittes the define function on customElements so we can track all existing elements and their attributes

let existingCustomElements = [];

let customElementsRegistry = window.customElements;
const registry = {};

registry.define = function(name, constructor, options) { // create custom registry
  if (!Object.keys(existingCustomElements).includes(name)) {
    console.log(constructor);

    existingCustomElements[name] = { // add custome element information to an object that can be read
        name: name,
        attributes: extractAttributes(constructor)
    }

    customElementsRegistry.define(name, constructor, options); // define custom element like you would do normally
  }
};

function extractAttributes (constructor) {
    let attributes = [];

    if(constructor.includes('static observedAttributes')) {
        console.log(constructor.substring(constructor.indexOf('static observedAttributes = '), 100))
    }

    return attributes;
}

export { registry }