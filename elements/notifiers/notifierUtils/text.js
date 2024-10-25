function createDialogTitle (titleText) {
    let titleWrapper = document.createElement('article');
    titleWrapper.classList.add('titleWrapper');

    let title = document.createElement('h3');
    title.classList.add('dialogTitle');
    title.innerHTML = titleText;

    titleWrapper.append(title);

    return titleWrapper;
}

function createDialogMessage (messageText) {
    let messageWrapper = document.createElement('article');
    messageWrapper.classList.add('titleWrapper');

    let message = document.createElement('h3');
    message.classList.add('dialogMessage');
    message.innerHTML = messageText;

    messageWrapper.append(message);

    return messageWrapper
}

export { createDialogTitle, createDialogMessage };