import { registry } from '../../../utils/customeElementsDefine.js';
// Create a class for the element
class SettingsDrawer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<section class="card" id='quickSettingsPanel'>
        <list-viewer sortable='true' id='settingsListViewer>
        <li>Global</li>
        <li>Customization</li>
        <li>Privacy</li>
        <li>Account</li>
        </list-viewer>
        </section>`;

        this.children[0].addEventListener('itemSorted', function (e) {
            alert(e.detail.newIndex)
        });
    }
}

registry.define("template-settings-drawer", SettingsDrawer);