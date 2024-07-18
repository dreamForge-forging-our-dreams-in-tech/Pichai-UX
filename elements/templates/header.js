import { registry } from '../../utils/customeElementsDefine.js';
// Create a class for the element
class Header extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<header>
        <a href='` + window.options.homeLink + `'>
        <x-icon></x-icon>
        <x-title></x-title>
        </a>
        <log-in></log-in>
        <display-profile></display-profile>
    </header>`;
    }
}

registry.define("template-header", Header);