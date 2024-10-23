import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

const click = new Event("itemSelected"); //fires when an item in the listViewer is clicked, returns the text of the clicked item. Uses custom name because click is used by js 

// Create a class for the <note> element
class Warn extends HTMLElement {
    /** @description 
    * The warning-note element displays a message for the user to read, the message is often a warning for the user to keep in mind
    */

    /** @usage 
     * Displaying an warning
    */

    static observedAttributes = ["titleText"];

    constructor() {
        super();
    }

    connectedCallback() {
        let note = document.createElement('article');
        note.classList.add('warning', 'sign');

        let holder = document.createElement('article');
        holder.classList.add('signHolder');

        note.append(holder);

        let icon = document.createElement('label');
        icon.classList.add('material-symbols-outlined');
        icon.innerHTML = window.default_warning_icon;

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