/**
 * The ribbon as a data URI, for the icon and the OG card.
 *
 * The generated-image runtime only partially supports inline SVG elements, so
 * the mark is handed to it as an <img> source instead. Same path as the React
 * component in `components/Ribbon.tsx` — if one changes, change both.
 */
export const RIBBON_PATH =
  "M 30 124 C 32 98 45 80 50 68 C 60 48 66 30 50 16 C 34 30 40 48 50 68 C 55 80 68 98 70 124";

export function ribbonDataUri(stroke: string, strokeWidth = 15): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 136"><path d="${RIBBON_PATH}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
