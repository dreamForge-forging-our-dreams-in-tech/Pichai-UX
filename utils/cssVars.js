function varExists(name) {
    return new Promise((resolve) => {
        let r = document.querySelector(':root');
        let rs = getComputedStyle(r);

        setInterval(() => {
            if (String(rs.getPropertyValue(name)) != 'undefined') {
                resolve(String(rs.getPropertyValue(name)) != 'undefined');
            }
        }, 100);
    });
}

    export { varExists };