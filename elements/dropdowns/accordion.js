// Create a class for the element
class Accordion extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let content = document.createElement('section');
        let art = document.createElement('article');
        art.innerHTML = this.innerHTML;
        art.style.height = this.getAttribute('visible') == 'true' ? 'max-content' : '0px';

        this.innerHTML = '';

        let arrow = document.createElement('i');
        arrow.classList.add('material-symbols-outlined');
        arrow.innerHTML = 'arrow_drop_down';

        arrow.onclick = function () {
            if(art.style.height == 'max-content') {
                art.style.height = '0px';
                art.style.padding = '0px 8px 0px 8px';

                arrow.innerHTML = 'arrow_drop_down';
            } else {
                art.style.height = 'max-content';
                art.style.padding = '8px';

                arrow.innerHTML = 'arrow_drop_up';
            }
        }

        content.appendChild(art);

        let title = document.createElement('h5');
        title.innerHTML = this.hasAttribute('titleText') ? this.getAttribute('titleText') : 'Accordion 🪗';

        title.appendChild(arrow);
        
        this.appendChild(title);
        this.appendChild(content);
    }
}

customElements.define("accordion-dropdown", Accordion);  