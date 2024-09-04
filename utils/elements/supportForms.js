function supportForm() {
    this.style.backgroundColor = 'yellow';
}

// Attach the function to the HTMLElement prototype
HTMLElement.prototype.highlight = supportForm;

export { supportForm }