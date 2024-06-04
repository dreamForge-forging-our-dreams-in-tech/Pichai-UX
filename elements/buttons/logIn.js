import '../../utils/customeElementsDefine.js';
import { registry } from '../../utils/customeElementsDefine.js';

// Create a class for the element
class logIn extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        this.innerHTML = this.innerHTML == '' ? window.default_logged_in_text : this.innerHTML;

        this.onclick = function () {
            let dialog = window['options'].loginDialog;

            if(dialog.parentNode == document.body) {
                dialog.remove();
                return;
            }
            document.body.appendChild(dialog);
        }
    }
}

registry.define("log-in", logIn);  