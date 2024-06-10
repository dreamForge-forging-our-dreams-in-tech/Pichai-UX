import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

/** @description 
 * A button that allows for easy and quick loging in.
*/

/** @usage 
 * Allow the user to log-in through the set loginDialog during initlization.
*/



// Create a class for the <log-in> element
class logIn extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = this.innerHTML == '' ? window.default_logged_in_text : this.innerHTML;

        this.onclick = function () { // when clicked the element displays or removes a dialog or element from the loginDIalog option set during initialization
            let dialog = window['options'].loginDialog;

            if(dialog.parentNode == document.body) {
                dialog.remove();
                return;
            }
            document.body.appendChild(dialog);
        }
    }
}

registry.define("log-in", logIn);  