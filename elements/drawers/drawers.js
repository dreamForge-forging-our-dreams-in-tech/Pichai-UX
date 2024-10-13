function createSimpleDrawer(element) { // turns a simple element into a drawer menu
    let i;

    element.classList.add('drawer');
    element.toggle = createDrawerButton(element);

    for (i of element.children) {
        i.addEventListener('click', function () {
            this.parentNode.toggle.click();
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
        if (this.element.style.display == 'none') {
            this.element.style.display = 'flex';

            this.classList.remove('closedDrawerToggle');

            this.innerHTML = 'close';
        } else {
            this.element.style.display = 'none';

            this.classList.add('closedDrawerToggle');

            this.innerHTML = 'menu';
        }
    });

    document.body.appendChild(button);
    return button;
}

export { createSimpleDrawer, removeSimpleDrawer };