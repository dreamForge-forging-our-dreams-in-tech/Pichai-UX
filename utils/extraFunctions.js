import { getTextColor } from '../AI/textColorFInder.js';

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

function convertToRightType(value) { //converts value to the best matched type 
    if(value === 'true' || value === 'false') {
        return true;
    } else if(!isNaN(Number(value))) {
        return 0;
    } else {
        return 'UwU';
    }

}

function optimizeTextColor(el) {
    let elements = [];
    elements = el.getElementsByTagName('*');
    
    let i;

    for (i of elements) {

        try {
            let rgb = extractRgb(i);

            i.style.color = getTextColor(rgb);
        } catch (e) { }

        let color = window.getComputedStyle(i)['color'];

        if (i.tagName == 'LI' && color == 'rgb(0, 0, 0)') {
            i.classList.add('black');
        }
    }
}

function html5ToObject (data) {
    let object = {};
    data.forEach(function (value, key) {
        object[key] = value;
    });
    return JSON.stringify(object);
}

export { extractRgb, getAllIndexes, convertToRightType, optimizeTextColor, html5ToObject };