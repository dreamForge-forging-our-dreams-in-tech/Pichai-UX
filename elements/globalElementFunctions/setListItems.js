let i;

function enableSetListItems(element,callback) {
    let listItems = [];

    // Initialize listItems with the current children
    for (let i of element.children) {
        if (i.tagName == 'HR' || i == 'HR') {
            listItems.push('HR');
        } else {
            listItems.push(i.innerHTML); // Adds the items to the listItems array
        }
    }

    // Define the listItems property with getter and setter
    Object.defineProperty(element, 'listItems', {
        get() {
            return listItems;
        },
        set(newValue) {
            element.innerHTML = '';

            for(i of newValue ) {
                let a = document.createElement(i == 'HR' ? 'hr' : 'li');
                a.innerHTML = i == 'HR' ? '' : i;

                element.appendChild(a);
            }
            callback(element)
        }
    });

    // Set the initial value of listItems
    element.listItems = listItems;
}

export { enableSetListItems }