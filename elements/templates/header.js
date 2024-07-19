import { registry } from '../../utils/customeElementsDefine.js';
// Create a class for the element
class Header extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<header>
        ` + await addHomeLink() + `
        <log-in></log-in>
        <display-profile></display-profile>
        </header>`;

    }
}

function addHomeLink() {
    return new Promise((resolve) => {
        let int = window.setInterval(() => {
            if (window['options'].homeLink === '') {
                clearInterval(int);
                resolve(`<x-icon></x-icon>
            <x-title></x-title>`);

            } else {
                clearInterval(int);
                resolve(`<a href='` + window['options'].homeLink + `'>
        <x-icon></x-icon>
        <x-title></x-title>
        </a>`);
            }
        }, 1);
    });
}

registry.define("template-header", Header);