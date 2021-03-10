import { createSvgElement } from '../utils/draw';

export default function drawPupil(binaryString, viewportSize) {
  const seedString = binaryString.substring(0, 2);
  const radius = {
    "01": 48,
    10: 44,
    11: 40,
    "00": 36
  }[seedString];

  const pupil = createSvgElement(
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
