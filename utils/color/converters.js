function rgbaToHex(orig) {
      let rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);

      let hex = rgb ?
      (rgb[1] | 1 << 8).toString(16).slice(1) +
      (rgb[2] | 1 << 8).toString(16).slice(1) +
      (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

    return `#${hex}`;
  }

  function RGBToHSL(val) {
    let rgb = val.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    alert(rgb)
    let r = rgb[0], g = rgb[1], b = rgb[2];
  // Make r, g, and b fractions of 1
  r = r / 255;
  g = g / 255;
  b = b / 255;

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h = 0;
  let s = 0;
  let l = (cmax + cmin) / 2;

  // Calculate hue
  if (delta === 0) {
    h = 0; // No difference
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) {
    h += 360;
  }

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Convert to percentage
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${h}deg, ${s}% ${l}%)`;
}

  export { rgbaToHex, RGBToHSL };