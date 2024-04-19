
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

        if(!this.getAttribute('pageIndex')) {
            this.setAttribute('pageIndex', 0);
        }

        for(i of this.children) {
            if(this.children[this.attributes.pageIndex] == i) {} else {
            i.style.display = 'none';
            }
        }

        this.onwheel = function (e) {
            wheelIndex++;

            if(wheelIndex == sensitivity) {
                wheelIndex = 0;

                this.children[this.attributes.pageIndex].style.display = 'none';
                if (e.deltaY == 100) {
                    this.attributes.pageIndex = this.attributes.pageIndex + 1;
                } else {
                    this.attributes.pageIndex = this.attributes.pageIndex - 1;
                }
    
                if(this.attributes.pageIndex >= this.children.length - 1) {
                    this.attributes.pageIndex = this.getAttribute('looped') == 'true' ? 0 : this.children.length - 1;
                }
    
                if(this.attributes.pageIndex < 0) {
                    this.attributes.pageIndex = this.getAttribute('looped') == 'true' ? this.children.length - 1 : 0;
                }
    
                this.children[this.attributes.pageIndex].style.removeProperty('display');
            }
        }
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if(this.attributes.pageIndex >= this.children.length - 1) {
                this.attributes.pageIndex = this.getAttribute('looped') == 'true' ? 0 : this.children.length - 1;
            }

            if(this.attributes.pageIndex < 0) {
                this.attributes.pageIndex = this.getAttribute('looped') == 'true' ? this.children.length - 1 : 0;
            }

            this.children[oldValue].style.display = 'none';

            this.children[newValue].style.removeProperty('display');
          }
    }

customElements.define("view-pager", ViewPager);  