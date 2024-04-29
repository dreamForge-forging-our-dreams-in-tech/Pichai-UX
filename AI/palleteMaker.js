import ColorThief from './colorThief.js';

import { getTextColor } from './textColorFInder.js';

import { PichaiUX } from '../init.js';

function RGBToHSL(value) {
    let r = value[0];
    let g = value[1];
    let b = value[2];
    // Make r, g, and b fractions of 1
r /= 255;
g /= 255;
b /= 255;

// Find greatest and smallest channel values
let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;


  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `${h}, ${s}, ${l}`;
}

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

function generateContainerColor (colors) {
    let i;
    let newColors = [];

    for(i of colors) {
        let hsl = RGBToHSL(i).split(',');
        console.log(hsl)
        let h = hsl[0];
        let s = hsl[1] + '%';
        let l = String(Number(hsl[2]) + 17) + '%';

        newColors.push([h,s,l]);
    }

    return newColors;
}

async function generate3ColorPallete(options) {
        let colors = await getPallete(options);

        let position = options.extractionPosition;

        const root = document.documentElement;
        root.style.setProperty('--primary', `rgb(${colors[position].toString()})`);
        root.style.setProperty('--secondairy', `rgb(${colors[position + 4].toString()})`);
        root.style.setProperty('--tertiary', `rgb(${colors[position + 9].toString()})`);

        root.style.setProperty('--primaryTextColor', getTextColor(colors[0]));
        root.style.setProperty('--secondairyTextColor', getTextColor(colors[4]));
        root.style.setProperty('--tertiaryTextColor', getTextColor(colors[9]));

        let hls = generateContainerColor(colors);

        root.style.setProperty('--primaryContainer', `hsl(${hls[position].toString()})`);
        root.style.setProperty('--secondairyContainer', `hsl(${hls[position + 4].toString()})`);
        root.style.setProperty('--tertiaryContainer', `hsl(${hls[position + 9].toString()})`);
}

export { generate3ColorPallete };