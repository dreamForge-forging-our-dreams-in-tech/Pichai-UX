import { html5ToObject } from '../../utils/extraFunctions.js';

import './notifierUtils/text.js';
import { createDialogMessage } from './notifierUtils/text.js';

// This function is used to create a toast or a snackbar message

function showToastMessage(icon = '', messageText = 'Message', duration = 15000) { // creates a toats message icon is an icon for the toast message (google icons or any other icon font lib) and messageText is the toast message, duration is the time the toast will stay visible
        let wrapper = document.createElement('article');
        wrapper.classList.add('toastMessage');

        let toastIcon = document.createElement('i'); // displays a icon in the toast message
        toastIcon.classList.add('material-icons', 'toastIcon');
        toastIcon.innerHTML = icon;

        wrapper.append(toastIcon, createDialogMessage(messageText)); // appends the icon and adds the toast text.

        document.body.append(wrapper);

        window.setTimeout(function () { // removes the toast message after set amount of time
            wrapper.remove();
        }, duration);

        return wrapper; // returns the wrapper of the toast message to let user manually manipulate a toast message e.g. remove it manually.
}

export { showToastMessage };