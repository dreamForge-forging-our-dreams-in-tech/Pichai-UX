import { registry } from '../../../utils/customeElementsDefine.js';
import { pickFiles } from '../../../functions/filePicker.js';

import { updateStyles } from '../../../init.js';

function detectCustomization(e) {
    if (e.detail.value == 'Wallpaper') {
        pickFiles(function (file) {
            window.localStorage.setItem(`${window.storageName}bgImageChange`, file);

            updateStyles();
        });
    } else if (e.detail.value == 'Color Order') {
        window.localStorage.setItem(`${window.storageName}extractionPosition`, Number(window.prompt('Enter the position of the color extraction (0-10)', 0)));

    } else if (e.detail.value == 'Transparency') {
        window.localStorage.setItem(`${window.storageName}transperncy`, Number(window.prompt('Enter the transparency of the elements to make the image more visible (0-1)', 1)));

    }  else if (e.detail.value == 'Contrast') {
        window.localStorage.setItem(`${window.storageName}contrast`, Number(window.prompt('Enter the contrast of the elements.', 1)));

    }

    updateStyles();

}
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

        panel.addEventListener('itemSelected', async function (e) {
            if (e.detail.value == 'Customization') {
                panel.firstTime = true;
                panel.listItems = ['Wallpaper', 'Color Order', 'Transparency', 'Contrast'];
            }

            detectCustomization(e);
        });
    }
}

registry.define("template-settings-drawer", SettingsDrawer);