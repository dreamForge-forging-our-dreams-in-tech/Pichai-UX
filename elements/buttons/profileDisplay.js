// Create a class for the element
class DisplayProfile extends HTMLElement {
    static observedAttributes = ["src", "dynamic"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    async connectedCallback() {
        this.innerHTML = 'account_circle';
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
                // Get the favicon link element
                const faviconLink = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut icon']");

                // Get the favicon URL
                const faviconUrl = faviconLink ? faviconLink.href : null;
        
                if (!this.hasAttribute('dynamic') || this.getAttribute('dynamic') == 'true') {
                    window.onload = async () => {
                        let newIcon = await generateDynamicIcon(faviconUrl);
                        this.style.backgroundImage = `url(${newIcon})`;
                    }
                } else {
                    this.style.backgroundImage = this.src ?? `url("${faviconUrl}")`;
                }
    }
}

customElements.define("display-profile", DisplayProfile);