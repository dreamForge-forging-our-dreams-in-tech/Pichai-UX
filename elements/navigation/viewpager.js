
// Create a class for the element
class ViewPager extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let i;

        for(i of this.children) {
            if(this.children[0] == i) {} else {
            i.style.visibility = 'hidden';
            }
        }

        this.onwheel = function (e) {
            console.log(e)
        }
    }
}

customElements.define("view-pager", ViewPager);  