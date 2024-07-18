import { registry } from '../../utils/customeElementsDefine.js';
// Create a class for the element
class Header extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<header>
        ` + addHomeLink() + `
        <log-in></log-in>
        <display-profile></display-profile>
        </header>`;

    }
}

function addHomeLink() {
    let int = window.setInterval(() => {
        if (!window['options'].homeLink === '') {
            clearInterval(int);
            return `<a href='` + window['options'].homeLink + `'>
        <x-icon></x-icon>
        <x-title></x-title>
        </a>`
        } else {
            return `<x-icon></x-icon>
            <x-title></x-title>`
        }
    }, 1);
}

registry.define("template-header", Header);