import { generate3ColorPallete } from "./AI/palleteMaker.js";

class PichaiUX {
    constructor(options = {
        source: '#008dcd',
        darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
        overrideColorsOnScroll: true
    }) {
        this.options = options;
    }

    initialize() {
        let comp = window.getComputedStyle(document.body);
        alert(comp['backgroundImage'])
        let image = String(comp['backgroundImage']);
        image = image.substring(3, image.length - 1);

        this.options.source = image || '#008dcd';

        let cssId = 'PichaiUXCss';
        if (!document.getElementById(cssId)) {
            let head = document.getElementsByTagName('head')[0];
            let link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = typeof exports !== 'undefined' ? 'Pichai-UX/CSS/main.css' : 'https://lukeplays33.github.io/Pichai-UX/CSS/main.css';
            link.media = 'all';

            head.appendChild(link);
        }

        generate3ColorPallete(this.options);
    }
}

export { PichaiUX }