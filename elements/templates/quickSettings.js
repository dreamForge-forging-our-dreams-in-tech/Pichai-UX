import { registry } from '../../utils/customeElementsDefine.js';
// Create a class for the element
class QS extends HTMLElement {

    /** @description 
* Allows the user to quickly access the settings without navigating towards a new page or multiple pages.
*/

    /** @usage 
     * This is best used when you want to give the user access to quick settings without the hassle, it can be best used inside of headers or footers for example
    */

    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = window.default_settings_icon;
        this.classList.add('material-symbols-outlined');

        this.onclick = function () {
            let dialog = window['options'].loginDialog;

            if (dialog.parentNode == document.body) {
                dialog.remove();
                return;
            }
            document.body.appendChild(dialog);
        }
    }
}

registry.define("template-settings", QS);