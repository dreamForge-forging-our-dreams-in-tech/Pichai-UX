import ColorThief from './colorThief.js';

import { getTextColor } from './textColorFInder.js';

import { PichaiUX } from '../init.js';

const loaded = new Event("pichaiUXLoaded");

/**
 * Converts HSL color values to a hexadecimal color string.
 * @param {number} h - Hue (0-360).
 * @param {number} s - Saturation (0-100).
 * @param {number} l - Lightness (0-100).
 * @returns {string} Hexadecimal color string (e.g., "#aabbcc").
 */

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Converts a hexadecimal color string to an RGB array.
 * @param {string} hex - Hexadecimal color string (e.g., "#aabbcc").
 * @returns {string[]|null} Array of RGB values as strings, or null if invalid.
 */

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`.split(',') : null;
}

/**
 * Converts an RGB color array to an HSL string.
 * @param {number[]} value - Array containing RGB values [r, g, b].
 * @returns {string} HSL values as a comma-separated string (e.g., "120, 50, 60").
 */

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

/**
 * Generates a color palette from either an array of RGB colors or an image source.
 * @param {Object} options - Options for palette generation.
 * @param {string|Array} options.source - Image URL or array of RGB colors.
 * @returns {Promise<Array>} Promise resolving to an array of RGB colors.
 */

function getPallete(options) {
    return new Promise((resolve) => {
        if (options.source.length == 10) {// for generation for a array with 10 supplied rgb colors
            resolve(options.source);

        } else { // for color generation from an image
            //document.body.style.backgroundImage = `url(${options.source})`;

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

/**
 * Generates container colors by increasing the lightness of the given colors.
 * @param {Array} colors - Array of RGB or HSL color arrays.
 * @returns {Array} Array of HSL color arrays with increased lightness.
 */

function generateContainerColor(colors) {
    let i;
    let newColors = [];

    for (i of colors) {
        let hsl = String(i[2]).includes('%') ? i : RGBToHSL(i).split(',');;
        let h = hsl[0];
        let s = parseInt(hsl[1]) + '%';
        let l = String(parseInt(hsl[2]) + 20) + '%';

        newColors.push([h, s, l]);
    }

    return newColors;
}

/**
 * Generates additional sign colors (error, warning, note, check) based on given hues and a main color.
 * @param {number[]} hues - Array of hue values.
 * @param {number[]} color - Main color as an RGB array.
 * @returns {Array} Array of HSL color arrays for sign colors.
 */

function generateSignColors(hues, color) { // generateaa additional colors with the given hue mixed with the the given main color
    let i;
    let newColors = [];

    let hsl = RGBToHSL(color).split(',');

    let s = hsl[1] + '%';
    let l = String(Number(hsl[2])) + '%';

    for (i of hues) {
        let h = i;
        newColors.push([h, s, l]);
    }

    return newColors;
}

/**
 * Converts an array of HSL colors to their corresponding RGB values for text color calculation.
 * @param {Array} colors - Array of HSL color arrays.
 * @returns {Array} Array of RGB color arrays.
 */

function generateContainerTextColor(colors) {
    let i;
    let newColors = [];

    for (i of colors) {
        let hsl = hslToHex(parseInt(i[0]), parseInt(i[1]), parseInt(i[2]));
        let rgb = hexToRgb(hsl);

        newColors.push(rgb);
    }

    return newColors;
}

/**
 * Retrieves all elements on the page with a transparent background.
 * @returns {Element[]} Array of DOM elements with transparent backgrounds.
 */

function getTransparentBackgroundElements() { //gather all transparent elements that blur should ignore
    const allElements = document.querySelectorAll('*'); // Selects all elements on the page
    const transparentElements = [];

    allElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const bgColor = computedStyle.getPropertyValue('background-color');

        // Check if the computed background-color is transparent or rgba(0, 0, 0, 0)
        // Note: Browsers might return 'transparent' or 'rgba(0, 0, 0, 0)'
        if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
            transparentElements.push(element);
        }
    });

    return transparentElements;
}

/**
 * Generates and applies a 3-color palette to CSS variables for the UI, based on options and extracted colors.
 * @async
 * @param {Object} options - Options for palette generation and UI styling.
 * @param {string|Array} options.source - Image URL or array of RGB colors.
 * @param {number} options.transparency - Alpha value for color transparency.
 * @param {number} options.extractionPosition - Index for color extraction.
 * @param {string} options.contrast - CSS contrast value.
 * @param {number} options.wallpaperBlur - Blur amount for wallpaper.
 * @param {string} options.inversion - CSS inversion value.
 * @param {string} options.wallpaperBrightness - CSS brightness value.
 * @param {string} options.hueRotation - CSS hue-rotate value.
 * @param {string} options.wallpaperInversion - CSS inversion for wallpaper.
 * @param {string} options.wallpaperSize - CSS background-size value.
 * @param {string} options.wallpaperPosition - CSS background-position value.
 * @param {string} options.wallpaperRepeat - CSS background-repeat value.
 * @param {string} options.blur - Blur amount for elements.
 * @returns {Promise<void>} Resolves when palette is generated and applied.
 */

async function generate3ColorPallete(options) {
    if (options.hueRotation != '0') {
        options.source = 'https://lukeplays33.github.io/Pichai/assets/bg.jpeg'; // sets the wallpaper to a default image so that hue rotation will always be consistent
        document.body.style.backgroundImage = 'none'; // removes the background image so that the hue rotation can be applied correctly
    } else {
        options.source = window.localStorage.getItem(`${window.storageName}bgImageChange`);
    }

    let colors = await getPallete(options);
    colors = colors.concat(colors);

    const root = document.documentElement;

    let alpha = options.transparency;
    let position = Number(options.extractionPosition);

    root.style.setProperty('--contrast', options.contrast);
    root.style.setProperty('--wallpaperBlur', options.wallpaperBlur + 'px');
    root.style.setProperty('--inversion', options.inversion);
    root.style.setProperty('--wallpaperBrightness', options.wallpaperBrightness);
    root.style.setProperty('--hueRotation', options.hueRotation + 'deg');
    root.style.setProperty('--wallpaperInversion', options.wallpaperInversion);
    root.style.setProperty('--wallpaperSize', options.wallpaperSize);
    root.style.setProperty('--wallpaperPosition', options.wallpaperPosition);
    root.style.setProperty('--wallpaperRepeat', options.wallpaperRepeat);
    root.style.setProperty('--elementBlur', options.blur);

    root.style.setProperty('--primary', `rgba(${colors[position].join(',')}, ${alpha})`);
    root.style.setProperty('--secondairy', `rgba(${colors[position + 4].join(',')}, ${alpha})`);
    root.style.setProperty('--tertiary', `rgba(${colors[position + 9].join(',')}, ${alpha})`);

    root.style.setProperty('--primaryTextColor', getTextColor(colors[0]));
    root.style.setProperty('--secondairyTextColor', getTextColor(colors[4]));
    root.style.setProperty('--tertiaryTextColor', getTextColor(colors[9]));

    root.style.setProperty('--backgroundColor', `rgba(${colors[position].join(',')}, ${root.style.getPropertyValue('--primaryTextColor') == 'white' ? 0.65 : 0.35})`); // generates a background color for the website based of the primary color

    let hls = generateContainerColor(colors);

    root.style.setProperty('--primaryContainer', `hsla(${hls[position].join(',')}, ${alpha})`);
    root.style.setProperty('--secondairyContainer', `hsla(${hls[position + 4].join(',')}, ${alpha})`);
    root.style.setProperty('--tertiaryContainer', `hsla(${hls[position + 9].join(',')}, ${alpha})`);

    let textColors = generateContainerTextColor(hls);

    root.style.setProperty('--primaryContainerTextColor', `${getTextColor(textColors[position])}`);
    root.style.setProperty('--secondairyContainerTextColor', `${getTextColor(textColors[position + 4])}`);
    root.style.setProperty('--tertiaryContainerTextColor', `${getTextColor(textColors[position + 9])}`);

    let signColors = generateSignColors([0, 61, 238, 131], colors[0]);

    root.style.setProperty('--error', `hsla(${signColors[0].join(',')}, ${alpha})`);
    root.style.setProperty('--warning', `hsla(${signColors[1].join(',')}, ${alpha})`);
    root.style.setProperty('--note', `hsla(${signColors[2].join(',')}, ${alpha})`);
    root.style.setProperty('--check', `hsla(${signColors[3].join(',')}, ${alpha})`);

    let signTextColors = generateContainerTextColor(signColors);

    root.style.setProperty('--errorTextColor', `${getTextColor(signTextColors[0])}`);
    root.style.setProperty('--warningTextColor', `${getTextColor(signTextColors[1])}`);
    root.style.setProperty('--noteTextColor', `${getTextColor(signTextColors[2])}`);
    root.style.setProperty('--checkTextColor', `${getTextColor(signTextColors[3])}`);

    let signContainerColors = generateContainerColor(signColors);

    root.style.setProperty('--errorContainer', `hsla(${signContainerColors[0].join(',')}, ${alpha})`);
    root.style.setProperty('--warningContainer', `hsla(${signContainerColors[1].join(',')}, ${alpha})`);
    root.style.setProperty('--noteContainer', `hsla(${signContainerColors[2].join(',')}, ${alpha})`);
    root.style.setProperty('--checkContainer', `hsla(${signContainerColors[3].join(',')}, ${alpha})`);

    let signContainerTextColors = generateContainerTextColor(signContainerColors);

    root.style.setProperty('--errorContainerTextColor', `${getTextColor(signContainerTextColors[0])}`);
    root.style.setProperty('--warningContainerTextColor', `${getTextColor(signContainerTextColors[1])}`);
    root.style.setProperty('--noteContainerTextColor', `${getTextColor(signContainerTextColors[2])}`);
    root.style.setProperty('--checkContainerTextColor', `${getTextColor(signContainerTextColors[3])}`);

    window.setTimeout(() => { // temporary timeout to dispatch event later, because right now it happens correctly but too fast.
        window.dispatchEvent(loaded); // dispatches the pichaiUXLoaded event to let the user/developer know that pichai ux has been loaded and is ready to use.
    }, 600);

    window.setInterval(() => {
        // add a blur effect to all elements that are not transparent
        const elementsWithTransparentBg = getTransparentBackgroundElements();
        let allElements = document.querySelectorAll('*');
        let i;

        if (elementsWithTransparentBg.length > 0) {
            // You can iterate through them and do something, e.g., add a border for visibility
            for (i of allElements) {
                if (elementsWithTransparentBg.includes(i) || i == document.documentElement) { } else {
                    i.style.backdropFilter = `blur(${parseInt(options.blur)}px)`; //add the blur effect
                    //console.log(parseInt(options.blur))
                }
            }
        } else {
            console.log('No elements found with explicitly transparent background.');
        }
    }, 500);

}

export { generate3ColorPallete };