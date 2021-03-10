import { polarToCartesian } from '../utils/math';
import { createSvgElement } from '../utils/draw';

function getScalar(value, maxValue, min, max) {
  return min + (max - min) * (value / maxValue);
}

export default function drawReflection(binaryString, radius, viewportSize) {
  const reflectionBits = binaryString.substring(12, 15);
  const reflectionAngle = getScalar(parseInt(reflectionBits, 2), 7, -70, 70);
  const coords = polarToCartesian(
    viewportSize * 0.5,
    viewportSize * 0.5,
    radius,
    reflectionAngle
  );
  const reflection = createSvgElement(
    "circle"
  );
  reflection.setAttribute("fill", "white");
  reflection.setAttribute("cx", coords.x);
  reflection.setAttribute("cy", coords.y);
  reflection.setAttribute("r", 16);

  const destination = document.getElementById("output");

  destination.appendChild(reflection);
}
