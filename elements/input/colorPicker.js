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

        if (this.getAttribute('showpreviousvalues') == 'true' || !this.hasAttribute('showpreviousvalues')) { // create the previous color section of the color picker
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

        if (this.getAttribute('presets') == 'true' || !this.hasAttribute('presets')) { // create the previous color section of the color picker
            let presetsHolder = document.createElement('article');
            presetsHolder.classList.add('presets');

            createPresets(presetsHolder);

            this.appendChild(presetsHolder);
        }

        if (this.getAttribute('savetopresets') == 'true' || !this.hasAttribute('savetopresets')) { // create the previous color section of the color picker
            let presetsHolder = document.createElement('article');
            presetsHolder.classList.add('presetsExpanded');

            createPresets(presetsHolder);

            this.appendChild(presetsHolder);
        }

    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('boolean', 'presets', this.getAttribute('presets'));
        doAttributeCheck('boolean', 'showpreviousvalues', this.getAttribute('showpreviousvalues'));
        doAttributeCheck('boolean', 'savetopresets', this.getAttribute('savetopresets'));
        doAttributeCheck('string', 'value', this.getAttribute('value'));
        doAttributeCheck('string', 'previousvalue', this.getAttribute('previousvalue'));
        doAttributeCheck('string', 'outputtype', this.getAttribute('outputtype'));

        if (this.getAttribute('showpreviousvalues') == 'true' || !this.hasAttribute('showpreviousvalues')) {
            let prev = this.getElementsByClassName('displayColor');

            prev[0].style.backgroundColor = this.getAttribute('value') ?? '#008dcd';
            prev[1].style.backgroundColor = this.getAttribute('previousvalue') ?? this.getAttribute('value');
        } else {
            this.getElementsByClassName('previousColor').remove();
        }

        if (this.getAttribute('presets') == 'false') {
            document.getElementsByClassName('presets')[0].remove();
        }

        if (this.getAttribute('savetopresets') == 'false') {
            document.getElementsByClassName('presetsExpanded')[0].remove();
        }

    }
}

async function createPresets(el) {
    let standardColors = ['#FF0000', '#Ffa500', '#FFFF00', '#00ff00', '#ADD8E6', '#0000ff', '#A020F0', '#Ffc0cb', '#000000', '#ffffff'];
    let i;

    let expanded = el.parentNode.getElementsByClassName('presetsExpanded')[0];

    let saved = await localforage.getItem('presetColors');
    console.log(saved)
    if (saved != null) {
        standardColors = saved.concat(standardColors);
    } else {
        saved = [];
    }

    for (i of standardColors) {
        createPresetItem(el, i);
    }

    //create an arrow for expansion
    let arrow = document.createElement('button');
    arrow.classList.add('colorPresetItem');
    arrow.innerHTML = el.parentNode == expanded ? '+' : '-';

    arrow.addEventListener('click', function () {

        if (this.parentNode == expanded) { //save current colors
            saved.push(el.parentNode.getAttribute('value'));
            createPresetItem(el, el.parentNode.getAttribute('value'));

            localforage.setItem('presetColors', saved).then(function (value) {
            }).catch(function(err) {
                console.error(err);
            });

        } else {
            if (this.innerHTML == '-') {
                arrow.innerHTML = '+';
                expanded.style.display = 'none';
            } else {
                arrow.innerHTML = '-';
                expanded.style.display = 'grid';
            }
        }
    });

    el.appendChild(arrow);

}

function createPresetItem(el, color) {
    let item = document.createElement('button');
    item.classList.add('colorPresetItem');
    item.style.backgroundColor = color;

    item.addEventListener('click', function () {
        el.parentNode.setAttribute('previousvalue', el.parentNode.getAttribute('value')); // make this update depending on set outputtype
        el.parentNode.setAttribute('value', this.style.backgroundColor);

        el.parentNode.dispatchEvent(change);
    });

    el.appendChild(item);
}

registry.define("color-picker", ColorPicker);