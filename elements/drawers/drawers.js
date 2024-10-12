function creeateSimpleDrawer(element) { // turns a simple element into a drawer menu
    element.classList.add('drawer');

    createDrawerButton(element);

    element.addEvetListener('click', function () {

        if (this.classList.contains('drawer')) { // doing this way cuz im too lazy to create logic for removing the event
            this.getElementsByClassName('drawerToggle')[0].click();
        }
    })
}

function removeSimpleDrawer(element) { // removes the drawer menu effect from an element
    element.classList.remove('drawer');

    element.getElementsByClassName('drawerToggle')[0].remove();
}

function createDrawerButton(forElement) { // creates a button on wich the user can press to show or a hide the drawer menu.
    let button = document.createElement('i');
    button.classList.add('material-icons');
    button.classList.add('drawerToggle');

    button.addEventListener('click', function (e) {
        if (this.parentNode.style.display == 'none') {
            this.parentNode.style.display = 'flex';
        } else {
            this.parentNode.style.display = 'none';
        }
    });

    forElement.appendChild(button);
}

export { creeateSimpleDrawer, removeSimpleDrawer };