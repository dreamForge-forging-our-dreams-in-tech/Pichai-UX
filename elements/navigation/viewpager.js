
// Create a class for the element
class ViewPager extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let i;

        for(i of this.children) {
            i.style.visibility = 'hidden';
        }

        console.log(this.children[0])
        this.children[0].visibility = 'visible';

        this.onwheel = function (e) {
            console.log(e)
        }
    }
}

customElements.define("view-pager", ViewPager);  