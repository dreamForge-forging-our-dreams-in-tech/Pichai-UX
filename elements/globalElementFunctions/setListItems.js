let i;

function enableSetListItems(element) {
    let listItems = [];

    // Initialize listItems with the current children
    for (let i of element.children) {
        if (i.tagName !== 'HR') {
            listItems.push(i.innerHTML); // Adds the items to the listItems array
        }
    }

    // Define the listItems property with getter and setter
    Object.defineProperty(element, 'listItems', {
        get() {
            return listItems;
        },
        set(newValue) {
            console.log('listItems changed to:', newValue);
            listItems = newValue; // Update the array
        }
    });

    // Set the initial value of listItems
    element.listItems = listItems;
}

export { enableSetListItems }