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
        let startTime, endTime;
        let i;
        let listViewer = this;
        enableSetListItems(this, addAttributeFunctions); //callback call ensures button creation

        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
              if (mutation.type === 'childList') {
                if (mutation.addedNodes.length > 0) {
                    for(i of mutation.addedNodes) {
                        if ((listViewer.getAttribute('actionButton') == '' || !listViewer.hasAttribute('actionButton')) || (i.tagName != 'LI' || i.getElementsByClassName('actionButton').length == 1)) { } else { // allows users  to create custom action buttons elements other than a button
                            let button = document.createElement('button');
                            button.innerHTML = listViewer.getAttribute('actionButton');
                            button.classList.add('actionButton', 'material-symbols-outlined');
                            i.appendChild(button);
                        }
                    }
                }
              }
            });
          });
          
          // Set up the observer with the desired options
          observer.observe(this, {
            childList: true, // Listen for changes to child elements
            subtree: false   // Set to true if you want to observe child elements of child elements
          });

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

        this.addEventListener('touchstart', function () {
            startTime = performance.now();
        });

        this.addEventListener('touchend', function (e) {
            endTime = performance.now();

            let difference = endTime - startTime;

            if(difference < 10) {
                this.click();
            }
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('string', 'value', this.getAttribute('value'));
        addAttributeFunctions(this);
    }
}

function addAttributeFunctions(e) {
    let i, sortable;

    sortable = Sortable.create(e);

    if (e.getAttribute('sortable') == '' || e.getAttribute('sortable') == 'false' || !e.hasAttribute('sortable')) {
        try {
            sortable.destroy();
        } catch(e) {
            console.log(e)
        }
    } else {
        sortable = new Sortable(e, {
            //delay: 200, // time in milliseconds
            //delayOnTouchOnly: true,
            animation: 150,  // Smooth dragging
            ghostClass: 'sortable-ghost',  // Class applied to the item when it's being dragged
            onEnd: function (evt) {
                let sorted = new CustomEvent("itemSorted", { //fires when an item in the listViewer is sorted, returns the new and old index and item
                    detail: {
                        oldIndex: evt.oldIndex,
                        newIndex: evt.newIndex,
                        item: evt.item.id,
                    },
                });
    
                evt.to.dispatchEvent(sorted); // dispatches the click event only when it's clicked and not when the value is manually changed by the developer.
            }
        });
    }

    if (e.getAttribute('actionButton') == '' || !e.hasAttribute('actionButton')) { } else {
        for (i of e.children) {
            if (!i.id) {
                i.id = i.innerHTML;
            }

            if (i.tagName != 'LI' || i.getElementsByClassName('actionButton').length == 1) { } else { // allows users  to create custom action buttons elements other than a button

                let button = document.createElement('button');
                button.innerHTML = e.getAttribute('actionButton');
                button.classList.add('actionButton', 'material-symbols-outlined');

                i.appendChild(button);
            }
        }
    }
}

registry.define("list-viewer", ListViewer);  