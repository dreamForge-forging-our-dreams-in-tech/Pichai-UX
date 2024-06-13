import { registry } from '../../utils/customeElementsDefine.js';
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
        <icon-discord></icon-discord>
        <icon-youtube></icon-youtube>
        <x-icon></x-icon>
    </footer>`;
    }
}

registry.define("template-footer", Footer);