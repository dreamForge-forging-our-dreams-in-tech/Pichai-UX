
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
            i.style.display = 'none';
            }
        }

        this.onwheel = function (e) {

            this.children[index].style.display = 'none';
            if (e.deltaY == 100) {
                index++;
            } else {
                index--;
            }

            if(index >= this.children.length - 1) {
                index = this.getAttribute('looped') == 'true' ? 0 : this.children.length - 1;
            }

            if(index < 0) {
                index = this.getAttribute('looped') == 'true' ? this.children.length - 1 : 0;
            }

            console.log(this.children[index])
            this.children[index].style.removeProperty('display');
        }
        }
    }

customElements.define("view-pager", ViewPager);  