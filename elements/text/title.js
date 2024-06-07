import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

// Create a class for the element
class title extends HTMLElement {
    static observedAttributes = ["title"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        this.innerHTML = document.title;

        if(!this.hasAttribute('title') || this.getAttribute('title') === '') {} else {
            this.innerHTML = this.getAttribute('title')
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('string', 'title', newValue);

        this.connectedCallback();
    }
}

registry.define("x-title", title);