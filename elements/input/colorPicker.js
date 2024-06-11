import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

// Create a class for the element
class ColorPicker extends HTMLElement {
            /** @description 
    * The color picker element allows you to easily select colors.
    */

    /** @usage 
     * When the user needs to select a color
    */

    static observedAttributes = ["previousvalue", "value", "outputtype", "showpreviousvalues", "presets", "savetopresets"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        if(this.getAttribute('showpreviousvalues') == 'false' || this.hasAttribute('showpreviousvalues')) {} else { // create the previous color section of the color picker
            let previousHolder = createElement('article');
            previousHolder.class = 'previousColor';

            let current = document.createElement('paragraph');
            current.class = 'displayColor';
            current.style.backgroundColor = value;

            let previous = document.createElement('paragraph');
            previous.class = 'displayColor';
            previous.style.backgroundColor = previousvalue;

            previousHolder.append(current, previous);
            this.appendChild(previousHolder);
        }
        
    }

    attributeChangedCallback(name, oldValue, newValue) {
                // Get the favicon link element
                const faviconLink = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut icon']");

                // Get the favicon URL
                const faviconUrl = faviconLink ? faviconLink.href : null;
        
                if (!this.hasAttribute('dynamic') || this.getAttribute('dynamic') == 'true') {
                    window.onload = async () => {
                        let newIcon = await generateDynamicIcon(faviconUrl);
                        this.style.backgroundImage = `url(${newIcon})`;
                    }
                } else {
                    this.style.backgroundImage = this.src ?? `url("${faviconUrl}")`;
                }
    }
}

registry.define("color-picker", ColorPicker);