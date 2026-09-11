function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);

  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}


function rgbToHex([r, g, b]: [number, number, number]): string {
  return "#" + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
}


export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;

    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}


export function mix(hex: string, target: string, amount: number): string {
  const a = hexToRgb(hex);
  const b = hexToRgb(target);

  return rgbToHex([a[0] + (b[0] - a[0]) * amount, a[1] + (b[1] - a[1]) * amount, a[2] + (b[2] - a[2]) * amount]);
}


export function isDark(hex: string): boolean {
  return luminance(hex) < 0.18;
}


// Laser debossing crushes the pile, so on dark fabric the mark reads as a
// lighter sheen and on light fabric as a shadowed, darker tone.
export function debossColour(hex: string): string {
  return isDark(hex) ? mix(hex, "#ffffff", 0.36) : mix(hex, "#000000", 0.5);
}


export function highlightColour(hex: string): string {
  return mix(hex, "#ffffff", 0.18);
}


export function shadowColour(hex: string): string {
  return mix(hex, "#000000", 0.28);
}
