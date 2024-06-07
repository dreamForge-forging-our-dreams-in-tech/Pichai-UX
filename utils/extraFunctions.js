function extractRgb (i) {
    let rgb = window.getComputedStyle(i)['background-color'];
    rgb = rgb.replaceAll('a', '').substring(4, rgb.length).replaceAll(')', '');
    rgb = rgb.split(',');
    
    if(rgb[3]){
        rgb = extractRgb(i.parentNode);
    }

    return rgb;
}

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = String(arr).indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

export { extractRgb, getAllIndexes };