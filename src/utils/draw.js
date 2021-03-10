
export function createSvgElement(elementType) {
  return document.createElementNS(
    "http://www.w3.org/2000/svg",
    elementType
  );
}