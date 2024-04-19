
// Create a class for the element
class ViewPager extends HTMLElement {
    static observedAttributes = ["pageindex"];

    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let i;
        let wheelIndex = 0;
        let sensitivity = this.hasAttribute('sensitivity') ? Number(this.getAttribute('sensitivity')) : 4;

        if(!this.hasAttribute('pageIndex')) {
            this.setAttribute('pageIndex', 0);

        }
        
        for(i of this.children) {
            if(this.children[this.getAttribute('pageIndex')] == i) {} else {
            i.style.display = 'none';
            }
        }

        this.onwheel = function (e) {
            wheelIndex++;

            if(wheelIndex == sensitivity) {
                wheelIndex = 0;

                //this.children[this.getAttribute('pageIndex')].style.display = 'none';
                if (e.deltaY == 100) {
                    this.setAttribute('pageIndex', Number(this.getAttribute('pageIndex') + 1));
                } else {
                    this.setAttribute('pageIndex', Number(this.getAttribute('pageIndex') - 1));
                }
    
                if(Number(this.getAttribute('pageIndex')) >= this.children.length - 1) {
                    this.setAttribute('pageIndex', this.getAttribute('looped') == 'true' ? 0 : this.children.length - 1);
                }
    
                if(Number(this.getAttribute('pageIndex')) < 0) {
                    this.setAttribute('pageIndex', this.getAttribute('looped') == 'true' ? this.children.length - 1 : 0);
                }
    
                //this.children[this.getAttribute('pageIndex')].style.removeProperty('display');
            }
        }
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if(this.getAttribute('pageIndex') >= this.children.length - 1) {
                this.setAttribute('pageIndex', Number(this.getAttribute('looped') == 'true' ? 0 : this.children.length - 1));
            }

            if(this.getAttribute('pageIndex') < 0) {
                this.setAttribute('pageIndex', Number(this.getAttribute('looped') == 'true' ? this.children.length - 1 : 0));
            }

            this.children[oldValue].style.display = 'none';

            this.children[newValue].style.removeProperty('display');
          }
    }

customElements.define("view-pager", ViewPager);  