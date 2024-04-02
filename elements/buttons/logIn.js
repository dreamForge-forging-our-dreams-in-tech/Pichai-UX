
// Create a class for the element
class logIn extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        this.innerHTML = 'Log-In';

        this.onclick = function () {
            console.log(JSON.parse(window.sessionStorage.getItem('options')))
            if(JSON.parse(window.sessionStorage.getItem('options'))) {
                
                document.body.appendChild();
            }
        }
    }
}

customElements.define("log-in", logIn);  