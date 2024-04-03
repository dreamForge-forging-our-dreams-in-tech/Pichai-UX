
// Create a class for the element
class Login extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        this.innerHTML = `<section class="card">
        <h2> Log-In or Sign-Up</h2>
        <p>By logging in with GitHub you agree to Sketch privacy policy and usage of GitHub repo’s and account data.</p>
        <button id="auth"> Authenticate With GitHub</button>
        </section>`;
    }
}

customElements.define("template-login", Login);