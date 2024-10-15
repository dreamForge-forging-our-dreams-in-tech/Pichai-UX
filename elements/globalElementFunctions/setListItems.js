function enableSetListItems(element) {
    element.listItems = [];

    for (i of this.children) {
        if (i.tagName == 'HR') { } else {
            let text = String(i.innerHTML)
            this.listItems.push(text); //adds the items to the listItems object for setting/getting
        }
    }
}

export { enableSetListItems }