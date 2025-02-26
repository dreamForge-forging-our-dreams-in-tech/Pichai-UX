import { registry } from '../../../utils/customeElementsDefine.js';
import { pickFiles } from '../../../functions/filePicker.js';

import { updateStyles } from '../../../init.js';

let panel;

function detectCustomization(e) {
    if (e.detail.value == 'Filters') {
        panel.listItems = ['Contrast', 'Transparency', 'Inversion'];

    }  else if (e.detail.value == 'Colors') {
        panel.listItems = ['Color Order', 'Hue-Rotation'];

    } else if (e.detail.value == 'Wallpaper') {
        panel.listItems = ['Change Wallpaper', 'Wallpaper Blur', 'Wallpaper Brightness'];

    } else if (e.detail.value == 'Color Order') {
        window.localStorage.setItem(`${window.storageName}extractionPosition`, Number(window.prompt('Enter the position of the color extraction (0-10)', 0)));

    } else if (e.detail.value == 'Transparency') {
        window.localStorage.setItem(`${window.storageName}transperncy`, Number(window.prompt('Enter the transparency of the elements to make the image more visible (0-1)', 1)));

    } else if (e.detail.value == 'Contrast') {
        window.localStorage.setItem(`${window.storageName}contrast`, Number(window.prompt('Enter the contrast of the elements.', 1)));

    } else if (e.detail.value == 'Wallpaper Blur') {
        window.localStorage.setItem(`${window.storageName}blur`, Number(window.prompt('Enter the blur for the wallpaper', 1)));

    }  else if (e.detail.value == 'Wallpaper Brightness') {
        window.localStorage.setItem(`${window.storageName}brightness`, Number(window.prompt('Enter the brightness for the wallpaper. \nNote when using inversion this the behaviour of this property changes too.', 1)));

    }  else if (e.detail.value == 'Hue-Rotation') {
        window.localStorage.setItem(`${window.storageName}rotation`, Number(window.prompt('Enter the hue-rotation \nHue-Rotation allows you so set custom colors for your elements, colors wich are not taken from the wallpaper.', 1)));

    }  else if (e.detail.value == 'Inversion') {
        window.localStorage.setItem(`${window.storageName}inversion`, Number(window.prompt('Enter the blur for the wallpaper', 1)));
        
    } else if (e.detail.value == 'Change Wallpaper') {
        pickFiles(function (file) {
            window.localStorage.setItem(`${window.storageName}bgImageChange`, file);

            updateStyles();
        });
        
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

        panel = document.getElementById('QSP');

        panel.addEventListener('itemSelected', async function (e) {
            if (e.detail.value == 'Customization') {
                panel.firstTime = true;
                panel.listItems = ['Wallpaper', 'Colors', 'Filters'];
            }

            detectCustomization(e);
        });
    }
}

registry.define("template-settings-drawer", SettingsDrawer);