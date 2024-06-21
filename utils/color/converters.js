function rgbaToHex(rgba) {
    const parts = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    const alpha = (parts && parts[4] || '').trim();
    const hex = parts
        ? (parseInt(parts[1], 10) | 1 << 8).toString(16).slice(1) +
          (parseInt(parts[2], 10) | 1 << 8).toString(16).slice(1) +
          (parseInt(parts[3], 10) | 1 << 8).toString(16).slice(1)
        : rgba;

    if (alpha !== '') {
        const adjustedAlpha = Math.round(parseFloat(alpha) * 255).toString(16).substring(0, 2);
        return hex + adjustedAlpha;
    } else {
        return hex;
    }
}

  export { rgbaToHex };