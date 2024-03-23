// Create a class for the element
class Header extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<header>
        <x-icon></x-icon>
        <x-title></x-title>
        <log-in></log-in>
        <profile></profile>
    </header>`;
    }
}

customElements.define("template-header", Header);