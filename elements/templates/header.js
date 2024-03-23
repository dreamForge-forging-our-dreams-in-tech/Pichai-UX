// Create a class for the element
class Header extends HTMLElement {
    static observedAttributes = ["src", "dynamic"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<header>
        <x-icon></x-icon>
        <x-title></x-title>
    </header>`;
    }
}

customElements.define("template-header", Header);