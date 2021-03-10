import { getColorString } from '../utils/colors';
import { createSvgElement } from '../utils/draw';


export default function drawGradient(baseColor, binaryString) {
  const gradientId = `irisGradient--${binaryString}`;
  
  const defs = createSvgElement("defs");

  const gradient = createSvgElement("radialGradient");
  gradient.setAttribute("id", gradientId)

  const start = createSvgElement("stop");
  start.setAttribute("offset", "0%")
  start.setAttribute("stop-color", "white")

  const end = createSvgElement("stop");
  end.setAttribute("offset", "100%")
  end.setAttribute("stop-color", getColorString(baseColor))

  const destination = document.getElementById("output");

  gradient.appendChild(start);
  gradient.appendChild(end);
  defs.appendChild(gradient);
  destination.appendChild(defs);

  return gradientId
}
