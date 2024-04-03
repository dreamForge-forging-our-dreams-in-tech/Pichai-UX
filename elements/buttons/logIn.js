
// Create a class for the element
class logIn extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        this.innerHTML = 'Log-In';

        this.onclick = function () {
            let dialog = window['options'].loginDialog
            document.body.appendChild(dialog);
            dialog.style.position = 'fixed';
            dialog.style.top = '65px'
            dialog.style.right = '8px';
        }
    }
}

customElements.define("log-in", logIn);  