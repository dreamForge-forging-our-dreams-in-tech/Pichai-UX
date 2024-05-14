
// Create a class for the element
class AccountDrawer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<section class="card" id='drawer'>
        <article id='options'>
        <i class='material-symbols-outlined'>${window.default_seettings_icon}</i>
        </article>
        </section>`;

        let auth = document.getElementById('auth');
        auth.onclick = async function () {
        }
    }
}

customElements.define("template-account-drawer", AccountDrawer);