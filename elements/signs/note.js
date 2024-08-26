<article class="card row settingsItem note">
<article class="noteHolder">
    <label class="material-symbols-outlined">info </label>
    <label class="title">Text border color</label>
</article>
<label class="msg">message text</label>
</article>

import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

const click = new Event("itemSelected"); //fires when an item in the listViewer is clicked, returns the text of the clicked item. Uses custom name because click is used by js 

// Create a class for the <log-in> element
class Note extends HTMLElement {
    /** @description 
    * THe note element displays a message for the user to read, it can give tips or bits of information
    */

    /** @usage 
     * information or tip sharing
    */

    static observedAttributes = ["titleText", "messageText"];

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
        msg.innerHTML = this.getAttribute('messageText');

        note.append(msg);
        this.append(note);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('string', 'titleText', this.getAttribute('titleText'));
        doAttributeCheck('string', 'messageText', this.getAttribute('messageText'));
    }
}

registry.define("note", Note);  