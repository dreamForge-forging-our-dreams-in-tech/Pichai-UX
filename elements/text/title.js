// Create a class for the element
class title extends HTMLElement {
    static observedAttributes = ["title"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        this.innerHTML = 'lol' //document.title;

        if(!this.hasAttribute('title') || this.getAttribute('title') === '') {} else {
            alert()
            this.innerHTML = this.getAttribute('title')
        }
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.innerHTML = document.title;

        if(!this.hasAttribute('title') || this.getAttribute('title') === '') {
            this.innerHTML = this.getAttribute('title')
        }
    }
}

customElements.define("x-title", title);