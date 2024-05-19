function extractRgb (i) {
    let rgb = window.getComputedStyle(i)['background-color'];
    rgb = rgb.replaceAll('a', '').substring(4, rgb.length).replaceAll(')', '');
    rgb = rgb.split(',');

    if(rgb[3]){
        console.log(i)
        rgb = extractRgb(i);
        console.log(rgb)
    }

    return rgb;
}

export { extractRgb };