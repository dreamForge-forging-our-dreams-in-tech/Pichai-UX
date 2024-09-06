// this functions adds the possibility to turn all elements into a dialog
// it simply creates a clone that will be shown in the dialog

/** @description 
* A Dialog is a powerfull way of notifying the user on important matters.
*/

/** @usage 
 * Used for showing bits of information, notifying or having an user select something
*/

/** @codeUsage 
* You can call the showAsDialog function on all elements, using the setDialogMode attribute of the element allwos you to set how the element reacts and works with this function
*/

function showAsDialog(clone, cancelable = true, titleText = 'Dialog') { // turns the element into a visible dialog
    let wrapper = document.createElement('article');
    wrapper.classList.add('dialogWrapper');
    wrapper.id = `${this.id}Dialog`;

    let titleWrapper = document.createElement('article');
    titleWrapper.classList.add('titleWrapper');

    let title = document.createElement('h3');
    title.classList.add('dialogTitle');
    title.innerHTML = titleText;

    titleWrapper.append(title);

    if (cancelable) {
        wrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            if (e.target.classList.contains('dialogWrapper')) {
                this.hideDialog();
            }
        });

        let closeButton = document.createElement('button');
        closeButton.innerHTML = 'X';
        closeButton.classList.add('closeDialogButton');

        titleWrapper.append(closeButton);
    }

    let dialogForm = document.createElement('form'); // creates an input who it's value changes when the custom input element does
    dialogForm.classList.add('dialog');

    dialogForm.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
    });

    let children = this.dialogMode == 'dialog' ? this : this.cloneNode(true);
    dialogForm.append(children);

    console.log(window.getComputedStyle(dialogForm));
    titleWrapper.style.width = window.getComputedStyle(dialogForm)['width'];

    wrapper.append(titleWrapper, dialogForm); // append all items to the dialog wrapper

    document.body.append(wrapper);
}

function hideDialog() { // hides the dialog created by a element.
    document.getElementById(`${this.id}Dialog`).remove();
}

function setDialogMode(mode) { // sets the elements mode for a dialog pop-up
    this.dialogMode = mode;
    if (mode == 'clone') {
        this.style.removeProperty('display');
    } else {
        this.style.display = 'none';
    }
}

// Attach the function to the HTMLElement prototype
HTMLElement.prototype.showAsDialog = showAsDialog;
HTMLElement.prototype.hideDialog = hideDialog;
HTMLElement.prototype.dialogMode = setDialogMode; // can be either way clone to clone the element into a dialog or dialog wich hides the element and shows it in a dialog