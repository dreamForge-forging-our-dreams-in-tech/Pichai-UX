import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

// Create a class for the element
class Accordion extends HTMLElement {
    static observedAttributes = ["visible", "titletext"];
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

        if(this.getAttribute('visible') == 'true') {
            arrow.click();
        }

        content.appendChild(art);

        let title = document.createElement('h5');
        title.innerHTML = this.hasAttribute('titleText') ? this.getAttribute('titleText') : 'Accordion 🪗';

        title.appendChild(arrow);
        
        this.appendChild(title);
        this.appendChild(content);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(doAttributeCheck('string', 'titletext') || doAttributeCheck('boolean', 'visible')) {
            return;
        }

        if(name == 'titletext') { // lets you change the title of an accordion
            this.children[0].innerHTML = this.children[0].innerHTML.replace(oldValue, newValue);

        } else if (name == 'visible') {
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