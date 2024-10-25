import { html5ToObject } from '../../utils/extraFunctions.js';

// this functions adds the possibility to turn all elements into a dialog
// it simply creates a clone that will be shown in the dialog

/** @description 
* A Dialog is a powerfull way of notifying the user on important matters.
*/

/** @usage 
 * Used for showing bits of information, notifying or having an user select something
*/

/** @codeUsage 
* You can call the showAsDialog function on all elements, using the setDialogMode attribute of the element allwos you to set how the element reacts and works with this function.
* Events and Functions can be attached to all elements.
*/

const submit = new Event("submit"); // dialog form submitted event

function showConfirmDialog(titleText = 'Dialog', messageText ='Message', cancelable = true) { // creates a confirm dialog
    let shadow = document.createElement('article');
    shadow.classList.add('dialogWrapper');
    shadow.id = `confirmDialog`;

    let wrapper = document.createElement('article');
    shadow.append(wrapper);

    let controlWrapper = document.createElement('article');
    controlWrapper.classList.add('titleWrapper');

    let submitButton = document.createElement('button');
    submitButton.innerHTML = 'Submit';
    submitButton.classList.add('submitDialogButton');

    submitButton.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

        this.closeDialog();
    });

    controlWrapper.append(submitButton);

    let titleWrapper = document.createElement('article');
    titleWrapper.classList.add('titleWrapper');

    let title = document.createElement('h3');
    title.classList.add('dialogTitle');
    title.innerHTML = titleText;

    titleWrapper.append(title);

    let messageWrapper = document.createElement('article');
    messageWrapper.classList.add('titleWrapper');

    let message = document.createElement('h3');
    message.classList.add('dialogTitle');
    message.innerHTML = messageText;

    messageWrapper.append(title);

    if (cancelable) {
        shadow.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            if (e.target.classList.contains('dialogWrapper')) {
                this.closeDialog();
            }
        });

        let closeButton = document.createElement('button');
        closeButton.innerHTML = 'Cancel';
        closeButton.classList.add('closeDialogButton');

        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            this.closeDialog();
        });

        controlWrapper.append(closeButton);
    }

    wrapper.append(titleWrapper, messageWrapper, controlWrapper); // append all items to the dialog wrapper

    document.body.append(shadow);
}

function closeDialog() { // hides the dialog created by a element.
    document.getElementById(`confirmDialog`).remove();
    this.setAttribute('formData', html5ToObject(data)); // saves the form data as a attribute so dev can aces it after accidentally closing pop-up

    this.dispatchEvent(submit);
    
    return data; // returns the any filled in form data
}

export { showConfirmDialog };