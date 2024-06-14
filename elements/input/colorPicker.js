import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';
import '../../utils/localFOrage.js';

const change = new Event("change"); // new change event for the color picker

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

        if (this.getAttribute('showpreviousvalues') == 'true' || this.hasAttribute('showpreviousvalues')) { } else { // create the previous color section of the color picker
            let previousHolder = document.createElement('article');
            previousHolder.classList.add('previousColor');

            let current = document.createElement('paragraph');
            current.classList.add('displayColor');
            current.style.backgroundColor = this.getAttribute('value') ?? '#008dcd';
            current.innerHTML = `Current`;

            let previous = document.createElement('paragraph');
            previous.classList.add('displayColor');
            previous.style.backgroundColor = this.getAttribute('previousvalue') ?? this.getAttribute('value');
            previous.innerHTML = 'Previous';

            previousHolder.append(current, previous);
            this.appendChild(previousHolder);
        }

        if (this.getAttribute('presets') == 'true' || this.hasAttribute('presets')) { } else { // create the previous color section of the color picker
            let presetsHolder = document.createElement('article');
            presetsHolder.classList.add('presets');

            createPresets(presetsHolder);

            this.appendChild(presetsHolder);
        }

        if (this.getAttribute('savetopresets') == 'true' || this.hasAttribute('savetopresets')) { } else { // create the previous color section of the color picker
            let presetsHolder = document.createElement('article');
            presetsHolder.classList.add('presetsExpanded');

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

async function createPresets(el) {
    let standardColors = ['#FF0000', '#Ffa500', '#FFFF00', '#00ff00', '#ADD8E6', '#0000ff', '#A020F0', '#Ffc0cb', '#000000', '#ffffff'];
    let i;

    let saved = await localforage.getItem('presetColors');
    if (saved != null) {
        standardColors = standardColors.concat(saved);
    }

    for (i of standardColors) {
        let item = document.createElement('button');
        item.classList.add('colorPresetItem');
        item.style.backgroundColor = i;

        item.addEventListener('click', function () {
            el.parentNode.setAttribute('previousvalue', el.parentNode.getAttribute('value')); // make this update depending on set outputtype
            el.parentNode.setAttribute('value', this.style.backgroundColor);

            el.parentNode.dispatchEvent(change);
        });

        el.appendChild(item);
    }

                //create an arrow for expansion
                let arrow = document.createElement('button');
                arrow.classList.add('colorPresetItem');
                arrow.innerHTML = '+';
    
                arrow.addEventListener('click', function () {
                    if (this.innerHTML == '+') {
                        arrow.innerHTML = '-';
                        el.style.display = 'none';
                    } else {
                        arrow.innerHTML = '+';
                        el.style.display = 'flex';
                    }
                });
    
                el.appendChild(arrow);

}

registry.define("color-picker", ColorPicker);