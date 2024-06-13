import { registry } from '../../utils/customeElementsDefine.js';
// Create a class for the element
class AccountDrawer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<section class="card" id='drawer'>
        <article id='options'>
        <i class='material-symbols-outlined card' title='Upload a back-up of your data'>${window.default_upload_icon}</i>
        <i class='material-symbols-outlined card' title='Create a back-up of your data'>${window.default_download_icon}</i>
        <i class='material-symbols-outlined card' title='Link devices to have acces to data'>${window.default_link_icon}</i>
        <i class='material-symbols-outlined card' title='Settings'>${window.default_settings_icon}</i>
        </article>
        </section>`;
    }
}

registry.define("template-account-drawer", AccountDrawer);