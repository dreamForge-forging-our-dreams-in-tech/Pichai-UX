
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

    attributeChangedCallback(name, oldValue, newValue) {
        try {

            if (Number(this.getAttribute('pageIndex')) > this.children.length - 1) {
                this.setAttribute('pageIndex', this.getAttribute('looped') == 'true' ? window.default_index : this.children.length - 1);
            }

            if (Number(this.getAttribute('pageIndex')) < 0) {
                this.setAttribute('pageIndex', this.getAttribute('looped') == 'true' ? this.children.length - 1 : window.default_index);
            }

            this.children[oldValue].style.display = 'none';

            this.children[Number(this.getAttribute('pageIndex'))].style.removeProperty('display');

            let pageChange = new CustomEvent("pageChange", {
                detail: {
                    page: this.children[Number(this.getAttribute('pageIndex'))],
                    pageIndex: this.getAttribute('pageIndex'),
                },
            });

            this.dispatchEvent(pageChange);

        } catch (e) {}
    }
}

customElements.define("view-pager", ViewPager);  