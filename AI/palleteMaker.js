import ColorThief from '../node_modules/colorthief/dist/color-thief.mjs'

import { PichaiUX } from '../init.js';

let colors;

function generate3ColorPallete(options) {
    if(String(options.source).includes('#')) {

    } else {
        const colorThief = new ColorThief();
        const img = new Image();
    
        img.addEventListener('load', function () {
            colors = colorThief.getColor(img);
            console.log(colors);
        });
    
        img.crossOrigin = 'Anonymous';
        img.src = options.source;
    }
}

    export { generate3ColorPallete };