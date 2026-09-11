import { useId } from "react";
import type { Design, FontId } from "@/data/designs";
import type { FabricId, Format } from "@/data/taxonomy";
import { debossColour, highlightColour, isDark, shadowColour } from "@/lib/colour";
import { ICON_PATHS } from "@/lib/icons";


interface Props {
  design: Design;
  format: Format;
  fabric: FabricId;
  colourHex: string;
  fit?: "contain" | "scale";
  className?: string;
}


const FONT_FAMILY: Record<FontId, string> = {
  script: "var(--font-label-script)",
  serif: "var(--font-label-serif)",
  sans: "var(--font-label-sans)",
  hand: "var(--font-label-hand)",
  classic: "var(--font-label-classic)",
};

const CHAR_WIDTH: Record<FontId, number> = {
  script: 0.4,
  serif: 0.44,
  sans: 0.66,
  hand: 0.4,
  classic: 0.54,
};

const LINE_HEIGHT: Record<FontId, number> = {
  script: 1.0,
  serif: 1.0,
  sans: 1.15,
  hand: 0.95,
  classic: 1.1,
};

const FONT_WEIGHT: Record<FontId, number> = {
  script: 400,
  serif: 600,
  sans: 600,
  hand: 600,
  classic: 500,
};

const STAGE_W = 100;
const STAGE_H = 75;
const MM_PER_STAGE_W = 80;


// ── Geometry ───────────────────────────────────────────────────────────────

interface Face {
  w: number;
  h: number;
  path: string;
  textBox: { x: number; y: number; w: number; h: number };
}


function heartPath(w: number, h: number): string {
  const p = (x: number, y: number) => `${(x * w).toFixed(2)} ${(y * h).toFixed(2)}`;

  return [
    `M ${p(0.5, 0.96)}`,
    `C ${p(0.2, 0.76)}, ${p(0, 0.56)}, ${p(0, 0.32)}`,
    `C ${p(0, 0.13)}, ${p(0.13, 0.02)}, ${p(0.28, 0.02)}`,
    `C ${p(0.38, 0.02)}, ${p(0.46, 0.08)}, ${p(0.5, 0.18)}`,
    `C ${p(0.54, 0.08)}, ${p(0.62, 0.02)}, ${p(0.72, 0.02)}`,
    `C ${p(0.87, 0.02)}, ${p(1, 0.13)}, ${p(1, 0.32)}`,
    `C ${p(1, 0.56)}, ${p(0.8, 0.76)}, ${p(0.5, 0.96)} Z`,
  ].join(" ");
}


function roundedRect(w: number, h: number, r: number): string {
  return `M ${r} 0 H ${w - r} A ${r} ${r} 0 0 1 ${w} ${r} V ${h - r} A ${r} ${r} 0 0 1 ${w - r} ${h} H ${r} A ${r} ${r} 0 0 1 0 ${h - r} V ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`;
}


function faceFor(format: Format): Face {
  const { widthMm: w, shape } = format;
  const h = format.fold ? format.heightMm / 2 : format.heightMm;

  switch (shape) {
    case "circle": {
      const r = w / 2;

      return {
        w,
        h,
        path: `M ${r} 0 A ${r} ${r} 0 1 1 ${r} ${h} A ${r} ${r} 0 1 1 ${r} 0 Z`,
        textBox: { x: w * 0.13, y: h * 0.16, w: w * 0.74, h: h * 0.68 },
      };
    }
    case "heart":
      return {
        w,
        h,
        path: heartPath(w, h),
        textBox: { x: w * 0.16, y: h * 0.2, w: w * 0.68, h: h * 0.48 },
      };
    case "tag": {
      const pad = 2.5;
      const holeArea = 6.5;

      return {
        w,
        h,
        path: roundedRect(w, h, 3),
        textBox: { x: pad, y: holeArea, w: w - pad * 2, h: h - holeArea - pad },
      };
    }
    case "fold-over": {
      const pad = 2;

      return {
        w,
        h,
        path: roundedRect(w, h, 0.6),
        textBox: { x: pad, y: pad + 1.2, w: w - pad * 2, h: h - pad * 2 - 1.2 },
      };
    }
    default: {
      const pad = Math.min(2.5, h * 0.16);

      return {
        w,
        h,
        path: roundedRect(w, h, 1.4),
        textBox: { x: pad, y: pad, w: w - pad * 2, h: h - pad * 2 },
      };
    }
  }
}


// ── Layout ─────────────────────────────────────────────────────────────────

interface Layout {
  fontSize: number;
  letterSpacing: number;
  lines: Array<{ text: string; x: number; y: number }>;
  icon?: { x: number; y: number; size: number };
}


function layoutFor(design: Design, face: Face): Layout {
  const box = face.textBox;
  const lines = design.lines;
  const font = design.font;
  const lh = LINE_HEIGHT[font];
  const charW = CHAR_WIDTH[font] * (design.caps ? 1.12 : 1);
  const tracking = design.caps ? 0.12 : 0;
  const hasIcon = Boolean(design.icon);
  const beside = hasIcon && (design.iconPlacement === "left" || design.iconPlacement === "right");
  const stacked = hasIcon && !beside;

  if (lines.length === 0 && design.icon) {
    const size = Math.min(box.w, box.h) * 0.8;

    return {
      fontSize: 0,
      letterSpacing: 0,
      lines: [],
      icon: { x: box.x + (box.w - size) / 2, y: box.y + (box.h - size) / 2, size },
    };
  }

  const iconRows = stacked ? 0.95 : 0;
  const rows = lines.length * lh + iconRows;
  const longest = Math.max(...lines.map((l) => l.length + l.length * tracking), 1);
  const iconBesideFactor = beside ? 1.35 : 0;
  const widthLimited = box.w / (longest * charW + iconBesideFactor);
  const heightLimited = box.h / rows;
  const fontSize = Math.min(widthLimited, heightLimited, box.h * (lines.length === 1 ? 0.92 : 1));
  const iconSize = fontSize * (beside ? 0.95 : 0.85);
  const totalH = lines.length * fontSize * lh + (stacked ? iconSize * 1.1 : 0);
  const top = box.y + (box.h - totalH) / 2;
  const textW = longest * charW * fontSize;
  const blockW = textW + (beside ? iconSize * 1.35 : 0);
  const left = box.x + (box.w - blockW) / 2;
  const textCx = beside ? (design.iconPlacement === "left" ? left + iconSize * 1.35 + textW / 2 : left + textW / 2) : box.x + box.w / 2;

  let cursor = top;
  let icon: Layout["icon"];

  if (stacked && design.iconPlacement === "above") {
    icon = { x: box.x + box.w / 2 - iconSize / 2, y: cursor, size: iconSize };
    cursor += iconSize * 1.1;
  }

  const placed = lines.map((text) => {
    const y = cursor + fontSize * lh * 0.72;

    cursor += fontSize * lh;

    return { text, x: textCx, y };
  });

  if (stacked && design.iconPlacement === "below") {
    icon = { x: box.x + box.w / 2 - iconSize / 2, y: cursor + iconSize * 0.05, size: iconSize };
  }

  if (beside) {
    const iy = top + totalH / 2 - iconSize / 2;
    const ix = design.iconPlacement === "left" ? left : left + iconSize * 0.35 + textW;

    icon = { x: ix, y: iy, size: iconSize };
  }

  return { fontSize, letterSpacing: tracking * fontSize, lines: placed, icon };
}


// ── Component ──────────────────────────────────────────────────────────────

export default function LabelPreview({ design, format, fabric, colourHex, fit = "contain", className }: Props) {
  const uid = useId().replace(/:/g, "");
  const face = faceFor(format);
  const layout = layoutFor(design, face);

  const scale =
    fit === "scale"
      ? STAGE_W / MM_PER_STAGE_W
      : Math.min((STAGE_W * 0.86) / face.w, (STAGE_H * 0.8) / face.h);

  const drawW = face.w * scale;
  const drawH = face.h * scale;
  const ox = (STAGE_W - drawW) / 2;
  const oy = (STAGE_H - drawH) / 2;

  const mark = debossColour(colourHex);
  const hi = highlightColour(colourHex);
  const lo = shadowColour(colourHex);
  const dark = isDark(colourHex);
  const velvet = fabric === "lux-velvet";

  const clipId = `clip-${uid}`;
  const fillId = `fill-${uid}`;
  const noiseId = `noise-${uid}`;
  const sheenId = `sheen-${uid}`;
  const shadowId = `shadow-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
      className={className}
      role="img"
      aria-label={`${design.name} label, ${format.name} ${format.shape} in ${fabric === "lux-velvet" ? "lux velvet" : "vegan suede"}`}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={face.path} />
        </clipPath>

        <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={velvet ? hi : colourHex} />
          <stop offset="0.45" stopColor={colourHex} />
          <stop offset="1" stopColor={velvet ? lo : colourHex} />
        </linearGradient>

        <radialGradient id={sheenId} cx="0.3" cy="0.25" r="0.8">
          <stop offset="0" stopColor="#ffffff" stopOpacity={velvet ? 0.22 : 0.08} />
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        <filter id={noiseId} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency={velvet ? "0.9" : "1.6"} numOctaves="2" seed="7" result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values={`0 0 0 0 ${dark ? 1 : 0}  0 0 0 0 ${dark ? 1 : 0}  0 0 0 0 ${dark ? 1 : 0}  0 0 0 ${velvet ? 0.16 : 0.1} 0`}
          />
        </filter>

        <filter id={shadowId} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="0.9" stdDeviation="0.9" floodColor="#2a2118" floodOpacity="0.28" />
        </filter>
      </defs>

      <g transform={`translate(${ox} ${oy}) scale(${scale})`}>
        <path d={face.path} fill={colourHex} filter={`url(#${shadowId})`} />

        <g clipPath={`url(#${clipId})`}>
          <rect width={face.w} height={face.h} fill={`url(#${fillId})`} />
          <rect width={face.w} height={face.h} fill={`url(#${sheenId})`} />
          <rect width={face.w} height={face.h} filter={`url(#${noiseId})`} />

          {format.fold && (
            <rect width={face.w} height={1.1} fill={dark ? "#ffffff" : "#000000"} opacity={dark ? 0.16 : 0.14} />
          )}

          {format.hole && (
            <circle cx={face.w / 2} cy={3.6} r={1.4} fill="#f5efe6" stroke={lo} strokeWidth={0.3} />
          )}

          <g style={{ fontFamily: FONT_FAMILY[design.font], fontWeight: FONT_WEIGHT[design.font] }}>
            {layout.lines.map((line, i) => (
              <g key={i}>
                <text
                  x={line.x}
                  y={line.y}
                  fontSize={layout.fontSize}
                  letterSpacing={layout.letterSpacing}
                  textAnchor="middle"
                  fill={dark ? lo : hi}
                  transform="translate(0.12 0.12)"
                >
                  {line.text}
                </text>
                <text x={line.x} y={line.y} fontSize={layout.fontSize} letterSpacing={layout.letterSpacing} textAnchor="middle" fill={mark}>
                  {line.text}
                </text>
              </g>
            ))}
          </g>

          {design.icon && layout.icon && (
            <g transform={`translate(${layout.icon.x} ${layout.icon.y}) scale(${layout.icon.size / 24})`}>
              <path
                d={ICON_PATHS[design.icon]}
                fill="none"
                stroke={dark ? lo : hi}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(0.5 0.5)"
              />
              <path d={ICON_PATHS[design.icon]} fill="none" stroke={mark} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
        </g>

        <path d={face.path} fill="none" stroke={dark ? "#ffffff" : "#000000"} strokeOpacity={0.12} strokeWidth={0.25} />
      </g>
    </svg>
  );
}
