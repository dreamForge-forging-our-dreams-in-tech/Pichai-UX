import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';
import { enableSetListItems } from '../globalElementFunctions/setListItems.js';

import '../../utils/libraries/sortable.js';

// Create a class for the <log-in> element
class ListViewer extends HTMLElement {
    /** @description 
    * The list-viewer element allows you to display a set of items below each other, these items can be interacted with by the user.
    */

    /** @usage 
     * Display items underneath each other.
    */

    static observedAttributes = ["value", "actionButton", 'sortable']; // add a value attribute to let the developer update the selected item when it for example has the wrong value.
    //actionButton allows the developer to add an item to the end of the list item e.g. an arrow, leave empty to have none
    // the sortable attribute enables list viewer sorting (no saving included)

    constructor() {
        super();
    }

    connectedCallback() {
        enableSetListItems(this.children[0], addAttributeFunctions); //callback call ensures button creation

        this.addEventListener('click', function (e) { // adds a click event to the list items and ensures that the right value is returned
            this.setAttribute('value', e.target.id);

            let click = new CustomEvent("itemSelected", { //fires when an item in the listViewer is clicked, returns the text of the clicked item. Uses custom name because click is used by js 
                detail: {
                    value: e.target.id,
                    index: Array.prototype.indexOf.call(this.children, e.target),
                },
            });

            this.dispatchEvent(click); // dispatches the click event only when it's clicked and not when the value is manually changed by the developer.
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('string', 'value', this.getAttribute('value'));
    }
}

function addAttributeFunctions(e) {
    let i, sortable;

    let li = document.createElement('li');
    e.appendCHild(li);

    for(i of e.children) {
        li.appendChild(i);
    }

    if (e.getAttribute('sortable') == '' || !e.hasAttribute('sortable')) { } else {
        sortable = new Sortable(li, {
            animation: 150,  // Smooth dragging
            ghostClass: 'sortable-ghost',  // Class applied to the item when it's being dragged
            onEnd: function (evt) {
                console.log('Item moved:', evt.oldIndex, 'to', evt.newIndex);
            }
        });
    }

    if (e.getAttribute('actionButton') == '' || !e.hasAttribute('actionButton')) { } else {
        for (i of li.children) {
            if (!i.id) {
                i.id = i.innerHTML;
            }

            if (i.tagName == 'HR' || i.getElementsByClassName('actionButton').length == 1) { } else { // allows users  to create custom action buttons elements other than a button

                let button = document.createElement('button');
                button.innerHTML = e.getAttribute('actionButton');
                button.classList.add('actionButton', 'material-symbols-outlined');

                i.appendChild(button);
            }
        }
    }
}

registry.define("list-viewer", ListViewer);  