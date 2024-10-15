let i;

function enableSetListItems(element) {
    element.listItems = [];

    for (i of element.children) {
        if (i.tagName == 'HR') { } else {
            element.listItems.push(i.innerHTML); //adds the items to the listItems object for setting/getting
        }
    }
}

export { enableSetListItems }