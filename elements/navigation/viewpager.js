
// Create a class for the element
class ViewPager extends HTMLElement {
    static observedAttributes = ["pageIndex"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let i;
        let wheelIndex = 0;
        let sensitivity = this.hasAttribute('sensitivity') ? Number(this.getAttribute('sensitivity')) : 4;

        if(!this.pageIndex) {
            this.pageIndex = 0;
        }

        for(i of this.children) {
            if(this.children[this.pageIndex] == i) {} else {
            i.style.display = 'none';
            }
        }

        this.onwheel = function (e) {
            wheelIndex++;

            if(wheelIndex == sensitivity) {
                wheelIndex = 0;

                this.children[this.pageIndex].style.display = 'none';
                if (e.deltaY == 100) {
                    this.pageIndex = this.pageIndex + 1;
                } else {
                    this.pageIndex = this.pageIndex - 1;
                }
    
                if(this.pageIndex >= this.children.length - 1) {
                    this.pageIndex = this.getAttribute('looped') == 'true' ? 0 : this.children.length - 1;
                }
    
                if(this.pageIndex < 0) {
                    this.pageIndex = this.getAttribute('looped') == 'true' ? this.children.length - 1 : 0;
                }
    
                this.children[this.pageIndex].style.removeProperty('display');
            }
        }
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if(this.pageIndex >= this.children.length - 1) {
                this.pageIndex = this.getAttribute('looped') == 'true' ? 0 : this.children.length - 1;
            }

            if(this.pageIndex < 0) {
                this.pageIndex = this.getAttribute('looped') == 'true' ? this.children.length - 1 : 0;
            }

            this.children[oldValue].style.display = 'none';

            this.children[newValue].style.removeProperty('display');
          }
    }

customElements.define("view-pager", ViewPager);  