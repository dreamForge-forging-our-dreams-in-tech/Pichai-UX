
// Create a class for the element
class logIn extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        this.innerHTML = 'Log-In';

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

customElements.define("log-in", logIn);  