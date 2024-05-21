import { generate3ColorPallete } from "./AI/palleteMaker.js";
import { generateDynamicIcon } from './elements/images/logo.js';
import { getTextColor } from './AI/textColorFInder.js';

import { extractRgb } from './utils/extraFunctions.js';

class PichaiUX {
    constructor(options = {
        source: '#008dcd',
        darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
        overrideColorsOnScroll: true,
        themedFavIcon: true,
        extractionPosition:0,
        loginDialog: document.createElement('template-account-drawer'),  //todo: write docs about this, determines wich elements is shown when clicking the log in button
        accountMenu: document.createElement('template-account-drawer'),  //todo: write docs about this, determines wich elements is shown when the user is logged in and allows settings modifications, saving etc
    }) {
        this.options = options;
        window['options'] = options;
    }

    async initialize() {
        let styles = window.getComputedStyle(document.body)
        document.documentElement.style.backgroundImage = styles.backgroundImage;
        document.body.style.backgroundImage = 'initial';

        let comp = window.getComputedStyle(document.documentElement);
        let image = String(comp['backgroundImage']);
        image = image.substring(5, image.length - 2);

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

            let google = document.createElement('link');
            google.id = 'google';
            google.rel = 'stylesheet';
            google.type = 'text/css';
            google.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
            google.media = 'all';

            head.appendChild(google);
            head.appendChild(link);
        }

        await generate3ColorPallete(this.options);

        if (this.options.themedFavIcon) {
            //update favIcon to match themed one.
            const faviconLink = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut icon']");

            // Get the favicon URL
            const faviconUrl = faviconLink ? faviconLink.href : null;

            var link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = await generateDynamicIcon(faviconUrl);
        }
    }

    async generateDynamicIcon(icon) {
        return await generateDynamicIcon(icon);
    }

    optimizeTextColor(el = document) {
        let elements = el.getElementsByTagName('*');
        let i;
        
        for (i of elements) {

            let rgb = extractRgb(i);

            i.style.color = getTextColor(rgb);

            console.log(i.style.color)
            if(i.tagName == 'li'){

            }
        }
    }
}

export { PichaiUX }