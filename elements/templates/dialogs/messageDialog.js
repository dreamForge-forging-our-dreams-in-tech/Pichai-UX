import { registry } from '../../../utils/customeElementsDefine.js';

// Create a class for the element
class Message extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() { // a html template that can be used to show a confirm dialog, note showAsDialog() needs to be aclled by user
        this.innerHTML = `<div class='row'>
        </div>`;
    }
}

registry.define("template-message-dialog", Message);