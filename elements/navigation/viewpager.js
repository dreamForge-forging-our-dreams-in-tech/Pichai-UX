
// Create a class for the element
class ViewPager extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let i;
        let index = 0;
        let wheelIndex = 0;

        let sensitivity = this.hasAttribute('sensitivity') ? Number(this.getAttribute('sensitivity')) : 4;

        for(i of this.children) {
            if(this.children[index] == i) {} else {
            i.style.display = 'none';
            }
        }

        this.pageChanged = function () {}

        this.showPage = function (page) {
            this.children[index].style.display = 'none';
            index = page;

            this.children[index].style.removeProperty('display');
        }

        this.onwheel = function (e) {
            wheelIndex++;

            if(wheelIndex == sensitivity) {
                wheelIndex = 0;

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
                this.pageChanged(index, this.children[index]);
            }
        }
        }
    }

customElements.define("view-pager", ViewPager);  