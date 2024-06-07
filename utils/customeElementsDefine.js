//reqrittes the define function on customElements so we can track all existing elements and their attributes
import { getAllIndexes, convertToRightType } from './extraFunctions.js';

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
    let i, obj = {};

    if(con.includes('static observedAttributes')) { // extract battributes
        con = con.substring(con.indexOf('static observedAttributes = ['), con.indexOf(']'));
        con = con.replaceAll('static observedAttributes = [','').replace(/[ '"`]+/g, '').split(',');

        for(i of con) {
          obj[i] = 'all';
        }

        return extractAttributeTypes(constructor, obj);
    }

    return {};
}

function extractAttributeTypes (constructor, attributes) {
  let con = String(constructor); // turn to string to extract attributes
  let i, j;

  if(con.includes('doAttributeCheck')) { // extract attributes types
    for(i of getAllIndexes(con, 'doAttributeCheck')) {
      j = con.substring(i, con.length - 1);
      j = j.replace('doAttributeCheck(','');
      j = j.substring(0, j.indexOf(')')).replace(/[ '"`]+/g, '');
      j = j.split(',');

      attributes[j[1]] = j[0];
    }

      return attributes;
  }
}

function doAttributeCheck(type, name, value) { //used in the attributeChangedCallback. check if the typeof mathes the type (e.g. boolean, number, string etc). Not needed if all types are allowed
  type = type.toLowerCase();
  let newValue = convertToRightType(value);

  if(value == 'null') {
    return false;
  }

  if(typeof newValue != type) {
    console.error('Using incorrect attribute type .\n Use ' + type + ' instead of ' + typeof newValue + ' for the ' + name + ' attribute. \nUsed value ' + value);
  }

  return typeof value != type; //returs true if it doesnt match
}

function getListOfElements() {
    return existingCustomElements;
}

export { registry, getListOfElements, doAttributeCheck }