import { registry } from '../../utils/customeElementsDefine.js';
import { pickFiles } from '../../functions/filePicker.js';

import { showConfirmDialog } from '../notifiers/conforim.js';
import { showAlertDialog } from '../notifiers/alert.js';

// Create a class for the element
class customSettings extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        let i;

        let value = window.localStorage.getItem(`${window.storageName}transperncy`) == null ? '1' : window.localStorage.getItem(`${window.storageName}transperncy`);
        let checked = value == '1' ? '' : 'checked';

        this.innerHTML = `<list-viewer actionButton="${window.default_edit_icon}">
        <hr titleText="Appearance">
                <li id='wallpaper'>Wallpaper</li>
                <li>Theme Colors</li>
                <li>Color Order</li>
                <li id='trans' >Transparency Mode <input id='Pichai - transperencyMode' type='checkbox' class='actionButton' ${checked}></input></li>

                <hr titleText="Borders">
                <li>Border style</li>
                <li>Border Radius</li>

                <hr titleText="Text and Fonts">
                <li>Font</li>
                <li>Writting Direction</li>

                <hr titleText="Icons">
                <li>Icon packs</li>
                <li>Icon shape</li>
                <li>Themed Icons</li>

                <hr titleText="Data">
                <li id='reset'>Reset data</li>
            </list-viewer>`;

        this.firstChild.addEventListener('itemSelected', async function (e) {
            if (e.detail.value == 'wallpaper') {
                pickFiles(function (file) {
                    window.localStorage.setItem(`${window.storageName}bgImageChange`, file);

                    window.location.reload();
                });
            } else if (e.detail.value == 'trans') {
                let li = document.getElementById(e.detail.value);

                li.children[0].checked = !li.children[0].checked;

                if (li.children[0].checked) {
                    window.localStorage.setItem(`${window.storageName}transperncy`, 0.75);
                } else {
                    window.localStorage.setItem(`${window.storageName}transperncy`, 1);
                }

                window.location.reload();
            } else if (e.detail.value == 'reset') {
                if (await showConfirmDialog('Are you sure?', 'Are you sure you want to clear all data?')) {
                    for (i in localStorage) {
                        if (String(i).includes(window.storageName)) {
                            window.localStorage.removeItem(i);
                        }
                    }

                    await showAlertDialog('Data cleared', 'Please refresh your window to finalize reset.');
                }
            }else if (e.detail.value == 'Fonts') {

            }
        });
    }
}

registry.define("template-settings", customSettings);