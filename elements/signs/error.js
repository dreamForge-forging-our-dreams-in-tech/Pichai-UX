import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

class Warn extends HTMLElement {
    /** @description 
    * The information element displays a message for the user to read, it can give tips or bits of information
    */

    /** @usage 
     * information or tip sharing
    */

    static observedAttributes = ["titleText"];

    constructor() {
        super();
    }

    connectedCallback() {
        let note = document.createElement('article');
        note.classList.add('note', 'sign');

        let holder = document.createElement('article');
        holder.classList.add('signHolder');

        note.append(holder);

        let icon = document.createElement('label');
        icon.classList.add('material-symbols-outlined');
        icon.innerHTML = 'info';

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

registry.define("warning-note", Warn);  