/**
 * Convert a string into a hyperlink that will be understood by Among Us
 * @param {String} text - The text you would like to make a hyperlink
 * @param {String} link - The location of the hyperlink (Note: links must start with https:// or http://, if your link has neither https:// will be added for you)
 */
export function addLink(text: String, link: String): String {
  if (!link.match("^https?://")) {
    link = "https://" + link;
  }
  return "[" + link + "]" + text + "[]";
}

/**
 *  Will constrain a number to a minimum and maximum size
 * @param {Number} n - The number to constrain
 * @param {Number} min The minimum amount
 * @param {Number} max The maximum amount
 */
function clampInt(n: Number, min: Number, max: Number): Number {
  if (n > max) {
    n = max;
  } else if (min > n) {
    n = min;
  }
  return n;
}

/**
 *
 * @param {String} text - The text to set the color of
 * @param {Number} red - The red level
 * @param {Number} green - The green level
 * @param {Number} blue - The blue level
 * @param {Number} [alpha = 255]  - The alpha level (will default to 255)
 */
export function addColor(
  text: String,
  red: Number,
  green: Number,
  blue: Number,
  alpha: Number = 255
): String {
  red = clampInt(red, 0, 255);
  green = clampInt(green, 0, 255);
  blue = clampInt(blue, 0, 255);
  alpha = clampInt(alpha, 0, 255);

  let redHex: string, greenHex: string, blueHex: string, alphaHex: String;

  redHex = red < 16 ? "0" + red.toString(16) : red.toString(16);
  greenHex = green < 16 ? "0" + green.toString(16) : green.toString(16);
  blueHex = blue < 16 ? "0" + blue.toString(16) : blue.toString(16);
  alphaHex = alpha < 16 ? "0" + alpha.toString(16) : alpha.toString(16);

  return "[" + redHex + greenHex + blueHex + alphaHex + "]" + text + "[]";
}
