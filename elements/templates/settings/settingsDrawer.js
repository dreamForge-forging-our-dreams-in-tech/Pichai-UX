import { registry } from '../../../utils/customeElementsDefine.js';
// Create a class for the element
class SettingsDrawer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<section class="card" id='quickSettingsPanel'>
        <list-viewer>
        <li><button class="actionButton material-symbols-outlined">` + window.default_user_icon + `</button> Global</li>
        <li>Customization</li>
        <li>Privacy</li>
        <li>Account</li>
        </list-viewer>
        </section>`;
    }
}

registry.define("template-settings-drawer", SettingsDrawer);