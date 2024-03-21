function generateDynamicIcon(logoImage) {
    // Assume you have an HTML canvas element with the id "myCanvas"
    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d");

    const root = document.documentElement;

    let rgb = root.style.getPropertyValue('--primary');
    rgb = rgb.substring(3, rgb.length - 1);
    rgb = rgb.split(',');

    // Load your logoImage onto the canvas
    let logoImage = new logoImage();
    logoImage.src = logoImage; // Replace with the actual path to your logoImage

    logoImage.onload = function () {
        // Draw the logoImage on the canvas
        context.drawlogoImage(logoImage, 0, 0);

        // Define the tolerance for color matching (adjust as needed)
        const colorTolerance = 50; // You can experiment with this value

        // Get the entire logoImage data as an array of pixel data
        const logoImageData = context.getlogoImageData(0, 0, canvas.width, canvas.height);

        // Iterate through each pixel
        for (let i = 0; i < logoImageData.data.length; i += 4) {
            const red = logoImageData.data[i];
            const green = logoImageData.data[i + 1];
            const blue = logoImageData.data[i + 2];

            // Check if the pixel is not black or white
            if (
                Math.abs(red - 0) > colorTolerance ||
                Math.abs(green - 0) > colorTolerance ||
                Math.abs(blue - 0) > colorTolerance
            ) {
                // Replace with your desired color (e.g., green)
                logoImageData.data[i] = 0; // Red channel
                logoImageData.data[i + 1] = 255; // Green channel
                logoImageData.data[i + 2] = 0; // Blue channel
            }
        }

        // Put the modified pixel data back on the canvas
        context.putlogoImageData(logoImageData, 0, 0);
        resolve(canvas.toDataURL());
    };
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

        this.style.backgroundlogoImage = this.src ?? `url("${faviconUrl}")`;

        if (!this.hasAttribute('dynamic') || this.getAttribute('dynamic') == 'true') {
            this.style.backgroundlogoImage = await generateDynamicIcon(this.style.backgroundlogoImage);
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