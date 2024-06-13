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
        <x-icon src='https://banner2.cleanpng.com/20180502/eve/kisspng-discord-computer-icons-logo-simplify-5aea4b0b9a5315.3824979315253040756321.jpg'></x-icon>
        <x-icon src='https://i.pinimg.com/736x/7d/dc/54/7ddc545046b212d9ecc8eef83569222b.jpg'></x-icon>
        <x-icon src='https://w7.pngwing.com/pngs/69/215/png-transparent-social-media-twitter-blog-user-pajarito-computer-network-text-logo-thumbnail.png'></x-icon>
    </footer>`;
    }
}

registry.define("template-footer", Footer);