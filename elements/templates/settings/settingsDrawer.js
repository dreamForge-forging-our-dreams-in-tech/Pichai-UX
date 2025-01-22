import { registry } from '../../../utils/customeElementsDefine.js';
// Create a class for the element
class SettingsDrawer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<section class="card" id='quickSettingsPanel'>
        <list-viewer sortable='true' id='QSP'>
        <li id='Customization' >Customization</li>
        </list-viewer>
        </section>`;

        /*       <li>Privacy</li>
        <li id='account' >Account</li>
        <li>Data</li>
                <li>Global</li>
        
        */

        this.children[0].addEventListener('itemSorted', function (e) {
            alert(e.detail.newIndex)
        });

        let panel = document.getElementById('QSP');

        panel.addEventListener('itemSelected', function (e) {
            if(e.detail.value == 'Customization') {
                let dialog = document.createElement('template-customization');

            if (dialog.parentNode == document.body) {
                dialog.remove();
                return;
            }
            document.body.appendChild(dialog);
            }
        });
    }
}

registry.define("template-settings-drawer", SettingsDrawer);