
// Create a class for the element
class TabBar extends HTMLElement {
    static observedAttributes = ["direction"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let i;
        let index = 0;
        let keys = this.children;
        let forAttr = this.getAttribute('for');

        this.classList.add('tabBarHolder');

        this.style.gridTemplateColumns = `repeat(` + keys.length + `, 1fr)`;

        if (this.getAttribute('direction') == 'vertical') {
            this.classList.add('verticalTabbar');
        }

        if (!forAttr == '') {
            addForConnection(this, forAttr);
        }

        for (i of keys) {
            i.setAttribute('index', index);
            if (i.href == window.location.href) {
                i.classList.add('current');
            }

            if (!forAttr == '') {
                let element = document.getElementById(forAttr);
                let el = element.children[parseInt(i.getAttribute('index'))];

                if (el.checkVisibility()) {
                    i.classList.add('current');
                }
            }

            index++
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
    let i;

    element.addEventListener('pageChange', (e) => {

    });

    for (i of e.children) {
        i.onclick = function (e) {
            e.stopPropagation();
            e.preventDefault();

            element.setAttribute('pageIndex',Number(this.getAttribute('index')));
        }
    }

}

function removeForConnection(e, e2) {
    let element = document.getElementById(e2);
}

customElements.define("tab-bar", TabBar);  