function extractRgb (i) {
    let rgb = window.getComputedStyle(i)['background-color'];
    rgb = rgb.replaceAll('a', '').substring(4, rgb.length).replaceAll(')', '');
    rgb = rgb.split(',');
    
    if(rgb[3]){
        rgb = extractRgb(i.parentNode);
    }

    console.log(i,rgb)

    return rgb;
}

export { extractRgb };