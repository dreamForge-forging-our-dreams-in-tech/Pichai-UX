
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
            let opt = JSON.parse(this.getAttribute('options'))
            for(i of Object.keys(opt)) {
                alert(i)
                let button = document.createElement('a');
                button.innerHTML = i;
                button.href = opt[i];
                this.appendChild(button);
            }
        }
    }
}

customElements.define("tab-bar", TabBar);  