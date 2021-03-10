import { getBaseColor, getColorString, lighten } from './utils/colors';
import { sdbm, polarToCartesian, describeArc } from './utils/math';

const viewportSize = 256;
const irisSize = 90;

function removeAllChildNodes() {
  const parent = document.getElementById("output");

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getScalar(value, maxValue, min, max) {
  return min + (max - min) * (value / maxValue);
}

function drawReflection(binaryString, radius) {
  const reflectionBits = binaryString.substring(12, 15);
  const reflectionAngle = getScalar(parseInt(reflectionBits, 2), 7, -70, 70);
  const coords = polarToCartesian(
    viewportSize * 0.5,
    viewportSize * 0.5,
    radius,
    reflectionAngle
  ); // switch the 20
  const reflection = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  reflection.setAttribute("fill", "white");
  reflection.setAttribute("cx", coords.x);
  reflection.setAttribute("cy", coords.y);
  reflection.setAttribute("r", 16);

  const destination = document.getElementById("output");

  destination.appendChild(reflection);
}

function drawPupil(binaryString) {
  const seedString = binaryString.substring(0, 2);
  const radius = {
    "01": 48,
    10: 44,
    11: 40,
    "00": 36
  }[seedString];

  const pupil = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  pupil.setAttribute("fill", "black");
  pupil.setAttribute("cx", viewportSize * 0.5);
  pupil.setAttribute("cy", viewportSize * 0.5);
  pupil.setAttribute("r", radius);

  const destination = document.getElementById("output");

  destination.appendChild(pupil);
  return radius;
}

function drawIris(baseColor) {
  const irisOutline = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  irisOutline.setAttribute("fill", getColorString(baseColor));
  irisOutline.setAttribute("stroke", "black");
  irisOutline.setAttribute("stroke-width", 4);
  irisOutline.setAttribute("cx", viewportSize * 0.5);
  irisOutline.setAttribute("cy", viewportSize * 0.5);
  irisOutline.setAttribute("r", irisSize);

  const destination = document.getElementById("output");

  destination.appendChild(irisOutline);
}

function drawIrisFlare(binary, baseColor) {
  const largeArcBits = binary.substring(4, 6);
  const largeArcSize = getScalar(parseInt(largeArcBits, 2), 7, 140, 180);

  const largeIrisArcDefinition = describeArc(
    viewportSize * 0.5,
    viewportSize * 0.5,
    irisSize - 2,
    180 - 0.5 * largeArcSize,
    180 + 0.5 * largeArcSize
  );
  const largeIrisFlareColor = lighten(baseColor, 70);
  const largeIrisFlare = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  largeIrisFlare.setAttribute("fill", getColorString(largeIrisFlareColor));
  largeIrisFlare.setAttribute("d", largeIrisArcDefinition);

  const smallArcBits = binary.substring(7, 10);
  const smallArcSize = getScalar(parseInt(largeArcBits, 2), 7, 45, 70);
  const smallIrisArcDefinition = describeArc(
    viewportSize * 0.5,
    viewportSize * 0.5,
    irisSize - 2,
    180 - 0.5 * smallArcSize,
    180 + 0.5 * smallArcSize
  );
  const smallIrisFlareColor = lighten(baseColor, 100);
  const smallIrisFlare = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  smallIrisFlare.setAttribute("fill", getColorString(smallIrisFlareColor));
  smallIrisFlare.setAttribute("d", smallIrisArcDefinition);

  const destination = document.getElementById("output");

  destination.appendChild(largeIrisFlare);
  destination.appendChild(smallIrisFlare);
}

function drawEye() {
  const largeInt = sdbm(Date.now().toString());
  const binary = largeInt.toString(2).padStart(32, "0");

  const baseColorString = binary.substring(0, 3);
  const baseColor = getBaseColor(baseColorString);

  drawIris(baseColor);
  drawIrisFlare(binary, baseColor);
  const radius = drawPupil(binary);
  drawReflection(binary, radius);
}

export function render() {
  const root = document.querySelector('app-root');
  if (root) {
      root.innerHTML = '<div>Herrloo</div>'; // <svg id="output">Hello World</svg>
  }

  drawEye();
}
