let image = String(document.body.style.backgroundImage);
image = image.substring(3, image.length - 1);

class PichaiUX {
    construct(options) {
        options = {
            source: image ?? '#008dcd',
            darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
            overrideColorsOnScroll: true
        }
    }
}