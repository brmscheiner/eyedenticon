import { getColorString, lighten } from '../utils/colors';
import { describeArc } from '../utils/math';
import { createSvgElement } from '../utils/draw';

function getScalar(value, maxValue, min, max) {
  return min + (max - min) * (value / maxValue);
}

export default function drawIrisFlare(binary, baseColor, viewportSize, irisSize) {
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
  const largeIrisFlare = createSvgElement(
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
  const smallIrisFlare = createSvgElement(
    "path"
  );
  smallIrisFlare.setAttribute("fill", getColorString(smallIrisFlareColor));
  smallIrisFlare.setAttribute("d", smallIrisArcDefinition);

  const destination = document.getElementById("output");

  destination.appendChild(largeIrisFlare);
  destination.appendChild(smallIrisFlare);
}
