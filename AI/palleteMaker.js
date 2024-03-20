import ColorThief from './colorThief.js';

import { PichaiUX } from '../init.js';

function getPallete(options) {
    return new Promise((resolve) => {
        if (String(options.source).includes('#')) {

        } else {
            const colorThief = new ColorThief();
            const img = new Image();

            img.addEventListener('load', () => {
                colors = colorThief.getPalette(img);
                resolve(colors);
            });

            img.crossOrigin = 'Anonymous';
            img.src = options.source;
        }
    });
}

async function generate3ColorPallete(options) {
    let colors = await getPallete(options);

    const root = document.documentElement;
    let primary = colors[0].replaceAll('[', '(').replaceAll(']', ')');
    let secondairy = colors[4].replaceAll('[', '(').replaceAll(']', ')');
    let tertiary = colors[9].replaceAll('[', '(').replaceAll(']', ')');

    root.style.setProperty('--primary', `rgb ${primary}`);
    root.style.setProperty('--secondairy', `rgb ${secondairy}`);
    root.style.setProperty('--tertiary', `rgb ${tertiary}`);
}

export { generate3ColorPallete };