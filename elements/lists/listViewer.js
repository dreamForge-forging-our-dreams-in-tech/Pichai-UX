import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

const click = new Event("itemSelected"); //fires when an item in the listViewer is clicked, returns the text of the clicked item.

// Create a class for the <log-in> element
class ListViewer extends HTMLElement {
    /** @description 
    * The list-viewer element allows you to display a set of items below each other, these items can be interacted with by the user.
    */

    /** @usage 
     * Display items underneath each other.
    */

    static observedAttributes = ["value"]; // add a value attribute to let the developer update the selected item when it for example has the wrong value.

    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', function (e) { // adds a click event to the list items and ensures that the right value is returned
            this.setAttribute('value', e.target.innerHTML);
            this.dispatchEvent(click); // dispatches the click event only when it's clicked and not when the value is manually changed by the developer.
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('string', 'value', this.getAttribute('value'));
    }
}

registry.define("list-viewer", ListViewer);  