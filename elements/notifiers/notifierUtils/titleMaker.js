function createDialogTitle (titleText) {
    let titleWrapper = document.createElement('article');
    titleWrapper.classList.add('titleWrapper');

    let title = document.createElement('h3');
    title.classList.add('dialogTitle');
    title.innerHTML = titleText;

    titleWrapper.append(title);

    return titleWrapper;
}

export { createDialogTitle };