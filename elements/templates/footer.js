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
        <x-title>sketch</x-title>
        <x-icon src='https://raw.githubusercontent.com/lukeplays33/Pichai-UX/main/assets/shapes/pictures/twitter.png'></x-icon>
        <x-icon src='https://raw.githubusercontent.com/lukeplays33/Pichai-UX/main/assets/shapes/pictures/discord.png'></x-icon>
        <x-icon src='https://raw.githubusercontent.com/lukeplays33/Pichai-UX/main/assets/shapes/pictures/youtube.png'></x-icon>
    </footer>`;
    }
}

registry.define("template-footer", Footer);