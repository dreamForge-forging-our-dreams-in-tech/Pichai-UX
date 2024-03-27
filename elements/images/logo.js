import { findColorClass } from '../../AI/colorClassFinder.js';

function generateDynamicIcon(image) {
    return new Promise((resolve) => {
        // Assume you have an HTML canvas element with the id "myCanvas"
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas)
        const context = canvas.getContext("2d");

        // Load your image onto the canvas
        let dynamicImage = new Image();
        dynamicImage.src = image; //idk substring 6 breaks cod for smr

        dynamicImage.onload = function () {
            const root = document.documentElement;

            let rgb = getComputedStyle(root).getPropertyValue('--primary');

            rgb = rgb.substring(4, rgb.length - 1);
            rgb = rgb.split(',');

            canvas.width = dynamicImage.width;
            canvas.height = dynamicImage.height;

            context.fillStyle = getComputedStyle(root).getPropertyValue('--primary');
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the image on the canvas
            context.drawImage(dynamicImage, 0, 0);

            // Define the tolerance for color matching (adjust as needed)
            const colorTolerance = 240; // You can experiment with this value

            // Get the entire image data as an array of pixel data
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            let colorClass;
            context.fillStyle = '#000';
            let lineThicknes = 1600;
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
                    imageData.data[i] = colorClass != findColorClass(red, green, blue) ? 255 : rgb[0]; // Red channel
                    imageData.data[i + 1] = colorClass != findColorClass(red, green, blue) ? 255 : rgb[1]; // Green channel
                    imageData.data[i + 2] = colorClass != findColorClass(red, green, blue) ? 255 : rgb[2]; // Blue channel

                    if(colorClass != findColorClass(red, green, blue)) {
                        console.log(i)
                        context.fillRect(i,i, lineThicknes, lineThicknes);
                    }

                    colorClass = findColorClass(red, green, blue);
                } else {
                    // Replace with your desired color (e.g., green)
                    imageData.data[i] = colorClass == findColorClass(red, green, blue) ? 255 : rgb[0]; // Red channel
                    imageData.data[i + 1] = colorClass == findColorClass(red, green, blue) ? 255 : rgb[1]; // Green channel
                    imageData.data[i + 2] = colorClass == findColorClass(red, green, blue) ? 255 : rgb[2]; // Blue channel

                    if(colorClass == findColorClass(red, green, blue)) {
                        context.fillRect(i,i, lineThicknes, lineThicknes);
                    }

                    colorClass = 'themeColor';
                }
            }
            context.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL());
        };
    });
}

// Create a class for the element
class Logo extends HTMLElement {
    static observedAttributes = ["src", "dynamic"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        // Get the favicon link element
        const faviconLink = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut icon']");

        // Get the favicon URL
        const faviconUrl = faviconLink ? faviconLink.href : null;

        if (!this.hasAttribute('dynamic') || this.getAttribute('dynamic') == 'true') {
            window.onload = async () => {
                let newIcon = await generateDynamicIcon(faviconUrl);
                this.style.backgroundImage = `url(${newIcon})`;
            }
        } else {
            this.style.backgroundImage = this.src ?? `url("${faviconUrl}")`;
        }
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Get the favicon link element
        const faviconLink = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut icon']");

        // Get the favicon URL
        const faviconUrl = faviconLink ? faviconLink.href : null;

        if (!this.hasAttribute('dynamic') || this.getAttribute('dynamic') == 'true') {
            window.onload = async () => {
                let newIcon = await generateDynamicIcon(faviconUrl);
                this.style.backgroundImage = `url(${newIcon})`;
            }
        } else {
            this.style.backgroundImage = this.src ?? `url("${faviconUrl}")`;
        }
    }
}

customElements.define("x-icon", Logo);

export { generateDynamicIcon };