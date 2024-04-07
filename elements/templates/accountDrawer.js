
// Create a class for the element
class AccountDrawer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<section class="card" id='drawer'>
        <article class='card'>
        <h2>Allow Data Sharing</h2>
        <p>Do you want to have you data stored accross your devices or just want to have a backup? <br> Setup a local storage system with a local storage, Google Drive or Dropbox to ensure that your data is safe and sound!</p>
        <button id="auth">I agree</button>
        </article>
        </section>`;

        let auth = document.getElementById('auth');
        auth.onclick = async function () {
        }
    }
}

customElements.define("template-account-drawer", AccountDrawer);