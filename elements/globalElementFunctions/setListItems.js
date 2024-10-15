let i;

function enableSetListItems(element) {
    element.listItems = [];

    for (i of element.children) {
        if (i.tagName == 'HR') { } else {
            let text = String(i.innerHTML)
            element.listItems.push(text.substring(0, text.indexOf('<'))); //adds the items to the listItems object for setting/getting
        }
    }

    // Options for the observer (which mutations to observe)
    const config = { attributes: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "attributes") {
                console.log(`The ${mutation.attributeName} attribute was modified.`);
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(element, config);
}

export { enableSetListItems }