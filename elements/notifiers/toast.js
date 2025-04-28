import { html5ToObject } from '../../utils/extraFunctions.js';

import './notifierUtils/text.js';
import { createDialogMessage } from './notifierUtils/text.js';

// This function is used to create a toast or a snackbar message

function showToastMessage(icon = '', messageText = 'Message', duration = 10000) { // creates a toats message icon is an icon for the toast message (google icons or any other icon font lib) and messageText is the toast message, duration is the time the toast will stay visible
        let wrapper = document.createElement('article');
        wrapper.classList.add('toastMessage');

        let icon = document.createElement('icon');
        icon.classList.add('material-icons');


        wrapper.append(icon, createDialogMessage(messageText)); // append all items to the dialog wrapper

        document.body.append(wrapper);
}

export { showToastMessage };