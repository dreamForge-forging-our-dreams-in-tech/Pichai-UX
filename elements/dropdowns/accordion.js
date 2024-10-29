import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

// Create a class for the element
class Accordion extends HTMLElement {
        /** @description 
    * The accordion element allows you to hide or show content.
    */

    /** @usage 
     * Hide less important information
     * Clean up space or make more room
    */

    static observedAttributes = ["open", "titletext"]; // open attribute tells the init function that the contents are open when the page is loaded
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let content = document.createElement('section');
        
        let art = document.createElement('article');
        art.innerHTML = this.innerHTML;
        this.innerHTML = '';

        art.style.height = '0px';
        content.classList.add('hidden');
        content.classList.add('accordionItems');
        this.classList.add('hiddenAccordion');

        let arrow = document.createElement('i');
        arrow.classList.add('material-symbols-outlined');
        arrow.innerHTML = 'arrow_drop_down';

        arrow.onclick = function () {
            if(art.style.height == '100%') {
                art.style.height = '0px';
                art.style.padding = '0px 8px 0px 8px';

                this.parentNode.parentNode.children[1].classList.add('hidden');
                this.parentNode.parentNode.classList.add('hiddenAccordion');

                arrow.innerHTML = 'arrow_drop_down';
            } else {
                art.style.height = '100%';
                art.style.padding = '8px';

                this.parentNode.parentNode.children[1].classList.remove('hidden');
                this.parentNode.parentNode.classList.remove('hiddenAccordion');

                arrow.innerHTML = 'arrow_drop_up';
            }
        }

        if(this.getAttribute('open') == 'true') {
            art.style.height = '100%';
            art.style.padding = '8px';

            //this.parentNode.parentNode.children[1].classList.remove('hidden');
            //this.parentNode.parentNode.classList.remove('hiddenAccordion');

            arrow.innerHTML = 'arrow_drop_up';
        }

        content.appendChild(art);

        let title = document.createElement('h5');
        title.innerHTML = this.hasAttribute('titleText') ? this.getAttribute('titleText') : 'Accordion 🪗';

        title.appendChild(arrow);
        
        this.appendChild(title);
        this.appendChild(content);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('string', 'titletext', this.getAttribute('titletext'));
        doAttributeCheck('boolean', 'open', this.getAttribute('open'));

        if(name == 'titletext') { // lets you change the title of an accordion
            this.children[0].innerHTML = this.children[0].innerHTML.replace(oldValue, newValue);

        } else if (name == 'open') {
            let art = this.children[1].firstChild;
            let arrow = this.children[0].children[0];

            if(newValue == 'false') {
                art.style.height = '0px';
                art.style.padding = '0px 8px 0px 8px';

                art.parentNode.classList.add('hidden');
                art.parentNode.parentNode.classList.add('hiddenAccordion');

                arrow.innerHTML = 'arrow_drop_down';
            } else {
                art.style.height = '100%';
                art.style.padding = '8px';

                art.parentNode.classList.remove('hidden');
                art.parentNode.parentNode.classList.remove('hiddenAccordion');

                arrow.innerHTML = 'arrow_drop_up';
            }
        }
}
}

registry.define("accordion-dropdown", Accordion);  