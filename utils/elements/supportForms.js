// this is a helper function to help us create custom input elements that will work with a form

function supportForm() {
    let formInput = document.createElement('input'); // creates an input who it's value changes when the custom input element does
    formInput.classList.add('hiddenFormInput');

    if (this.hasAttribute('name')) {
        formInput.setAttribute('name', this.hasAttribute('name'));
    }

    window.setInterval(() => {
        formInput.setAttribute('value', this.getAttribute('value'));
    });

    if (this.getElementsByClassName('hiddenFormInput')[0]) { } else {
        this.append(formInput);
    }
}

// Attach the function to the HTMLElement prototype
HTMLElement.prototype.supportForm = supportForm;