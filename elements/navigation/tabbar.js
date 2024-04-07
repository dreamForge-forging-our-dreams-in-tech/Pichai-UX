
// Create a class for the element
class TabBar extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let i;

        this.classList.add('tabBarHolder');

        if(this.hasAttribute('options')) {
            for(i of Ogject.keys(this.getAttribute('options'))) {
                let button = document.createElement('button');
                button.innerHTML = i;
                this.appendChild(button);
            }
        }
    }
}

customElements.define("tab-bar", TabBar);  