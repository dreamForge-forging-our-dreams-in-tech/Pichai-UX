// Create a class for the element
class Footer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<footer>
        <x-icon></x-icon>
        <x-title></x-title>
        <log-in></log-in>
        <display-profile></display-profile>
    </footer>`;
    }
}

customElements.define("template-footer", Footer);