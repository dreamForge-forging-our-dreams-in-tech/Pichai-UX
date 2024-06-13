import { registry } from '../../utils/customeElementsDefine.js';

// Create a class for the element
class Footer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<footer>
        <x-icon></x-icon>
        <x-title></x-title>
        <x-icon src='../../assets/shapes/pictures/discord.png'></x-icon>
        <x-icon src='../../assets\shapes/pictures/youtube.png'></x-icon>
        <x-icon src='https://img.freepik.com/premium-psd/twitter-icon-isolated-white-background-flying-little-bird-social-media-app-button-logo-sign_989822-4831.jpg'></x-icon>
    </footer>`;
    }
}

registry.define("template-footer", Footer);