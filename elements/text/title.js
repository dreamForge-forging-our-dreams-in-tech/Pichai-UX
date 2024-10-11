import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

// Create a class for the element
class title extends HTMLElement {
            /** @description 
    * The x-title element dispalys the currents page title or custom set text.
    */

    /** @usage 
     * Displaying site title
    */

    static observedAttributes = ["title"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {

        let interval;
        if(!this.hasAttribute('titleText') || this.getAttribute('titleText') === '') {
            interval = window.setInterval(() => {
                this.innerHTML = document.title;
            },500);
        } else {
            clearInterval(interval);
            this.innerHTML = this.getAttribute('titleText');
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('string', 'titleText', this.getAttribute('titleText'));

        this.connectedCallback();
    }
}

registry.define("x-title", title);