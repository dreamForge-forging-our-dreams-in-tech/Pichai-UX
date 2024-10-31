import { registry } from '../../utils/customeElementsDefine.js';
// Create a class for the element
class Header extends HTMLElement {

    static observedAttributes = ["settings"]; // true or false
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<header>
        ` + await addHomeLink() + `
        ` + await addQuickSettings(this) + `
        
        </header>`;

    }

    async attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('boolean', 'settings', this.getAttribute('settings'));

        this.innerHTML = '';
        this.innerHTML = `<header>
        ` + await addHomeLink() + `
        ` + await addQuickSettings(this) + `
        
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
                resolve(`<a class='comapnyInfoA' href='` + window['options'].homeLink + `'>
        <x-icon></x-icon>
        <x-title></x-title>
        </a>`);
            }
        }, 1);
    });
}

function addQuickSettings(e) { // allows the developer to remove the logIn from the template
    return new Promise((resolve) => {
            if (e.getAttribute('settings') == 'true' || !e.hasAttribute('settings')) {
                resolve(`template-settings`);

            } else {
                resolve(``);
            }
    });
}

registry.define("template-header", Header);