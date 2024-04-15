
// Create a class for the element
class TabBar extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let i;

        this.classList.add('tabBarHolder');

        let keys = this.children;

        this.style.gridTemplateColumns = `repeat(` + keys.length + `, 1fr)`;

        for (i of keys) {
            if (button.href == window.location.href) {
                button.classList.add('current');
            }
        }
    }
}

customElements.define("tab-bar", TabBar);  