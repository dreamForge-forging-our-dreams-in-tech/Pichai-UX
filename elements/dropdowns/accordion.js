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
        this.innerHTML = '';
        art.style.display = 'none';

        let arrow = document.createElement('i');
        arrow.classList.add('material-symbols-outlined');
        arrow.innerHTML = 'arrow_drop_down';

        arrow.onclick = function () {
            if(art.style.display == 'block') {
                art.style.display = 'none';
            } else {
                art.style.display = 'block';
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