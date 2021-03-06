import { createSvgElement } from '../utils/draw';

export default function drawIris(gradientId, viewportSize, irisSize) {
  const irisOutline = createSvgElement(
    "circle"
  );
  irisOutline.setAttribute("fill", `url('#${gradientId}')`);
  irisOutline.setAttribute("stroke", "black");
  irisOutline.setAttribute("stroke-width", 4);
  irisOutline.setAttribute("cx", viewportSize * 0.5);
  irisOutline.setAttribute("cy", viewportSize * 0.5);
  irisOutline.setAttribute("r", irisSize);

  const destination = document.getElementById("output");

  destination.appendChild(irisOutline);
}
