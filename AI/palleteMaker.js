import ColorThief from './colorThief.js';

import { getTextColor } from './textColorFInder.js';

import { PichaiUX } from '../init.js';

function hslToRgb(h, s, l) {
    h = h / 100;
    s = s / 100;
    l = l / 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

function RGBToHSL(value) {
    let r = value[0];
    let g = value[1];
    let b = value[2];
    // Make r, g, and b fractions of 1
    r = r / 255;
    g = g / 255;
    b = b / 255;

    // Find greatest and smallest channel values
    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;

    let h = 0;
    let s = 0;
    let l = (cmax + cmin) / 2;

    // Calculate hue
    if (delta === 0) {
        h = 0; // No difference
    } else if (cmax === r) {
        h = ((g - b) / delta) % 6;
    } else if (cmax === g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) {
        h += 360;
    }

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Convert to percentage
    s = Math.round(s * 100);
    l = Math.round(l * 100);

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
        let h = hsl[0];
        let s = hsl[1] + '%';
        let l = String(Number(hsl[2]) + 25) + '%';

        newColors.push([h,s,l]);
    }

    return newColors;
}

function generateContainerTextColor (colors) {
    let i;
    let newColors = [];

    for(i of colors) {
        let rgb = hslToRgb(colors[0], colors[1], colors[2]);

        console.log(rgb)

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

        let textColors = generateContainerTextColor(hls);

        root.style.setProperty('--primaryContainerTextColor', `hsl(${hls[position].toString()})`);
        root.style.setProperty('--secondairyContainerTextColor', `hsl(${hls[position + 4].toString()})`);
        root.style.setProperty('--tertiaryContainerTextColor', `hsl(${hls[position + 9].toString()})`);
}

export { generate3ColorPallete };