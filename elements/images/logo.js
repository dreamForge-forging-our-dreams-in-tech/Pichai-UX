
import { findColorClass } from '../../AI/colorClassFinder.js';

import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

import { varExists } from '../../utils/cssVars.js';

import '../../utils/localFOrage.js';

let rgb;

let pixelSize = 2.7; // og:6 size of the pixel squares that are drawn on the canvas
let size = 90; //og 224 // size of the canvas or image, this should be a square image

let step = 1; // adjust for performance/speed
let phase = 0; // 0 = first loop, 1 = second loop

function setTranslate(canvas) {
    canvas.width = size;
    canvas.height = size;
}

function deTranslate(context) {
    context.setTransform(1, 0, 0, 1, 0, 0); // This resets the canvas to its original state
}

async function generateDynamicIcon(image, element) {

    await varExists('--primary');

    return new Promise((resolve) => {
        //create 2 canvases 1 for reading and 1 for rendering the icon properly
        const canvas = document.createElement('canvas');
        element.replaceWith(canvas);
        const context = canvas.getContext("2d", { willReadFrequently: true });

        const canvas2 = document.createElement('canvas');
        const context2 = canvas2.getContext("2d", { willReadFrequently: true });


        // Load your image onto the canvas
        let dynamicImage = new Image();
        dynamicImage.crossOrigin = 'anonymous';
        dynamicImage.referrerPolicy = 'no-referrer'; // to avoid CORS issues
        dynamicImage.decoding = 'async'; // to improve performance
        dynamicImage.src = image;

        dynamicImage.onload = function () {
            const root = document.documentElement;

            rgb = getComputedStyle(root).getPropertyValue('--primary');

            rgb = rgb.substring(5, rgb.length - 1);
            rgb = rgb.split(',');

            setTranslate(canvas);
            context.drawImage(dynamicImage, 0, 0, size, size);

            setTranslate(canvas2);

            // Get the entire image data as an array of pixel data
            let imageData = context.getImageData(0, 0, size, size);
            let textColor = getComputedStyle(root).getPropertyValue('--primaryTextColor') == 'rgb(255, 255, 255)' ? 'black' : 'white';

            let colorClass;

            deTranslate(context);
            deTranslate(context2);

            let x, y;

            const interval = setInterval(() => {
                if (phase === 0) {
                    const index = (y * canvas.width + x) * 4;
                    const red = imageData.data[index];
                    const green = imageData.data[index + 1];
                    const blue = imageData.data[index + 2];

                                    console.log(inndex)

                    if (colorClass !== findColorClass(red, green, blue)) {
                        context2.fillStyle = textColor;
                        context2.fillRect(x, y, pixelSize, pixelSize);
                        colorClass = findColorClass(red, green, blue);
                    }

                    x += step;
                    if (x >= canvas.width) {
                        x = 0;
                        y += step;
                    }
                    if (y >= canvas.height) {
                        // Move to second loop
                        phase = 1;
                        x = 0;
                        y = 0;
                    }
                } else if (phase === 1) {
                    const index = (y * canvas.width + x) * 4;
                    const red = imageData.data[index];
                    const green = imageData.data[index + 1];
                    const blue = imageData.data[index + 2];

                    if (colorClass !== findColorClass(red, green, blue)) {
                        context2.fillStyle = textColor;
                        context2.fillRect(x, y, pixelSize, pixelSize);
                        colorClass = findColorClass(red, green, blue);
                    }

                    y += step;
                    if (y >= canvas.width) {
                        y = 0;
                        x += step;
                    }
                    if (x >= canvas.height) {
                        clearInterval(interval);

                        context.clearRect(-2, -2, size + 5, size + 5);

                        context.drawImage(canvas2, 0, 0);

                        resolve(canvas.toDataURL());
                    }
                }
            }, 0); // You can set this to a small value like 1 or 5 for visible delay
        };
    });
}

async function setDynamicIcon(img, faviconUrl) {
    let newIcon = await generateDynamicIcon(faviconUrl, img);
    img.style.backgroundImage = `url(${newIcon})`;
}

// Create a class for the element
class Logo extends HTMLElement {
    /** @description 
* The x-icon element uses AI to generate dynamic icons so your icon works together with the theme.
* Aditionally you can use custom icons or disable the dynamic icons future.
*/

    /** @usage 
     * displaying the favIcon
     * creating themed logo's or icons
    */

    static observedAttributes = ["src", "dynamic"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        // Get the favicon link element
        const faviconLink = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut icon']");

        // Get the favicon URL
        let faviconUrl = faviconLink ? faviconLink.href : null;
        if (this.hasAttribute('src')) {
            faviconUrl = this.getAttribute('src');
        }

        this.style.backgroundImage = `url("${faviconUrl}")`; // display standard iamage till dynamic finished loading or an error occured

        if (!this.hasAttribute('dynamic') || this.getAttribute('dynamic') == 'true') {
            setDynamicIcon(this, faviconUrl);
        }

    }

    async attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('string', 'src', this.getAttribute('src'));
        doAttributeCheck('boolean', 'dynamic', this.getAttribute('dynamic'));

        this.connectedCallback();
    }
}

registry.define("x-icon", Logo);

export { generateDynamicIcon };
