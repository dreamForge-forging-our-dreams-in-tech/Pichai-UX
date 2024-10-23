import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

class Error extends HTMLElement {
    /** @description 
    * The error-note element displays a error message for the user to read.
    */

    /** @usage 
     * Displaying a critical error.
    */

    static observedAttributes = ["titleText"];

    constructor() {
        super();
    }

    connectedCallback() {
        let note = document.createElement('article');
        note.classList.add('error', 'sign');

        let holder = document.createElement('article');
        holder.classList.add('signHolder');

        note.append(holder);

        let icon = document.createElement('label');
        icon.classList.add('material-symbols-outlined');
        icon.innerHTML = window.default_error_icon;

        let title = document.createElement('label');
        title.classList.add('title');
        title.innerHTML = this.getAttribute('titleText');

        holder.append(icon, title);

        let msg = document.createElement('label');
        msg.classList.add('msg');
        msg.innerHTML = this.innerHTML;

        this.innerHTML = '';

        note.append(msg);
        this.append(note);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('string', 'titleText', this.getAttribute('titleText'));
    }
}

registry.define("error-note", Error);  