import { generate3ColorPallete } from "./AI/palleteMaker.js";
import { removeSimpleDrawer, createSimpleDrawer } from "./elements/drawers/drawers.js";
import { generateDynamicIcon } from './elements/images/logo.js';

import { getListOfElements } from './utils/customeElementsDefine.js';

import { optimizeTextColor } from './utils/extraFunctions.js';

import { varExists } from "./utils/cssVars.js";

let r = document.querySelector(':root');

let i;
window['options'] = {};

console.time('pageLoadedIn'); // some debugging scripts for testing loading speeds when rendering icons
window.onload = function () {
    console.timeEnd('pageLoadedIn');
}

class PichaiUX {
    constructor(options = {}) {
        let opt = {
            source: 'auto', // allows the developer to supply a image, an array of 10 rgb colors splitted into a array or a single rgb array splitted e.g. [100, 255, 30], auto means Pichai-UX will calculate everything itself
            themedFavIcon: true,
            extractionPosition: 0,
            transparency: 0.7,
            rtl: false,
            contrast: 1,
            wallpaperBlur: 0,
            wallpaperBrightness: 1,
            wallpaperInversion: 0,
            hueRotation: 0, // use this when wanting to suppy a custom color hue instead of a bg image or array of colors.
            inversion: 0,
            blur: '15px',
            wallpaperSize: 'cover',
            wallpaperPosition: 'center',
            wallpaperRepeat: 'no-repeat',
            storageName: 'Pichai-UX ',
            iconsPack: 'https://fonts.googleapis.com/icon?family=Material+Icons', //allows developers or users to supply custom icons based on the google icons library. however we cannot yet test this so it should be based on google icons library with custom icons for now

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
        checkCustomizationChanges(this.options); //starts listening to any adjustments to customization from the user

        let siteName = window.location.pathname.split('/')[1];
        window.storageName = window.localStorage.getItem(`Pichai-UX ${siteName}storageKey`) || this.options.storageName;
        window.storageName = window.storageName + ' ';

        let comp = window.getComputedStyle(document.body);
        let image = String(comp['backgroundImage']);
        image = image.substring(5, image.length - 2);

        window.sessionStorage.setItem(`${window.storageName}previousWallpaper`, image); //save the wallpaper so that the user can later revert to the default one if wanted to

        if (window.localStorage.getItem(`${window.storageName}bgImageChange`)) {
            image = window.localStorage.getItem(`${window.storageName}bgImageChange`);
        } else {
            window.localStorage.setItem(`${window.storageName}bgImageChange`, image); // extra safe for when applying styles breaks
        }

        if (this.options.source == 'auto') {
            this.options.source = image || '#008dcd';
        }

        //inject required css
        let cssId = 'PichaiUXCss';
        if (!document.getElementById(cssId)) {

            addCSSSheets(typeof exports !== 'undefined' ? 'Pichai-UX/CSS/main.css' : 'https://dreamforge-forging-our-dreams-in-tech.github.io/Pichai-UX/CSS/main.css', cssId);
            addCSSSheets('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded', 'google');
            addCSSSheets(this.options.iconsPack, 'iconPack');
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

    async varExists(name) {
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

function setRTLMode(options) {
    //create rtl layout
    if (options.rtl) {
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
        if (window.localStorage.getItem(`${window.storageName}wallpaperHiden`) == 'true') {
            console.log('hidden')
            document.body.style.backgroundImage = 'none';
        } else {
            window.document.body.style.backgroundImage = `url('${value}')`;
        }
        options.source = value;
    } else if (key == `${window.storageName}extractionPosition`) {
        options.extractionPosition = value;
    } else if (key == `${window.storageName}fontFamily`) {
        addCSSSheets(`https://fonts.googleapis.com/css2?family=${value}&display=swap`, 'font');
        r.style.setProperty('--font', `'${value}', Varela`);

    } else if (key == `${window.storageName}eBlur`) {
        options.blur = value;
    } else if (key == `${window.storageName}transperncy`) {
        options.transparency = value;
    } else if (key == `${window.storageName}rtl`) {
        options.rtl = value == 'true';

        setRTLMode(options);
    } else if (key == `${window.storageName}contrast`) {
        options.contrast = value;

    } else if (key == `${window.storageName}brightness`) {
        options.wallpaperBrightness = value;

    } else if (key == `${window.storageName}blur`) {
        options.wallpaperBlur = value;

    } else if (key == `${window.storageName}wInversion`) {
        options.wallpaperInversion = value;

    } else if (key == `${window.storageName}inversion`) {
        options.inversion = value;

    } else if (key == `${window.storageName}rotation`) {
        options.hueRotation = value;

    } else if (key == `${window.storageName}bgSize`) {
        options.wallpaperSize = value;

    } else if (key == `${window.storageName}bgPosition`) {
        options.wallpaperPosition = value;
    } else if (key == `${window.storageName}bgRepeat`) {
        options.wallpaperRepeat = value;
    } else if (key == 'all') {

        for (i in localStorage) {
            if (String(i).includes(window.storageName)) {
                if ((window.localStorage.getItem(i) == '' || window.localStorage.getItem(i) == null)) {
                    //alert(key)
                } else {
                    updateStyles(i, window.localStorage.getItem(i));
                }
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

function addCSSSheets(url, id) {
    let head = document.getElementsByTagName('head')[0];

    let link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';

    if (id == 'font') {
        head.append(link);
    } else {
        head.prepend(link);
    }
}

export { PichaiUX, updateStyles };