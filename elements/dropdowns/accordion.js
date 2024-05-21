// Create a class for the element
class Accordion extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let content = document.createElement('section');
        let art = document.createElement('article');
        art.innerHTML = this.innerHTML;
        this.innerHTML = '';

        content.appendChild(art);

        let title = document.createElement('h4');
        title.innerHTML = this.hasAttribute('titleText') ? this.getAttribute('titleText') : 'Accordion 🪗';

        this.appendChild(title);
        this.appendChild(content);
    }
}

customElements.define("accordion-dropdown", Accordion);  