import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

const click = new Event("itemSelected"); //fires when an item in the listViewer is clicked, returns the text of the clicked item. Uses custom name because click is used by js 

// Create a class for the <log-in> element
class ListViewer extends HTMLElement {
    /** @description 
    * The list-viewer element allows you to display a set of items below each other, these items can be interacted with by the user.
    */

    /** @usage 
     * Display items underneath each other.
    */

    static observedAttributes = ["value", "actionButton"]; // add a value attribute to let the developer update the selected item when it for example has the wrong value.
    //actionButton allows the developer to add an item to the end of the list item e.g. an arrow, leave empty to have none

    constructor() {
        super();
    }

    connectedCallback() {
        let i;

        if (this.getAttribute('actionButton') == '') { } else {
            for (i of this.children) {
                let button = document.createElement('button');
                button.innerHTML = this.getAttribute('actionButton');
                button.classList.add('actionButton');

                i.appendChild(button);
            }
        }

        this.addEventListener('click', function (e) { // adds a click event to the list items and ensures that the right value is returned
            console.log(e.target.innerHTML)
            this.setAttribute('value', e.target.innerHTML);
            this.dispatchEvent(click); // dispatches the click event only when it's clicked and not when the value is manually changed by the developer.
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('string', 'value', this.getAttribute('value'));
    }
}

registry.define("list-viewer", ListViewer);  