import { getBaseColor } from './utils/colors';
import { sdbm } from './utils/math';
import drawGradient from './parts/gradient';
import drawPupil from './parts/pupil';
import drawIrisFlare from './parts/irisFlare';
import drawIris from './parts/iris';
import drawReflection from './parts/reflection';

const viewportSize = 256;
const irisSize = 90;

function removeAllChildNodes() {
  const parent = document.getElementById("output");

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function drawEye() {
  const largeInt = sdbm(Date.now().toString());
  const binary = largeInt.toString(2).padStart(32, "0");

  const baseColorString = binary.substring(0, 3);
  const baseColor = getBaseColor(baseColorString);

  const gradientId = drawGradient(baseColor, binary);
  drawIris(gradientId, viewportSize, irisSize);
  drawIrisFlare(binary, baseColor, viewportSize, irisSize);
  const radius = drawPupil(binary, viewportSize);
  drawReflection(binary, radius, viewportSize);
}

export function render() {
  const root = document.querySelector('app-root');
  if (root) {
      root.innerHTML = '<svg id="output"></svg>'; // <svg id="output">Hello World</svg>
  }

  drawEye();
}
