import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';

// Create a class for the element
class ViewPager extends HTMLElement {
    /** @description 
* The viewpager element dispalys only the current displayed page, through scrolling or connections with the tabbar element you can navigate between pages.
*/

    /** @usage 
     * Navigating between pages
    */

    static observedAttributes = ["pageindex", 'looped', 'sensitivity'];

    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let i;
        let wheelIndex = 0;
        let sensitivity = this.hasAttribute('sensitivity') ? Number(this.getAttribute('sensitivity')) : window.default_sensitivity;

        if (!this.hasAttribute('pageIndex')) {
            this.setAttribute('pageIndex', window.default_index);

        }

        for (i of this.children) {
            if (this.children[this.getAttribute('pageIndex')] == i) { } else {
                i.style.display = 'none';
            }
        }

        this.onwheel = function (e) {
            let currentPage = this.children[Number(this.getAttribute('pageIndex'))];
            console.log(currentPage)
            console.log(this)

            this.onscroll = function () {
                console.log('scrolling')
            }

            console.log(this.scrollTop)
            console.log(currentPage.scrollTop)
            if ((this.scrollHeight > this.clientHeight)) { } else {
                e.preventDefault();

                wheelIndex++;

                if (wheelIndex == sensitivity) {
                    wheelIndex = String(e.deltaY).length < 3 ? -8 : 0;

                    if (e.deltaY > 0) {
                        this.setAttribute('pageIndex', Number(this.getAttribute('pageIndex')) + 1);
                    } else {
                        this.setAttribute('pageIndex', Number(this.getAttribute('pageIndex')) - 1);
                    }
                }
            }
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('number', 'pageindex', this.getAttribute('pageindex'));
        doAttributeCheck('number', 'sensitivity', this.getAttribute('sensitivity'));
        doAttributeCheck('boolean', 'looped', this.getAttribute('looped'));

        try {

            if (Number(this.getAttribute('pageIndex')) > this.children.length - 1) {
                this.setAttribute('pageIndex', this.getAttribute('looped') == 'true' ? window.default_index : this.children.length - 1);
            }

            if (Number(this.getAttribute('pageIndex')) < 0) {
                this.setAttribute('pageIndex', this.getAttribute('looped') == 'true' ? this.children.length - 1 : window.default_index);
            }

            this.children[oldValue].style.display = 'none';

            this.children[Number(this.getAttribute('pageIndex'))].style.removeProperty('display');
            this.children[Number(this.getAttribute('pageIndex'))].scrollTo(0,10);

            let pageChange = new CustomEvent("pageChange", {
                detail: {
                    page: this.children[Number(this.getAttribute('pageIndex'))],
                    pageIndex: this.getAttribute('pageIndex'),
                },
            });
            this.dispatchEvent(pageChange);

        } catch (e) { }
    }
}

registry.define("view-pager", ViewPager);  