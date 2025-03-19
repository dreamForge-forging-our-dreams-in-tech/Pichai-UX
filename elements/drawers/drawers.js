function createSimpleDrawer(element, mode, open = true) { // turns a simple element into a drawer menu
    //mode can be desktop, mobile or auto. desktop: drawer is visible from the start, ,obile: drawer is closed from the start and closes when you click on an item, auto: picks any of the first two based on screen size
    let i;

    let autoSize = screen.width < 600 ? 'mobile' : 'desktop';

    element.classList.add('drawer');
    element.toggle = createDrawerButton(element);
    element.platform = mode == 'auto' ? autoSize : mode;

    element.toggleDrawer = function () {
        element.toggle.click(); // open or closes the drawer menu depending on it's state
    }

    if(!open) { // closes the drawer menu if the user doesnt want it to be open on launch
        element.toggle.click();
    }

    for (i of element.children) { // click event somehow handles mobile mode aswel
        i.addEventListener('click', function () {
            if(this.parentNode.platform == 'mobile') {
                this.parentNode.toggle.click();
            }
        });
    }
}

function removeSimpleDrawer(element) { // removes the drawer menu effect from an element
    element.classList.remove('drawer');

    element.getElementsByClassName('drawerToggle')[0].remove();
}

function createDrawerButton(forElement) { // creates a button on wich the user can press to show or a hide the drawer menu.
    let button = document.createElement('i');
    button.classList.add('material-icons');
    button.classList.add('drawerToggle');
    button.element = forElement;
    button.innerHTML = 'close';

    button.addEventListener('click', function (e) {
        if (this.element.classList.contains('closeDrawerAnimation')) {
            //this.element.style.display = 'flex';

            this.element.style.animation = 'closeDrawer 4s';

            this.classList.remove('closedDrawerToggle');

            this.innerHTML = 'close';
        } else {
            //this.element.style.display = 'none';

            this.element.style.animation = 'openDrawer 4s';

            this.classList.add('closedDrawerToggle');

            this.innerHTML = 'menu';
        }
    });

    document.body.appendChild(button);
    return button;
}

export { createSimpleDrawer, removeSimpleDrawer };