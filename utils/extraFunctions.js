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
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

function convertToRightType(value) { //converts value to the best matches type 
    console.log(value)
    if(!isNaN(Number(value))) {
        return 0;
    }else if(value === 'true' || value === 'false') {
        return true;
    } else {
        return 'UwU';
    }

}

export { extractRgb, getAllIndexes, convertToRightType };