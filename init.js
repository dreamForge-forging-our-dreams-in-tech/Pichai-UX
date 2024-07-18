import { generate3ColorPallete } from "./AI/palleteMaker.js";
import { generateDynamicIcon } from './elements/images/logo.js';

import { getListOfElements } from './utils/customeElementsDefine.js';

import { optimizeTextColor } from './utils/extraFunctions.js';

class PichaiUX {
    constructor(options = {
        source: '#008dcd',
        darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
        overrideColorsOnScroll: true,
        themedFavIcon: true,
        extractionPosition: 0,
        homeLink: window.location.href, // the link to where the user is send to when he presses the logo or title in the header.
        loginDialog: document.createElement('template-account-drawer'),  //todo: write docs about this, determines wich elements is shown when clicking the log in button
        accountMenu: document.createElement('template-account-drawer'),  //todo: write docs about this, determines wich elements is shown when the user is logged in and allows settings modifications, saving etc
    }) {
        this.options = options;
        window['options'] = options;
    }

    async initialize() {
        // read bg image and make it ready for UI usage
        let styles = window.getComputedStyle(document.body)
        document.documentElement.style.backgroundImage = styles.backgroundImage;
        document.body.style.backgroundImage = 'initial';

        let comp = window.getComputedStyle(document.documentElement);
        let image = String(comp['backgroundImage']);
        image = image.substring(5, image.length - 2);

        this.options.source = image || '#008dcd';

        //inject required css
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

        // generate pallete based on bg image
        await generate3ColorPallete(this.options);

        // make a themed icon if set to true by user
        if (this.options.themedFavIcon) {
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

        // optimise text at start to fix list bullets to have right colors - may need to change later
        this.optimizeTextColor();
    }

    async generateDynamicIcon(icon) {
        return await generateDynamicIcon(icon);
    }

    optimizeTextColor(el = document) { // loop  through selected elements and find/set the best matched text color
        optimizeTextColor(el);
    }

    getListOfElements () {
        return getListOfElements();
    }
}

export { PichaiUX }