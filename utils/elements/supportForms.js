// this is a helper function to help us create custom input elements that will work with a form

function supportForm() {
    this.style.backgroundColor = 'yellow';
}

// Attach the function to the HTMLElement prototype
HTMLElement.prototype.supportForm = supportForm;