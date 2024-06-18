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
            createPreviousView(this);
        }

        if (this.getAttribute('presets') == 'true' || !this.hasAttribute('presets')) { // create the previous color section of the color picker
            createPresetsView(this);
        }

        if (this.getAttribute('savetopresets') == 'true' || !this.hasAttribute('savetopresets')) { // create the previous color section of the color picker
            createPresetsExpansionView(this);
        }

        createColorPicker(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('boolean', 'presets', this.getAttribute('presets'));
        doAttributeCheck('boolean', 'showpreviousvalues', this.getAttribute('showpreviousvalues'));
        doAttributeCheck('boolean', 'savetopresets', this.getAttribute('savetopresets'));
        doAttributeCheck('string', 'value', this.getAttribute('value'));
        doAttributeCheck('string', 'previousvalue', this.getAttribute('previousvalue'));
        doAttributeCheck('string', 'outputtype', this.getAttribute('outputtype'));

        if (name === 'showpreviousvalues' && newValue === 'true') {
            let prev = this.getElementsByClassName('displayColor')[0];

            if(!prev) {
                createPreviousView(this);
            }

            prev[0].style.backgroundColor = this.getAttribute('value') ?? '#008dcd';
            prev[1].style.backgroundColor = this.getAttribute('previousvalue') ?? this.getAttribute('value');
        } else {
            this.getElementsByClassName('previousColor').remove();
        }

        if (name === 'presets' && newValue === 'false') {
            document.getElementsByClassName('presets')[0].remove();
        } else {
            let presets = this.getElementsByClassName('presets')[0];

            if(!presets) {
            createPresetsView(this);
            }
        }

        if (name === 'savetopresets' && newValue === 'false') {
            document.getElementsByClassName('presetsExpanded')[0].remove();
        } else {
            let expanded = this.getElementsByClassName('presetsExpanded')[0];

            if(!expanded) {
            createPresetsExpansionView(this);
            }
        }

    }
}

async function createPresets(el) {
    let standardColors = ['#FF0000', '#Ffa500', '#FFFF00', '#00ff00', '#ADD8E6', '#0000ff', '#A020F0', '#Ffc0cb', '#000000', '#ffffff'];
    let i;

    let saved = await localforage.getItem('presetColors');
    if (saved != null) {
        standardColors = standardColors.concat(saved);
    } else {
        saved = [];
    }

    for (i of standardColors) {
        createPresetItem(el, i);
    }

    //create an arrow for expansion
    let arrow = document.createElement('button');
    arrow.classList.add('colorPresetItem');
    arrow.innerHTML = '+';

    arrow.addEventListener('click', function () {
        let expanded = el.parentNode.getElementsByClassName('presetsExpanded')[0];

        if (this.parentNode == expanded) { //save current color
            let pre = el.parentNode.getElementsByClassName('presets')[0];
            
            saved.push(el.parentNode.getAttribute('value'));
            createPresetItem(el, el.parentNode.getAttribute('value'));
            createPresetItem(pre, el.parentNode.getAttribute('value'));

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

    el.prepend(item);
}

function createPreviousView(el) {
    let previousHolder = document.createElement('article');
    previousHolder.classList.add('previousColor');

    let current = document.createElement('paragraph');
    current.classList.add('displayColor');
    current.style.backgroundColor = el.getAttribute('value') ?? '#008dcd';
    current.innerHTML = `Current`;

    let previous = document.createElement('paragraph');
    previous.classList.add('displayColor');
    previous.style.backgroundColor = el.getAttribute('previousvalue') ?? el.getAttribute('value');
    previous.innerHTML = 'Previous';

    previousHolder.append(current, previous);
    el.appendChild(previousHolder);
}

function createPresetsView(el) {
    let presetsHolder = document.createElement('article');
    presetsHolder.classList.add('presets');

    createPresets(presetsHolder);

    el.appendChild(presetsHolder);
}

function createPresetsExpansionView(el) {
    let presetsHolder = document.createElement('article');
    presetsHolder.classList.add('presetsExpanded');

    createPresets(presetsHolder);

    el.appendChild(presetsHolder);
}

function createColorPicker (el) {
    let picker = document.createElement('article');
    picker.classList.add('picker');

    createHeader('Hue', picker);
    createSlider('h', picker);

    createHeader('Saturation', picker);
    createSlider('s', picker);

    createHeader('Lightness', picker);
    createSlider('l', picker);

    el.append(picker);
}

function createHeader(text, el) {
    let header = document.createElement('h4');
    header.innerHTML = text;

    el.append(header);
}

function createSlider(value, el) {
    let slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = value === 'h' ? 360 : 100;
    slider.id = value;

    slider.addEventListener('input', function () {
        console.log('ee')
        let h = document.getElementById('h').value;
        let s = document.getElementById('s').value;
        let l = document.getElementById('l').value;

        el.parentNode.setAttribute('previousvalue',  el.parentNode.getAttribute('value'));
        el.parentNode.setAttribute('value', `hsl(${h}deg ${s}% ${l}%)`);
    });

    el.append(slider);
}

registry.define("color-picker", ColorPicker);