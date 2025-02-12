import { generate3ColorPallete } from "./AI/palleteMaker.js";
import { removeSimpleDrawer, createSimpleDrawer } from "./elements/drawers/drawers.js";
import { generateDynamicIcon } from './elements/images/logo.js';

import { getListOfElements } from './utils/customeElementsDefine.js';

import { optimizeTextColor } from './utils/extraFunctions.js';

import { varExists } from "./utils/cssVars.js";

let i;
window['options'] = {};

class PichaiUX {
    constructor(options = {}) {
        let opt = {
            source: '#008dcd',
            darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
            overrideColorsOnScroll: true,
            themedFavIcon: true,
            extractionPosition: 0,
            transparency: 1.0,
            rtl:false,
            homeLink: window.location.href, // the link to where the user is send to when he presses the logo or title in the header.
            settingsDialog: document.createElement('template-settings-drawer'), // allows user to connect custom settings popup to QS
            loginDialog: document.createElement('template-account-drawer'),  //todo: write docs about this, determines wich elements is shown when clicking the log in button
            accountMenu: document.createElement('template-account-drawer'),  //todo: write docs about this, determines wich elements is shown when the user is logged in and allows settings modifications, saving etc
        };

        for (i of Object.keys(options)) {
            opt[i] = options[i];
        }

        this.options = opt;
        window['options'] = opt;
    }

    async initialize() {
        ///checkCustomizationChanges(this.options); //starts listening to any adjustments to customization from the user

        let comp = window.getComputedStyle(document.body);
        let image = String(comp['backgroundImage']);
        image = image.substring(5, image.length - 2);

        if (window.localStorage.getItem(`${window.storageName}bgImageChange`)) {
            image = window.localStorage.getItem(`${window.storageName}bgImageChange`);
        }

        this.options.source = image || '#008dcd';

        //inject required css
        let cssId = 'PichaiUXCss';
        if (!document.getElementById(cssId)) {
            let head = document.getElementsByTagName('head')[0];

            addCSSSheets(typeof exports !== 'undefined' ? 'Pichai-UX/CSS/main.css' : 'https://dreamforge-forging-our-dreams-in-tech.github.io/Pichai-UX/CSS/main.css', cssId, head);
            addCSSSheets('https://fonts.googleapis.com/icon?family=Material+Icons', 'google', head);
            addCSSSheets('https://pagecdn.io/lib/easyfonts/fonts.css', 'fonts', head);
        }

        // generate pallete based on bg image and set proper text colors
        this.updateStyling();

        // make a themed icon if set to true by user
        createThemedFavIcon(this.options);

        setRTLMode(this.options);
    }

    async generateDynamicIcon(icon) {
        return await generateDynamicIcon(icon);
    }

    optimizeTextColor(el = document) { // loop  through selected elements and find/set the best matched text color
        optimizeTextColor(el);
    }

    getListOfElements() {
        return getListOfElements();
    }

    createSimpleDrawer(e, mode) {
        createSimpleDrawer(e, mode);
    }

    removeSimpleDrawer(e) {
        removeSimpleDrawer(e);
    }

    async updateStyling() { // allowsw the user to force an update to pichai if it isn't odne automatically
        updateStyles();
    }

    async varExists (name) {
        return await varExists(name);
    }

    pichaiStorageKeys() { // returns an array with storage items stored by Pichai
        let storage = [];

        for (i in localStorage) {
            if (String(i).includes(window.storageName)) {
                storage.push(i);
            }
        }

        return storage;
    }
}

function setRTLMode (options) {
            //create rtl layout
            if(options.rtl) {
                document.body.classList.add('rtlLayout');
            } else {
                document.body.classList.remove('rtlLayout');
            }
}

function checkCustomizationChanges(options) {
    window.addEventListener('storage', async function (e) {
        updateStyles(e.key, e.newValue);
    });
}

async function updateStyles(key = 'all', value) { //update any set styles from storage
    let i;

    if (key == `${window.storageName}bgImageChange`) {

        window.document.body.style.backgroundImage = `url('${value}')`;
        options.source = value;
    } else if (key == `${window.storageName}extractionPosition`) {
        options.extractionPosition = value;
    } else if (key == `${window.storageName}transperncy`) {
        options.transparency = value;
    } else if (key == `${window.storageName}rtl`) {
        options.rtl = value == 'true';

        setRTLMode(options);
    } else if (key == `${window.storageName}contrast`) {
        options.contrast = value;

    } else if (key == 'all') {

        for (i in localStorage) {
            if (String(i).includes(window.storageName)) {
                updateStyles(i, window.localStorage.getItem(i));
            }
        }
    }

    await generate3ColorPallete(options);
    optimizeTextColor(document);
    createThemedFavIcon(options);
}

async function createThemedFavIcon(options) {
    if (options.themedFavIcon) {
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

function addCSSSheets(url,id, head) {
    let link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';

    head.prepend(link);
}

export { PichaiUX, updateStyles };