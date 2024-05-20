// Create a class for the element
class Accordion extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let title = document.createElement('h2');
        title.innerHTML = this.hasAttribute('')
    }
}

customElements.define("accordion", Accordion);  