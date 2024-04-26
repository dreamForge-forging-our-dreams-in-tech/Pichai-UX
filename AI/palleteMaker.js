import ColorThief from './colorThief.js';

import { getTextColor } from './textColorFInder.js';

import { PichaiUX } from '../init.js';

function getPallete(options) {
    return new Promise((resolve) => {
        if (String(options.source).includes('#')) {

        } else {
            const colorThief = new ColorThief();
            const img = new Image();

            img.addEventListener('load', () => {
                resolve(colorThief.getPalette(img));
            });

            img.crossOrigin = 'Anonymous';
            img.src = options.source;
        }
    });
}

async function generate3ColorPallete(options) {
        let colors = await getPallete(options);

        let position = options.extractionPosition;

        const root = document.documentElement;
        root.style.setProperty('--primary', `rgb(${colors[position].toString()})`);
        root.style.setProperty('--secondairy', `rgb(${colors[position + 5].toString()})`);
        root.style.setProperty('--tertiary', `rgb(${colors[position + 5].toString()})`);

        root.style.setProperty('--primaryTextColor', getTextColor(colors[0]));
        root.style.setProperty('--secondairyTextColor', getTextColor(colors[4]));
        root.style.setProperty('--tertiaryTextColor', getTextColor(colors[9]));
}

export { generate3ColorPallete };