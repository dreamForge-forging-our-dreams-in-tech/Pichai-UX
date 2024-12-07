function varExists(name) {
    return new Promise((resolve) => {
        let r = document.querySelector(':root');
        let rs = getComputedStyle(r);

        setInterval(() => {

            console.log(String(rs.getPropertyValue(name)))
            if (String(rs.getPropertyValue(name)) != 'undefined') {
                resolve(String(rs.getPropertyValue(name)) != 'undefined');
            }
        }, 2000);
    });
}

    export { varExists };