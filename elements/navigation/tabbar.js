
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
            let opt = JSON.parse(this.getAttribute('options'));
            let keys = Object.keys(opt);

            this.style.gridTemplateColumns = `repeat(` + keys.length + `, 1fr)`;
            console.log(this.style)

            for(i of keys) {
                let button = document.createElement('a');
                button.innerHTML = i;
                button.href = opt[i];

                if(button.href == window.location.href) {
                    button.classList.add('current');
                }
                
                this.appendChild(button);
            }
        }
    }
}

customElements.define("tab-bar", TabBar);  