import { PichaiUX } from '../init.js';
// Create a class for the element
class logIn extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        this.innerHTML = 'Log-In';

        this.onclick = function () {
            if(PichaiUX.loginDialog) {
                document.body.appendChild(PichaiUX.loginDialog);
            }
        }
    }
}

customElements.define("log-in", logIn);  