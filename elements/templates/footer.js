// Create a class for the element
class Footer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<footer>
        <x-icon></x-icon>
        <company-sketch></company-sketch>
        <icon-discord></icon-discord>
        <icon-youtube></icon-youtube>
        <icon-X></icon-X>
    </footer>`;
    }
}

customElements.define("template-footer", Footer);