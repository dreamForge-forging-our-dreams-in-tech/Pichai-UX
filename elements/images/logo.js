function generateDynamicIcon(image) {
    return new Promise((resolve) => {
        // Assume you have an HTML canvas element with the id "myCanvas"
        const canvas = document.createElement('canvas');
        const context = canvas.getContext("2d");

        const root = document.documentElement;

        let rgb = getComputedStyle(root).getPropertyValue('--primary');
        rgb = rgb.substring(3, rgb.length - 1);
        rgb = rgb.split(',');

        // Load your image onto the canvas
        let dynamicImage = new Image();
        dynamicImage.src = image.substring(5, image.length - 2); // Replace with the actual path to your image

        canvas.width = dynamicImage.width;
        canvas.height = dynamicImage.height;

        dynamicImage.onload = function () {
            // Draw the image on the canvas
            context.drawImage(dynamicImage, 0, 0);

            // Define the tolerance for color matching (adjust as needed)
            const colorTolerance = 240; // You can experiment with this value

            // Get the entire image data as an array of pixel data
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            // Iterate through each pixel
            for (let i = 0; i < imageData.data.length; i += 4) {
                const red = imageData.data[i];
                const green = imageData.data[i + 1];
                const blue = imageData.data[i + 2];

                // Check if the pixel is not black or white
                if (
                    red < colorTolerance ||
                    green < colorTolerance ||
                    blue < colorTolerance
                ) {
                    // Replace with your desired color (e.g., green)
                    imageData.data[i] = rgb[0]; // Red channel
                    imageData.data[i + 1] = rgb[1]; // Green channel
                    imageData.data[i + 2] = rgb[2]; // Blue channel
                }
            }

            // Put the modified pixel data back on the canvas
            context.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL());
        };
    });
}

// Create a class for the element
class Logo extends HTMLElement {
    static observedAttributes = ["color", "size"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        // Get the favicon link element
        const faviconLink = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut icon']");

        // Get the favicon URL
        const faviconUrl = faviconLink ? faviconLink.href : null;

        this.style.backgroundImage = this.src ?? `url("${faviconUrl}")`;

        if (!this.hasAttribute('dynamic') || this.getAttribute('dynamic') == 'true') {
            window.onload = async () => {
                console.log(await generateDynamicIcon(this.style.backgroundImage))
                this.style.backgroundImage = await generateDynamicIcon(this.style.backgroundImage);
            }
        }
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }
}

customElements.define("x-icon", Logo);