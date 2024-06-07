import { registry, doAttirbuteCheck } from '../../utils/customeElementsDefine.js';
// Create a class for the element
class DisplayProfile extends HTMLElement {

    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = window.default_user_icon;
        this.classList.add('material-symbols-outlined');

        this.onclick = function () {
            let dialog = window['options'].loginDialog;

            if(dialog.parentNode == document.body) {
                dialog.remove();
                return;
            }
            document.body.appendChild(dialog);
        }
    }
}

registry.define("display-profile", DisplayProfile);