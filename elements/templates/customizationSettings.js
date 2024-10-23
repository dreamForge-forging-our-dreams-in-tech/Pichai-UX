import { registry } from '../../utils/customeElementsDefine.js';
import { pickFiles } from '../../functions/filePicker.js';

// Create a class for the element
class customSettings extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<list-viewer actionButton="edit">
                <li id='wallpaper' >Wallpaper</li>
                <li>Color Order</li>
                <li>Transparency Mode <input type='checkbox' class='actionButton'></input></li>
                <li>Font</li>
                <li>Border style</li>
                <li>Icon packs</li>
                <hr>
                <li>Reset data</li>
            </list-viewer>`;

        this.firstChild.addEventListener('itemSelected', function (e) {
            if (e.detail.index == 0) {
                pickFiles(function (file) {
                    window.localStorage.setItem('Pichai - bgImageChange', file);
                });
            } else if(e.detail.index == 2) {
                console.log(e.detail.element.firstChild.checked, e.detail.element)
                window.localStorage.setItem('Pichai - transparencyMode', e.detail.element.firstChild.checked);
            }

            window.location.reload();
        });
    }
}

registry.define("template-customization-settings", customSettings);