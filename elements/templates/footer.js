import { registry } from '../../utils/customeElementsDefine.js';

// Create a class for the element
class Footer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = `<footer>
        <x-icon class='WebsiteLogo'></x-icon>
        <x-title title='dreamForge'></x-title>
    <a href="https://bsky.app/profile/inkydreamer.bsky.social">
      <x-icon
        src='https://raw.githubusercontent.com/dreamForge-forging-our-dreams-in-tech/Pichai-UX/refs/heads/main/assets/shapes/pictures/twitter.png'></x-icon>
    </a>

    <a href="https://discord.gg/2tJvuH73Kq">
      <x-icon
        src='https://raw.githubusercontent.com/dreamForge-forging-our-dreams-in-tech/Pichai-UX/refs/heads/main/assets/shapes/pictures/discord.png'></x-icon>
    </a>

    <a href="https://www.youtube.com/@sketch8168">
      <x-icon
        src='https://raw.githubusercontent.com/dreamForge-forging-our-dreams-in-tech/Pichai-UX/refs/heads/main/assets/shapes/pictures/youtube.png'></x-icon>
    </a>
    </footer>`;
    }
}

registry.define("template-footer", Footer);