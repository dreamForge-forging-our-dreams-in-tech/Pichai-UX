import ColorThief from './colorThief.js';

import { PichaiUX } from '../init.js';

let colors;

async function generate3ColorPallete(options) {
    if(String(options.source).includes('#')) {

    } else {
        const colorThief = new ColorThief();
        const img = new Image();
    
        img.addEventListener('load', function () {
            colors = await colorThief.getPalette(img);
            console.log(colors);
        });
    
        img.crossOrigin = 'Anonymous';
        img.src = options.source;
    }

    const root = document.documentElement;
    let primary = colors[0].replaceAll('[','(').replaceAll(']',')');
    let secondairy = colors[4].replaceAll('[','(').replaceAll(']',')');
    let tertiary = colors[9].replaceAll('[','(').replaceAll(']',')');

    root.style.setProperty('--primary', `rgb ${primary}`);
    root.style.setProperty('--secondairy', `rgb ${secondairy}`);
    root.style.setProperty('--tertiary', `rgb ${tertiary}`);
}

    export { generate3ColorPallete };