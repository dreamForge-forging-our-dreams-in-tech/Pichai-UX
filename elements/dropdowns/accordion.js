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

        let arrow = document.createElement('i');
        arrow.class = 'material-symbols-rounded';
        arrow.innerHTML = 'arrow_drop_down';

        content.appendChild(art);

        let title = document.createElement('h5');
        title.innerHTML = this.hasAttribute('titleText') ? this.getAttribute('titleText') : 'Accordion 🪗';

        title.appendChild(arrow);


        this.appendChild(title);
        this.appendChild(content);
    }
}

customElements.define("accordion-dropdown", Accordion);  