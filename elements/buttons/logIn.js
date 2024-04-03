
// Create a class for the element
class logIn extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        this.innerHTML = 'Log-In';

        this.onclick = function () {
            console.log(window['options'].loginDialog)
            document.body.appendChild(window['options'].loginDialog);
        }
    }
}

customElements.define("log-in", logIn);  