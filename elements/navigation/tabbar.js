
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

        if (this.getAttribute('direction') == 'vertical') {
            this.classList.add('verticalTabbar');
        }

        if (!this.getAttribute('for') == '') {
            addForConnection(this, this.getAttribute('for'));
        }

        for (i of keys) {
            if (i.href == window.location.href) {
                i.classList.add('current');
            }
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.getAttribute('direction') == 'vertical') {
            this.classList.add('verticalTabbar');
        } else {
            this.classList.remove('verticalTabbar');
        }

        if (!this.getAttribute('for') == '') {
            addForConnection(this, this.getAttribute('for'));
        } else {
            removeForConnection(this, this.getAttribute('for'));
        }
    }
}

function addForConnection(e, e2) {
    let element = document.getElementById(e2);

    element.addEventListener('pageChange', (e) => {

    });

    let i;

    for (i of e.children) {
        i.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            let index = Array.prototype.indexOf.call(e.children, i);
            element.pageIndex = index;
        });
    }
}

function removeForConnection(e, e2) {
    let element = document.getElementById(e2);

    try {

    } catch (e) { }

}

customElements.define("tab-bar", TabBar);  