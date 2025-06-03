import { registry } from '../../../utils/customeElementsDefine.js';
import { pickFiles } from '../../../functions/filePicker.js';

import { updateStyles } from '../../../init.js';

import { showToastMessage } from '../../notifiers/toast.js';

function showToast() {
    showToastMessage('autorenew', 'Applying Changes', 2000);
}

let panel;
function detectStorage(e) {
    if (e.detail.value == 'Clear Storage') {
        if (confirm('Are you sure you want to clear all stored items and restart all over? \nAll your local settings will be cleared, storage keys will be lost and personal account settings stored locally wll be lost too.')) {
            window.localStorage.clear();
            window.location.reload();
        }
    } else if (e.detail.value == 'Storage Key') {
        let key = window.prompt('Enter the storage key you want to use for storing settings. \nA storage key will only apply to this site(' + window.location.href + ') or other sites with the same key and is used to let users have more control over how they can customize each site. \nIf you want it to follow the global storage key you can leave the text box empty.', '');

        let siteName = window.location.pathname.split('/')[1];
        window.storageName = key ? key + ' ' : 'Pichai-UX ';

        window.localStorage.setItem(`Pichai-UX ${siteName}storageKey`, key);
    }
}

function detectCustomization(e) {
    if (e.detail.value == 'Filters') {
        panel.listItems = ['Contrast', 'Transparency', 'Inversion'];

    } else if (e.detail.value == 'Colors') {
        panel.listItems = ['Color Order', 'Hue-Rotation'];

    } else if (e.detail.value == 'Wallpaper') {
        panel.listItems = ['Change Wallpaper', 'Wallpaper Blur', 'Wallpaper Brightness', 'Wallpaper Inversion', 'Wallpaper Size', 'Wallpaper Position', 'Wallpaper Repeat'];

    } else if (e.detail.value == 'Color Order') {
        window.localStorage.setItem(`${window.storageName}extractionPosition`, Number(window.prompt('Enter the position of the color extraction (0-10)', 0)));
        showToast()

    } else if (e.detail.value == 'Transparency') {
        window.localStorage.setItem(`${window.storageName}transperncy`, Number(window.prompt('Enter the transparency of the elements to make the image more visible (0-1)', 1)));
        showToast()

    } else if (e.detail.value == 'Contrast') {
        window.localStorage.setItem(`${window.storageName}contrast`, Number(window.prompt('Enter the contrast of the elements.', 1)));
        showToast()

    } else if (e.detail.value == 'Change Wallpaper') {
        panel.listItems = ['Upload Wallpaper', 'Default Wallpaper', 'Hide Wallpaper'];

    } else if (e.detail.value == 'Default Wallpaper') {
        document.body.style.backgroundImage = 'none';
        let comp = window.getComputedStyle(document.body);
        let image = String(comp['backgroundImage']);
        image = image.substring(5, image.length - 2);
        console.log(image)
        //window.localStorage.removeItem(`${window.storageName}bgImageChange`);

    } else if (e.detail.value == 'Wallpaper Blur') {
        window.localStorage.setItem(`${window.storageName}blur`, Number(window.prompt('Enter the blur for the wallpaper', 1)));
        showToast()

    } else if (e.detail.value == 'Wallpaper Brightness') {
        window.localStorage.setItem(`${window.storageName}brightness`, Number(window.prompt('Enter the brightness for the wallpaper. \nNote when using inversion this the behaviour of this property changes too.', 1)));
        showToast()

    } else if (e.detail.value == 'Hue-Rotation') {
        window.localStorage.setItem(`${window.storageName}rotation`, Number(window.prompt('Enter the hue-rotation \nHue-Rotation allows you so set custom colors for your elements, colors wich are not taken from the wallpaper.', 1)));
        showToast()

    } else if (e.detail.value == 'Wallpaper Inversion') {
        window.localStorage.setItem(`${window.storageName}wInversion`, Number(window.prompt('Enter the color inversion for the wallpaper (0-1) \nThis filter can be overwritten by the "Inversion" filter, values may need alteration if used in combination.', 1)));
        showToast()

    } else if (e.detail.value == 'Inversion') {
        let value = Number(window.prompt('Enter the color inversion for the website (0 - 1)', 1))
        window.localStorage.setItem(`${window.storageName}inversion`, value);
        window.localStorage.setItem(`${window.storageName}wInversion`, 0); // sets the wallpaper inversion too since this is a global filter, wInversion only exists for dark mode
        showToast()

    } else if (e.detail.value == 'Upload Wallpaper') {
        pickFiles(function (file) {
            window.localStorage.setItem(`${window.storageName}bgImageChange`, file);

            updateStyles();
            showToast()
        });

    } else if (e.detail.value == 'Wallpaper Size') {
        window.localStorage.setItem(`${window.storageName}bgSize`, window.prompt('Enter the size of the wallpaper. \nPossible values are: \ncover, contain, auto or custom percentage ending with %.', 'cover'));
        updateStyles();
        showToast()
    } else if (e.detail.value == 'Wallpaper Position') {
        window.localStorage.setItem(`${window.storageName}bgPosition`, window.prompt('Enter the position of the wallpaper. \nPossible values are: \nbottom, top, left, right and center.', 'center'));
        updateStyles();
        showToast()

    } else if (e.detail.value == 'Wallpaper Repeat') {
        window.localStorage.setItem(`${window.storageName}bgRepeat`, window.prompt('Enter the repeat of the wallpaper. \nPossible values are: \nno-repeat, repeat-x, repeat-y, repeat, round and space.', 'no-repeat'));
        showToast()

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
        
        <div class='row settingsDisclaimers'>
         <a href='https://dreamforge-forging-our-dreams-in-tech.github.io/The-Magic-Garden/pages/privacyPolicy.html'>Privacy Policy</a>
         |
        <a href='https://studio.buymeacoffee.com/dashboard'>Donate</a>
        </div>
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
            panel.firstTime = true;

            if (e.detail.value == 'Customization') {
                panel.listItems = ['Wallpaper', 'Colors', 'Filters'];

            } else if (e.detail.value == 'Storage') {
                panel.listItems = ['Clear Storage', 'Storage Key'];

            }

            detectCustomization(e);
            detectStorage(e);
        });
    }
}

registry.define("template-settings-drawer", SettingsDrawer);