import { findColorClass } from '../../AI/colorClassFinder.js';
import { getTextColor } from '../../AI/textColorFInder.js';

import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

function generateDynamicIcon(image, radius = 360) {
    return new Promise((resolve) => {
        // Assume you have an HTML canvas element with the id "myCanvas"
        const canvas = document.createElement('canvas');
        const context = canvas.getContext("2d", { willReadFrequently: true });

        // Load your image onto the canvas
        let dynamicImage = new Image();
        dynamicImage.crossOrigin = 'anonymous';

        dynamicImage.src = image; //idk substring 6 breaks cod for smr

        dynamicImage.onload = function () {
            const root = document.documentElement;

            let rgb = getComputedStyle(root).getPropertyValue('--primary');

            rgb = rgb.substring(5, rgb.length - 1);
            rgb = rgb.split(',');

            canvas.width = dynamicImage.width;
            canvas.height = dynamicImage.height;

            context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`; // so it works with the transparency mode
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.save();
            // Draw the image on the canvas
            context.translate(canvas.width / 2, canvas.height / 2)
            context.rotate(0.55);
            context.drawImage(dynamicImage, -dynamicImage.width / 2, -dynamicImage.height / 2);

            // Define the tolerance for color matching (adjust as needed)
            const colorTolerance = 240; // You can experiment with this value

            // Get the entire image data as an array of pixel data
            let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            let textColor = getComputedStyle(root).getPropertyValue('--primaryTextColor') == 'black' ? 0 : 255;

            let colorClass;

            // Iterate through each pixel
            for (let i = 0; i < imageData.data.length; i += 4) {
                const red = imageData.data[i];
                const green = imageData.data[i + 1];
                const blue = imageData.data[i + 2];

                // Check if the pixel is not theme color

                if (
                    !(red == rgb[0] || green == rgb[1] || blue == rgb[2])
                ) {
                    // Replace with your desired color (e.g., green)
                    imageData.data[i] = colorClass != findColorClass(red, green, blue) ? textColor : rgb[0]; // Red channel
                    imageData.data[i + 1] = colorClass != findColorClass(red, green, blue) ? textColor : rgb[1]; // Green channel
                    imageData.data[i + 2] = colorClass != findColorClass(red, green, blue) ? textColor : rgb[2]; // Blue channel

                    colorClass = findColorClass(red, green, blue);
                } else {
                    imageData.data[i] = colorClass == findColorClass(red, green, blue) ? textColor : rgb[0];
                    imageData.data[i + 1] = colorClass == findColorClass(red, green, blue) ? textColor : rgb[1];
                    imageData.data[i + 2] = colorClass == findColorClass(red, green, blue) ? textColor : rgb[2];

                    colorClass = 'themeColor';
                }
            }

            context.setTransform(1, 0, 0, 1, 0, 0); // This resets the canvas to its original state

            context.translate(-canvas.width / 5.0, canvas.height / 3.0);
            context.rotate(-0.55);
            context.putImageData(imageData, 0, 0);

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillRect(0, 0, canvas.width, canvas.height);

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const index = (y * canvas.width + x) * 4;
                    const red = imageData.data[index];
                    const green = imageData.data[index + 1];
                    const blue = imageData.data[index + 2];

                    // Check if the pixel is not the theme color
                    if (red === textColor && green === textColor && blue === textColor) {
                        // Replace the pixel with a 5x5 square
                        context.fillStyle = textColor == 255 ? 'white' : 'black'; // Set your desired color here
                        context.fillRect(x, y, 4, 4); // Draw a 5x5 square
                    }
                }
            }

            context.strokeStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            context.lineWidth = -100; // Set border width

            context.beginPath();
            context.roundRect(0, 0, canvas.width, canvas.height, radius);
            context.stroke();

            resolve(canvas.toDataURL());
        };
    });
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
            let newIcon = await generateDynamicIcon(faviconUrl, parseInt(radius));
            this.style.backgroundImage = `url(${newIcon})`;

            window.onload = async () => {
                let newIcon = await generateDynamicIcon(faviconUrl);
                this.style.backgroundImage = `url(${newIcon})`;
            }
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