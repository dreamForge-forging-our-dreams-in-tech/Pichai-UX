import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';
import '../../utils/localFOrage.js';
import { optimizeTextColor } from '../../utils/extraFunctions.js';

import { rgbaToHex, rgbToCmyk, RGBToHSL } from '../../utils/color/converters.js';

const change = new Event("change"); // new change event for the color picker

let count = 0; // counter to avoid event being dispatched multiple times, needs a beter solution

// Create a class for the element
class ColorPicker extends HTMLElement {
    /** @description 
* The color picker element allows you to easily select colors.
*/

    /** @usage 
     * When the user needs to select a color
    */

    static observedAttributes = ["alpha", "previousvalue", "value", "outputtype", "showpreviousvalues", "presets", "savetopresets"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        let i;

        createPreviousView(this);

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
        doAttributeCheck('boolean', 'alpha', this.getAttribute('alpha'));

        let prev = this.getElementsByClassName('displayColor');
        optimizeTextColor(prev[0].parentNode);

        if (name === 'outputtype') {
            updateToOutputType(this);
        }

        if (name === 'value') {

            prev[0].style.backgroundColor = newValue;

            updateColors(this, prev[0].style.backgroundColor); // use backgroundColor so we dont need to use conversion functions for colors and can just make the code les mumbo jumbo
            count++;

            if (oldValue != newValue && count == 2) {
                count = 0;
                console.log('test')
                updateToOutputType(this);

                this.setAttribute('previousvalue', oldValue);
                this.dispatchEvent(change);
            }
        }

        if (name === 'previousvalue') {
            prev[1].style.backgroundColor = newValue;
        }

        if (name === 'alpha' && newValue == 'true') {
            let picker = document.getElementsByClassName('picker')[0];
            
            createHeader('Alpha', picker);
            createSlider('a', picker);
        } else if(name === 'alpha' && newValue == 'false') {
            document.getElementById('a').remove();
            document.getElementById('Alpha').remove();
        }

        if (name === 'showpreviousvalues' && newValue === 'false') {
            this.getElementsByClassName('displayColor')[1].remove();

        } else if (name === 'showpreviousvalues' && newValue === 'true') {
            this.getElementsByClassName('previousColor')[0].remove();
                createPreviousView(this);
        }

        if (name === 'presets' && newValue === 'false') {
            document.getElementsByClassName('presets')[0].remove();
        } else if (name === 'presets' && newValue === 'true') {
            let presets = this.getElementsByClassName('presets')[0];

            if (!presets) {
                createPresetsView(this);
            }
        }

        if (name === 'savetopresets' && newValue === 'false') {
            document.getElementById('expandButton').style.display = 'none';
        } else if (name === 'savetopresets' && newValue === 'true') {
            document.getElementById('expandButton').style.display = 'block';
        }

    }
}

async function createPresets(el) {
    let standardColors = ['hsl(0, 95%, 60.8%)', 'hsl(35.7, 95%, 60.8%)', 'hsl(61.6, 95%, 60.8%)', 'hsl(126.3, 95%, 60.8%)', 'hsl(180.9, 95%, 60.8%)', 'hsl(243.8, 95%, 60.8%)', 'hsl(272.5, 95%, 60.8%)', 'hsl(304.4, 95%, 60.8%)', 'hsl(0, 0%, 60.8%)', 'hsl(0, 0%, 100%)', 'hsl(0, 0%, 0%)'];
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
    arrow.id = 'expandButton';

    arrow.addEventListener('click', function () {
        let expanded = el.parentNode.getElementsByClassName('presetsExpanded')[0];

        if (this.parentNode == expanded) { //save current color
            let pre = el.parentNode.getElementsByClassName('presets')[0];

            saved.push(el.parentNode.getAttribute('value'));
            createPresetItem(el, el.parentNode.getAttribute('value')); // adds the saved preset item to the expanded presets tab
            createPresetItem(pre, el.parentNode.getAttribute('value'));// adds the saved preset item to the presets tab

            localforage.setItem('presetColors', saved).then(function (value) {
            }).catch(function (err) {
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
        el.parentNode.setAttribute('value', this.style.backgroundColor);
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
    previousHolder.append(current);

    if (el.getAttribute('showpreviousvalues') == 'true' || !el.hasAttribute('showpreviousvalues')) { // create the previous color section of the color picker

        let previous = document.createElement('paragraph');
        previous.classList.add('displayColor');
        previous.style.backgroundColor = el.getAttribute('previousvalue') ?? el.getAttribute('value');
        previous.innerHTML = 'Previous';

        previous.addEventListener('click', function () {
            el.setAttribute('value', this.style.backgroundColor);
        });

        previousHolder.append(previous);
    }

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

function createColorPicker(el) {
    let picker = document.createElement('article');
    picker.classList.add('picker');

    createHeader('Red', picker);
    createSlider('r', picker);

    createHeader('Green', picker);
    createSlider('g', picker);

    createHeader('Blue', picker);
    createSlider('b', picker);

    if (el.getAttribute('alpha') == 'true') {
        createHeader('Alpha', picker);
        createSlider('a', picker);
    }

    el.append(picker);
}

function createHeader(text, el) {
    let header = document.createElement('h4');
    header.innerHTML = text;
    header.id = text;

    el.append(header);
}

function createSlider(value, el) {
    let slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.step = '0.01';
    slider.max = value === 'a' ? 1 : 255;
    slider.id = value;

    slider.addEventListener('change', function () {
        let r = document.getElementById('r').value;
        let g = document.getElementById('g').value;
        let b = document.getElementById('b').value;
        let a = document.getElementById('a') ? document.getElementById('a').value : 1;

        //el.parentNode.setAttribute('previousvalue',  el.parentNode.getAttribute('value'));
        el.parentNode.setAttribute('value', `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${Math.round(a)})`);
    });

    slider.addEventListener('input', function () {
        let r = document.getElementById('r').value;
        let g = document.getElementById('g').value;
        let b = document.getElementById('b').value;
        let a = document.getElementById('a') ? document.getElementById('a').value : 1;

        let prev = el.parentNode.getElementsByClassName('displayColor');

        //el.parentNode.setAttribute('previousvalue',  el.parentNode.getAttribute('value'));
        prev[0].style.backgroundColor = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${Math.round(a)})`;
        prev[1].style.backgroundColor =  el.parentNode.getAttribute('value');
    });

    el.append(slider);
}

function updateColors(el, color) {
    let r = document.getElementById('r');
    let g = document.getElementById('g');
    let b = document.getElementById('b');
    let a;

    let rgb = color.substring(4, color.length - 1);
    rgb = rgb.split(',');

    r.value = parseInt(rgb[0]);
    g.value = parseInt(rgb[1]);
    b.value = parseInt(rgb[2]);

    if (document.getElementById('a')) {
        a = isNaN(parseInt(rgb[3])) ? 1 : parseInt(rgb[3]);
        document.getElementById('a').value = a;
    } else {
        a = 1;
    }
}

function updateToOutputType(el) {
    let type = el.getAttribute('outputtype');
    let val = el.getAttribute('value');

    if (type == 'rgb' || type == null) {

    } else if (type == 'hex'  && !val.includes('#')) {
        el.setAttribute('value', rgbaToHex(val));
    } else if(type == 'hsl' && !val.includes('hsl')) {
        el.setAttribute('value', RGBToHSL(val));
    } else if(type == 'cmyk' && !val.includes('cmyk')) {
        el.setAttribute('value', rgbToCmyk(val));
    }
}

registry.define("color-picker", ColorPicker);