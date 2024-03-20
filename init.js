import { generate3ColorPallete } from "./AI/palleteMaker.js";

class PichaiUX {
    constructor(options) {
        this.options = options;
    }

    initialize() {
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