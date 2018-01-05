const HORIZONTAL_SPACING = 200;
const VERTICAL_SPACING = 200;

export function getCoordinates(width, height) {
    const dotCoordinates = [];
    for (let y = VERTICAL_SPACING / 2; y < height; y = y + VERTICAL_SPACING) {
      for (let x = HORIZONTAL_SPACING / 2; x < width; x = x + HORIZONTAL_SPACING) {
        dotCoordinates.push({ x: x, y: y });
      }
    }
    return dotCoordinates;
}