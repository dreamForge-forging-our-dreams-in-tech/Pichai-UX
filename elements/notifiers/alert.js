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

function showAlertDialog(titleText = 'Dialog', messageText = 'Message', cancelable = true) { // creates a confirm dialog
    return new Promise((resolve) => {
        let shadow = document.createElement('article');
        shadow.classList.add('dialogWrapper');
        shadow.id = `confirmDialog`;

        let wrapper = document.createElement('article');
        shadow.append(wrapper);

        let controlWrapper = document.createElement('article');
        controlWrapper.classList.add('titleWrapper');

        let submitButton = document.createElement('button');
        submitButton.innerHTML = 'Understood';
        submitButton.classList.add('submitDialogButton');

        submitButton.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            document.getElementById(`confirmDialog`).remove();

            resolve('closed');
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
                    document.getElementById(`confirmDialog`).remove();

                    resolve('closed');
                }
            });
        }

        wrapper.append(titleWrapper, messageWrapper, controlWrapper); // append all items to the dialog wrapper

        document.body.append(shadow);

    });
}

export { showAlertDialog };