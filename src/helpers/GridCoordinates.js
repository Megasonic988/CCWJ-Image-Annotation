const HORIZONTAL_SPACING = 50;
const VERTICAL_SPACING = 50;

export function getCoordinates(width, height) {
    const dotCoordinates = [];
    let dotIndex = 0;
    for (let y = VERTICAL_SPACING / 2; y < height; y = y + VERTICAL_SPACING) {
      for (let x = HORIZONTAL_SPACING / 2; x < width; x = x + HORIZONTAL_SPACING) {
        dotCoordinates.push({ x: x, y: y, dotIndex: dotIndex });
        dotIndex++;
      }
    }
    return dotCoordinates;
}

export function getCoordinatesInRegion(imageWidth, imageHeight, regionPoint1, regionPoint2) {
  const dotCoordinates = getCoordinates(imageWidth, imageHeight);
  const dotCoordinatesInRegion = dotCoordinates.filter(c => {
    const inXBounds = (regionPoint1.x <= c.x && c.x <= regionPoint2.x) ||
                      (regionPoint2.x <= c.x && c.x <= regionPoint1.x);
    const inYBounds = (regionPoint1.y <= c.y && c.y <= regionPoint2.y) ||
                      (regionPoint2.y <= c.y && c.y <= regionPoint1.y);
    return inXBounds && inYBounds;
  });
  return dotCoordinatesInRegion;
}