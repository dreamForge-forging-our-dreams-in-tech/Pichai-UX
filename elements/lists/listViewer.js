import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

const click = new Event("click"); //fires when an item in the listViewer is clicked, returns the text of the clicked item.

// Create a class for the <log-in> element
class ListViewer extends HTMLElement {
    /** @description 
    * The list-viewer element allows you to display a set of items below each other, these items can be interacted with by the user.
    */

    /** @usage 
     * Display items underneath each other.
    */

    constructor() {
        super();
    }

    connectedCallback() {
        let i;

        for(i of this.children) {
            console.log(i);
        }
    }
}

registry.define("list-viewer", ListViewer);  