
export function getBaseColor(substring) {
  return {
    "000": {
      r: 1,
      g: 163,
      b: 255
    },
    "001": {
      r: 180,
      g: 97,
      b: 1
    },
    "010": {
      r: 1,
      g: 175,
      b: 39
    },
    100: {
      r: 162,
      g: 89,
      b: 255
    },
    110: {
      r: 214,
      g: 134,
      b: 234
    },
    101: {
      r: 255,
      g: 245,
      b: 1
    },
    "011": {
      r: 74,
      g: 255,
      b: 114
    },
    "111": {
      r: 242,
      g: 189,
      b: 255
    }
  }[substring];
}

export function getColorString(rgbObject, opacity = 1) {
  return (
    "rgba(" +
    rgbObject.r +
    "," +
    rgbObject.g +
    "," +
    rgbObject.b +
    "," +
    opacity +
    ")"
  );
}

export function lighten(rgbObject, factor) {
  return {
    r: Math.max(0, rgbObject.r + factor),
    g: Math.max(0, rgbObject.g + factor),
    b: Math.max(0, rgbObject.b + factor)
  };
}
