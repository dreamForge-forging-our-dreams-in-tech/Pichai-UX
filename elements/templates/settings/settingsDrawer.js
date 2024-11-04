import { registry } from '../../../utils/customeElementsDefine.js';
// Create a class for the element
class SettingsDrawer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<section class="card" id='quickSettingsPanel'>
        <list-viewer actionButton='${window.default_edit_icon}'>
        <li>Global</li>
        <li>Customization</li>
        <li>Privacy</li>
        <li>Account</li>
        </list-viewer>
        </section>`;
    }
}

registry.define("template-settings-drawer", SettingsDrawer);