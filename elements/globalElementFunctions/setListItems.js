let i;

function enableSetListItems(element, callback) { // allows user to set the contents of a listview with js code, after finishing a callback is fired - required
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
            if (element.children.length == 0) {
                element.firstTime = true;
            }

            if (!element.firstTime) { } else { // checks if it is set for the firsttime, if so ignore changes
                element.innerHTML = '';
                if (!newValue) {
                    element.classList.add('Hidden');
                } else {
                    element.classList.remove('Hidden');
                }

                for (i of newValue) {
                    let a = document.createElement(i == 'HR' ? 'hr' : 'li');
                    a.innerHTML = i == 'HR' ? '' : i;
                    a.id = i;

                    element.appendChild(a);
                }

                element.firstTime = true;
            }

            try {
                callback(element);
            } catch (e) {
                console.error(e)
            }
        }
    });

    // Set the initial value of listItems
    element.listItems = listItems;
}

export { enableSetListItems }