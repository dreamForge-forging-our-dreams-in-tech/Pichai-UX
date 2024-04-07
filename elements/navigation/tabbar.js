
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
            for(i of Object.keys(JSON.parse(this.getAttribute('options')))) {
                alert(i)
                let button = document.createElement('button');
                button.innerHTML = i;
                this.appendChild(button);
            }
        }
    }
}

customElements.define("tab-bar", TabBar);  