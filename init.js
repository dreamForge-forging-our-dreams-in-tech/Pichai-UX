let image = String(document.body.style.backgroundImage);
image = image.substring(3, image.length - 1);

class PichaiUX {
    construct(options) {
        options = {
            source: image ?? '#008dcd',
        }
    }
}