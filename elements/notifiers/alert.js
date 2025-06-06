import { html5ToObject } from '../../utils/extraFunctions.js';

import './notifierUtils/text.js';
import { createDialogMessage, createDialogTitle } from './notifierUtils/text.js';

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

function showAlertDialog(titleText = 'Dialog', messageText = 'Message') { // creates a alert dialog
    return new Promise((resolve) => {
        let shadow = document.createElement('article');
        shadow.classList.add('dialogWrapper');
        shadow.id = `alertDialog`;

        let wrapper = document.createElement('article');
        shadow.append(wrapper);

        let controlWrapper = document.createElement('article');
        controlWrapper.classList.add('titleWrapper', 'singleControlWrapper');

        let submitButton = document.createElement('button');
        submitButton.innerHTML = 'Understood';
        submitButton.classList.add('closeDialogButton');

        submitButton.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            document.getElementById(`alertDialog`).remove();

            resolve('closed');
        });

        controlWrapper.append(submitButton);

        wrapper.append(createDialogTitle(titleText), createDialogMessage(messageText), controlWrapper); // append all items to the dialog wrapper

        document.body.append(shadow);

    });
}

export { showAlertDialog };