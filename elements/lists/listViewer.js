import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

// Create a class for the <log-in> element
class ListViewer extends HTMLElement {
    /** @description 
    * Displays a set of items below each other, these items can be interacted with by the user.
    */

    /** @usage 
     * Display items underneath each other.
    */

    constructor() {
        super();
    }

    connectedCallback() {
    }
}

registry.define("list-viewer", ListViewer);  