
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
            this.style.gridTemplateColumns = `repeat(` + opt.length + `, 1fr);`;

            for(i of Object.keys(opt)) {
                let button = document.createElement('a');
                button.innerHTML = i;
                button.href = opt[i];

                if(i == Object.keys(opt)[0]) {
                    this.classList.add('current');
                }
                this.appendChild(button);
            }
        }
    }
}

customElements.define("tab-bar", TabBar);  