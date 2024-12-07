function varExists(name) {
    return new Promise((resolve) => {
        let r = document.querySelector(':root');
        let rs = getComputedStyle(r);

        setInterval(() => {

            if (String(rs.getPropertyValue('--primary')) == 'undefined') {
                resolve(String(rs.getPropertyValue('--primary')) == 'undefined');
            }
        }, 2000);
    });
}

    export { varExists };