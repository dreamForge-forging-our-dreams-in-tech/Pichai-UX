
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

        if(this.getAttribute('for') != '') {
            addForConnection();
        }

        for (i of keys) {
            if (i.href == window.location.href) {
                i.classList.add('current');
            }
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(this.getAttribute('direction') == 'vertical') {
            this.classList.add('verticalTabbar');
        } else {
            this.classList.remove('verticalTabbar');
        }

        if(this.getAttribute('for') != '') {
            addForConnection();
        } else {
            removeForConnection();
        }
      }
}

customElements.define("tab-bar", TabBar);  