
// Create a class for the element
class ViewPager extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let i;
        let index = 0;

        for(i of this.children) {
            if(this.children[index] == i) {} else {
            i.style.visibility = 'hidden';
            }
        }

        this.onwheel = function (e) {
            console.log(e)
            this.children[index].style.visibility = 'hidden';
            if (e.deltaY == 100) {
                index++;
            } else {
                index--;
            }
            console.log(index)
            this.children[index].style.visibility = 'visible';
        }
    }
}

customElements.define("view-pager", ViewPager);  