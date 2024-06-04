//reqrittes the define function on customElements so we can track all existing elements and their attributes

let existingCustomElements = [];

let customElementsRegistry = window.customElements;
const registry = {};

registry.define = function(name, constructor, options) { // create custom registry
  if (!Object.keys(existingCustomElements).includes(name)) {

    existingCustomElements[name] = { // add custome element information to an object that can be read
        name: name,
        attributes: extractAttributes(constructor)
    }

    customElementsRegistry.define(name, constructor, options); // define custom element like you would do normally
  }
};

function extractAttributes (constructor) {
    let con = String(constructor); // turn to string to extract attributes

    let attributes = [];

    if(con.includes('static observedAttributes')) {
        console.log(con.substring(con.indexOf('static observedAttributes = '), con.indexOf(']')).split(','))
    }

    return attributes;
}

export { registry }