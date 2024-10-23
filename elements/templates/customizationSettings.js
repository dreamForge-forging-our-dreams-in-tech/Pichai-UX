import { registry } from '../../utils/customeElementsDefine.js';
import { pickFiles } from '../../functions/filePicker.js';

// Create a class for the element
class customSettings extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<list-viewer id="settingsListView" actionButton="edit">
                <li>Wallpaper</li>
                <li>Color Order</li>
                <li>Font</li>
                <li>Border style</li>
                <li>Icon packs</li>
            </list-viewer>`;

            this.firstChild.addEventListener('itemSelected', function (e) {
                if(e.detail.index == 0) {
                    pickFiles(function (file) {
                        alert()
                        window.sessionStorage.setItem('bgImageChange', file);
                    });
                }
            });
    }
}

registry.define("template-customization-settings", customSettings);