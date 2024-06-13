import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';
import '../../utils/localFOrage.js';

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
        let i;

        if(this.getAttribute('showpreviousvalues') == 'true' || this.hasAttribute('showpreviousvalues')) {} else { // create the previous color section of the color picker
            let previousHolder = document.createElement('article');
            previousHolder.classList.add('previousColor');

            let current = document.createElement('paragraph');
            current.classList.add('displayColor');
            current.style.backgroundColor = this.getAttribute('value') ?? '#008dcd';
            current.innerHTML = `Current`;

            let previous = document.createElement('paragraph');
            previous.classList.add('displayColor');
            previous.style.backgroundColor =  this.getAttribute('previousvalue') ?? this.getAttribute('value');
            previous.innerHTML = 'Previous';

            previousHolder.append(current, previous);
            this.appendChild(previousHolder);
        }

        if(this.getAttribute('presets') == 'true' || this.hasAttribute('presets')) {} else { // create the previous color section of the color picker
            let presetsHolder = document.createElement('article');
            presetsHolder.classList.add('presets');

            createPresets(presetsHolder);

            this.appendChild(presetsHolder);
        }
        
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('boolean', 'presets', this.getAttribute('presets'));
        doAttributeCheck('boolean', 'showpreviousvalues', this.getAttribute('showpreviousvalues'));

        this.connectedCallback();

    }
}

async function createPresets (el) {
    let standardColors = ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'purple', 'pink', 'black', 'white'];
    let i;

    let saved = await localforage.getItem('presetColors');
    if(saved != null) {
        standardColors = standardColors.concat(saved);
    }

    for(i of standardColors) {
        let item = document.createElement('button');
        item.classList.add('colorPresetItem');
        item.style.backgroundColor = i;

        item.addEventListener('click', function () {
            el.parentNode.setAttribute('previousvalue', el.getAttribute('value'));
            el.parentNode.setAttribute('value', this.style.backgroundColor);
        });

        el.appendChild(item);
    }

}

registry.define("color-picker", ColorPicker);