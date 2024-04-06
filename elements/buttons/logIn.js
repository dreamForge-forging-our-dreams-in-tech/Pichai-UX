
// Create a class for the element
class logIn extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        alert(this.innerHTML)
        this.innerHTML = this.innerHTML ?? 'Not logged in';

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