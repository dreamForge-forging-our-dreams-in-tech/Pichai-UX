import { registry } from '../../../utils/customeElementsDefine.js';
import { pickFiles } from '../../../functions/filePicker.js';

import { showConfirmDialog } from '../../notifiers/conforim.js';
import { showAlertDialog } from '../../notifiers/alert.js';

// Create a class for the element
class customSettings extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        let i;

        this.innerHTML = `<section class='card' id='QSP'>
        <list-viewer sortable='true'>
        <li id='Wallpaper' >Wallpaper</li>
        </list-viewer>
        </section>`;

        console.log(this.firstChild.firstChild)
        this.firstChild.firstChild.addEventListener('itemSelected', async function (e) {
            alert(e.detail.value)
            if (e.detail.value == 'Wallpaper') {
                pickFiles(function (file) {
                    window.localStorage.setItem(`${window.storageName}bgImageChange`, file);

                    window.parent.location.reload();
                });
            }
        });
    }
}

registry.define("template-customization", customSettings);