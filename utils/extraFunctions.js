function extractRgb (i) {
    let rgb = window.getComputedStyle(i)['background-color'];
    rgb = rgb.replaceAll('a', '').substring(4, rgb.length).replaceAll(')', '');
    rgb = rgb.split(',');

    return rgb;
}

export { extractRgb };