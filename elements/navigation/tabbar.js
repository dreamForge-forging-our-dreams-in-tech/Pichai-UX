import { registry, doAttributeCheck } from '../../utils/customeElementsDefine.js';
import { enableSetListItems } from '../globalElementFunctions/setListItems.js';

// Create a class for the element
class TabBar extends HTMLElement {
            /** @description 
    * The tabbar element allows you to navigate between pages or viewpager pages
    */

    /** @usage 
     * Navigating between pages
    */

    static observedAttributes = ["direction", 'index', 'for'];

    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        let i;
        let index = window.default_index;
        let keys = this.children;
        let forAttr = this.getAttribute('for');

        //enableSetListItems(this)

        this.classList.add('tabBarHolder');

        this.style.gridTemplateColumns = `repeat(` + keys.length + `, 1fr)`;

        if (this.getAttribute('direction') == 'vertical') {
            this.classList.add('verticalTabbar');
        }

        if (!forAttr == '') {
            addForConnection(this, forAttr);
        }

        for (i of keys) {
            i.setAttribute('index', index);
            if (i.href == window.location.href) {
                i.classList.add('current');
            }

            if (!forAttr == '') {
                let element = document.getElementById(forAttr);
                let el = element.children[parseInt(i.getAttribute('index'))];

                if (el.checkVisibility({opacityProperty: true, visibilityProperty: true, contentVisibilityAuto: true})) {
                    i.classList.add('current');
                }
            }

            index++
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        doAttributeCheck('string', 'direction', this.getAttribute('direction'));
        doAttributeCheck('number', 'index', this.getAttribute('index'));
        doAttributeCheck('string', 'for', this.getAttribute('for'));

        if (this.getAttribute('direction') == 'vertical') {
            this.classList.add('verticalTabbar');
        } else {
            this.classList.remove('verticalTabbar');
        }

        if (!this.getAttribute('for') == '') {
            addForConnection(this, this.getAttribute('for'));
        } else {
            removeForConnection(this, this.getAttribute('for'));
        }
    }
}

function addForConnection(e, e2) {
    let element = document.getElementById(e2);
    let i;

    element.addEventListener('pageChange', (a) => {
        let index = a.detail.pageIndex;

        for(i of e.children) {
            if(parseInt(i.getAttribute('index')) == index) {
                i.parentNode.getElementsByClassName('current')[0].classList.remove('current');
                i.classList.add('current');
            }
        }
    });

    for (i of e.children) {
        i.addEventListener('click',function (e) {
            e.stopPropagation();
            e.preventDefault();

            element.setAttribute('pageIndex',Number(this.getAttribute('index')));

            this.parentNode.getElementsByClassName('current')[0].classList.remove('current');
            this.classList.add('current');
        });
    }

}

function removeForConnection(e, e2) {
    let element = document.getElementById(e2);
    let i;

    element.removeEventListener('pageChange', function () {}, false);

    for (i of e.children) {
        i.onclick = function () {}
    }
}

registry.define("tab-bar", TabBar);  