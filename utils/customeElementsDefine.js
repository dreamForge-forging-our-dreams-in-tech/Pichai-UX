//reqrittes the define function on customElements so we can track all existing elements and their attributes

let existingCustomElements = {};

let customElementsRegistry = window.customElements;
const registry = {};

registry.define = function(name, constructor, options) { // create custom registry
  if (!Object.keys(existingCustomElements).includes(name)) {

    existingCustomElements[name] = { // add custom element information to an object that can be read
        name: name,
        attributes: extractAttributes(constructor)
    }

    customElementsRegistry.define(name, constructor, options); // define custom element like you would do normally
  }
};

function extractAttributes (constructor) {
    let con = String(constructor); // turn to string to extract attributes

    if(con.includes('static observedAttributes')) { // extract battributes
        con = con.substring(con.indexOf('static observedAttributes = ['), con.indexOf(']'));
        con = con.replaceAll('static observedAttributes = [','').split(',');

        return con;
    }

    return {};
}

function getListOfElements() {
    return existingCustomElements;
}

export { registry, getListOfElements }