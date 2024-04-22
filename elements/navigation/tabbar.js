
// Create a class for the element
class TabBar extends HTMLElement {
    static observedAttributes = ["direction"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let i;

        this.classList.add('tabBarHolder');

        let keys = this.children;

        this.style.gridTemplateColumns = `repeat(` + keys.length + `, 1fr)`;

        if(this.getAttribute('direction') == 'vertical') {
            this.classList.add('verticalTabbar');
        }

        for (i of keys) {
            if (i.href == window.location.href) {
                i.classList.add('current');
            }
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {

      }
}

customElements.define("tab-bar", TabBar);  