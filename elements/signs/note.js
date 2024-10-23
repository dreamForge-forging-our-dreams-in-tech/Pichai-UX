import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

// Create a class for the <note> element
class Note extends HTMLElement {
    /** @description 
    * The info-note element displays a message for the user to read, it can give tips or bits of information
    */

    /** @usage 
     * Information or tip sharing
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
        icon.innerHTML = window.default_note_icon;

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

registry.define("info-note", Note);  