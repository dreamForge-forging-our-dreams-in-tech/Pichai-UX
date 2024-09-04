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

function showAsDialog(clone) {
    let wrapper = document.createElement('article');
    wrapper.classList.add('dialogWrapper');

    let dialogForm = document.createElement('form'); // creates an input who it's value changes when the custom input element does
    dialogForm.classList.add('dialog');

    let children = this.dialogMode == 'clone' ? this.cloneNode(true) : this;
    dialogForm.append(children);

    wrapper.append(dialogForm);

    document.body.append(wrapper);
}

function setDialogMode(mode) { // sets the elements mode for a dialog pop-up
    this.dialogMode = mode;
    if(mode == 'clone') {
        this.style.removeProperty('display');
    } else {
        this.style.display = 'none';
    }
}

// Attach the function to the HTMLElement prototype
HTMLElement.prototype.showAsDialog = showAsDialog;
HTMLElement.prototype.dialogMode = setDialogMode; // can be either way clone to clone the element into a dialog or dialog wich hides the element and shows it in a dialog