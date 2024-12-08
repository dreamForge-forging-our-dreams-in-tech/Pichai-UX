import { findColorClass } from '../../AI/colorClassFinder.js';
import { getTextColor } from '../../AI/textColorFInder.js';

import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

import { varExists } from '../../utils/cssVars.js';

function setTranslate(canvas, dynamicImage, context) {
    canvas.width = dynamicImage.width;
    canvas.height = dynamicImage.height;

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
}

function deTranslate(canvas, dynamicImage, context) {
    context.setTransform(1, 0, 0, 1, 0, 0); // This resets the canvas to its original state
    context.translate(-3, -3);
}

async function generateDynamicIcon(image, radius = 360) {
    return new Promise((resolve) => {
        // Assume you have an HTML canvas element with the id "myCanvas"
        const canvas = document.createElement('canvas');
        const context = canvas.getContext("2d", { willReadFrequently: true });

        const canvas2 = document.createElement('canvas');
        const context2 = canvas2.getContext("2d", { willReadFrequently: true });


        // Load your image onto the canvas
        let dynamicImage = new Image();
        dynamicImage.crossOrigin = 'anonymous';

        dynamicImage.src = image; //idk substring 6 breaks cod for smr

        dynamicImage.onload = function () {
            const root = document.documentElement;

            let rgb = getComputedStyle(root).getPropertyValue('--primary');

            rgb = rgb.substring(5, rgb.length - 1);
            rgb = rgb.split(',');

            setTranslate(canvas, dynamicImage, context);
            context.drawImage(dynamicImage, -dynamicImage.width / 2, -dynamicImage.height / 2);
            
            setTranslate(canvas2, dynamicImage, context2);


            // Get the entire image data as an array of pixel data
            let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            let textColor = getComputedStyle(root).getPropertyValue('--primaryTextColor') == 'black' ? 0 : 255;

            let colorClass;

            deTranslate(canvas, dynamicImage, context);
            deTranslate(canvas2, dynamicImage, context2);

            let x,y;
            
            for (y = 0; y < canvas.height; y++) {
                for (x = 0; x < canvas.width; x++) {
                    const index = (y * canvas.width + x) * 4;
                    const red = imageData.data[index];
                    const green = imageData.data[index + 1];
                    const blue = imageData.data[index + 2];

                    context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`; // Set your desired color here
                    context.fillRect(x, y, 1, 1); // Draw a 5x5 square

                    if (colorClass != findColorClass(red, green, blue)) {
                        // Replace the pixel with a 5x5 square
                        context2.fillStyle = textColor == 255 ? 'white' : 'black'; // Set your desired color here
                        context2.fillRect(x, y, 3, 3); // Draw a 5x5 square

                        colorClass = findColorClass(red, green, blue);
                    }
                }
            }

            context.drawImage(canvas2, 0, 0); 

            context.strokeStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            context.lineWidth = 46; // Set border width

            context.beginPath();
            context.roundRect(-15, -15, canvas.width + 35, canvas.height + 35, radius);
            context.stroke();

            resolve(canvas.toDataURL());
        };
    });
}

async function setDynamicIcon(img, faviconUrl, radius) {
    let newIcon = await generateDynamicIcon(faviconUrl, parseInt(radius));
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

        let radius = window.getComputedStyle(this)['border-radius']
        // Get the favicon link element
        const faviconLink = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut icon']");

        // Get the favicon URL
        let faviconUrl = faviconLink ? faviconLink.href : null;
        if (this.hasAttribute('src')) {
            faviconUrl = this.getAttribute('src');
        }

        this.style.backgroundImage = `url("${faviconUrl}")`; // display standard iamage till dynamic finished loading or an error occured

        if (!this.hasAttribute('dynamic') || this.getAttribute('dynamic') == 'true') {
            await varExists('--primary');
            setDynamicIcon(this, faviconUrl, radius);
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

// rule 14 is the cross origin  if there comes more issues 