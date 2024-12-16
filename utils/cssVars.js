function varExists(name) {
    return new Promise((resolve) => {
        let r = document.querySelector(':root');
        let rs = getComputedStyle(r);

        setInterval(() => {
            if (String(rs.getPropertyValue(name)) != '') {
                resolve(String(rs.getPropertyValue(name)) != '');
            }
        }, 1);
    });
}

    export { varExists };