import { registry } from '../../../utils/customeElementsDefine.js';
import { pickFiles } from '../../../functions/filePicker.js';

import { updateStyles } from '../../../init.js';

let panel;
function detectStorage(e) {
    if(e.detail.value == 'Clear Storage') {
        if(confirm('Are you sure you want to clear all storaged items and restart all over? \nAll your local settings will be cleared!')) {
            window.localStorage.clear();
            window.location.reload();
        }
    } else if (e.detail.value == 'Storage Key') {
        let key = window.prompt('Enter the storage key you want to use for storing settings. \nA storage key will only apply to this site(' + window.location.href + ') and is used to let users have more control over how they can customize each site.', '');
    }
}

function detectCustomization(e) {
    if (e.detail.value == 'Filters') {
        panel.listItems = ['Contrast', 'Transparency', 'Inversion'];

    }  else if (e.detail.value == 'Colors') {
        panel.listItems = ['Color Order', 'Hue-Rotation'];

    } else if (e.detail.value == 'Wallpaper') {
        panel.listItems = ['Change Wallpaper', 'Wallpaper Blur', 'Wallpaper Brightness', 'Wallpaper Inversion'];

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

    }  else if (e.detail.value == 'Wallpaper Inversion') {
        window.localStorage.setItem(`${window.storageName}wInversion`, Number(window.prompt('Enter the color inversion for the wallpaper (0-1) \nTHis filter can be overwritten by the "Inversion" filter, values may need alteration if used in combination.', 1)));
        
    }  else if (e.detail.value == 'Inversion') {
        let value = Number(window.prompt('Enter the color inversion for the website (0 - 1)', 1))
        window.localStorage.setItem(`${window.storageName}inversion`, value);
        window.localStorage.setItem(`${window.storageName}wInversion`, 0); // sets the wallpaper inversion too since this is a global filter, wInversion only exists for dark mode
        
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
        <li id='Storage' >Storage</li>
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
            } else if(e.detail.value == 'Storage') {
                panel.firstTime = true;
                panel.listItems = ['Clear Storage', 'Storage Key'];
            }

            detectCustomization(e);
            detectStorage(e);
        });
    }
}

registry.define("template-settings-drawer", SettingsDrawer);