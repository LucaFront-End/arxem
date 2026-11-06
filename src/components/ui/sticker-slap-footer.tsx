"use client";

import * as React from "react";

/**
 * Corporate Minimalist Sticker-Slap Footer — ARXEM Radiología Edition.
 *
 * - Eliminates the disconnected outer top bar in favor of an integrated
 *   architectural header inside the obsidian panel.
 * - Upgrades the draggable stickers into high-craft industrial seals,
 *   metallic periodic plates, curved-text certification stamps, and studio
 *   product cutouts that rest cleanly along the "arxem" signature.
 */

export const hash = (n: number): number => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

export const round = (v: number): number => Math.round(v * 100) / 100;

export const clamp = (v: number, lo: number, hi: number): number =>
  Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : lo;

export const SCRIPT: Record<string, [number, string, string?, number?]> = {
  a: [
    10.2,
    "M0 -1C1.4 -1.4 1.4 -9.6 4.3 -10C2.5 -10 1 -7.8 1 -5C1 -2.2 2.5 0 4.3 0C6.1 0 7.6 -2.2 7.6 -5L7.8 -10L7.8 -3C7.8 -0.8 8.8 -1 10.2 -1",
  ],
  b: [
    9.4,
    "M0 -1C2.8 -3 6.2 -12 6 -16.4C5.8 -19.8 1.8 -20 1.8 -16.4L1.8 -1L1.8 -6C2.4 -9 3.4 -10 4.8 -10C6.8 -10 8.2 -8 8.2 -5C8.2 -2 6.6 0 4.8 0C3.4 0 2.4 -0.6 1.8 -1.6C2.4 -0.6 3.4 0 4.8 0C6.6 0 7.8 -0.8 9.4 -1",
  ],
  c: [
    8.8,
    "M0 -1C1.4 -1.4 1.4 -9.6 4.3 -10C5.6 -10 6.6 -9.6 7 -8.6C6.6 -9.6 5.6 -10 4.3 -10C2.5 -10 1 -7.8 1 -5C1 -2.2 2.5 0 4.3 0C6 0 7 -1 8.8 -1",
  ],
  d: [
    10.2,
    "M0 -1C1.4 -1.4 1.4 -9.6 4.3 -10C2.5 -10 1 -7.8 1 -5C1 -2.2 2.5 0 4.3 0C6.1 0 7.6 -2.2 7.6 -5L7.8 -19L7.8 -3C7.8 -0.8 8.8 -1 10.2 -1",
  ],
  e: [
    9.4,
    "M0 -1C3.4 -2.4 8 -4.4 8 -7.6C8 -9.4 6.6 -10.4 4.8 -10.4C2.2 -10.4 0.8 -7.8 0.8 -5C0.8 -1.8 2.6 0 5 0C6.8 0 8 -1 9.4 -1",
  ],
  f: [
    7,
    "M0 -1C2.8 -3 6.2 -12 6 -16.4C5.8 -19.8 1.8 -20 1.8 -16.4L1.8 7.2C1.8 9.6 3.2 9.6 3.8 7.6C4.4 5 4.8 -1 7 -1",
    "M-0.4 -9.4L5.4 -9.4",
  ],
  g: [
    9.6,
    "M0 -1C1.4 -1.4 1.4 -9.6 4.3 -10C2.5 -10 1 -7.8 1 -5C1 -2.2 2.5 0 4.3 0C6.1 0 7.6 -2.2 7.6 -5L7.8 -10L7.8 4C7.8 8.6 5.8 9.6 4.2 9.6C2 9.6 1.4 7.6 2.8 6C4.6 4 7.4 1.4 9.6 -1",
  ],
  h: [
    10,
    "M0 -1C2.8 -3 6.2 -12 6 -16.4C5.8 -19.8 1.8 -20 1.8 -16.4L1.8 -1L1.8 -5.6C2.6 -8.6 4 -10 5.6 -10C7.2 -10 7.8 -8.8 7.8 -7L7.8 -3C7.8 -0.8 8.8 -1 10 -1",
  ],
  i: [
    5,
    "M0 -1C1.2 -1.4 2 -6 2.2 -10L2.2 -3C2.2 -0.8 3.4 -1 5 -1",
    "M2.4 -15.2L2.5 -15.3",
  ],
  j: [
    5.4,
    "M0 -1C1.2 -1.4 2 -6 2.2 -10L2.2 4.6C2.2 9.6 -0.6 9.8 -0.2 7.4C0.2 5 3.4 1.4 5.4 -1",
    "M2.4 -15.2L2.5 -15.3",
  ],
  k: [
    9.6,
    "M0 -1C2.8 -3 6.2 -12 6 -16.4C5.8 -19.8 1.8 -20 1.8 -16.4L1.8 -1L1.8 -4.6C3 -8 5.6 -10.4 7 -9.6C8.4 -8.6 7 -5.6 3.6 -5C5.6 -4.6 6.6 -1 9.6 -1",
  ],
  l: [
    6.4,
    "M0 -1C2.8 -3 6.2 -12 6 -16.4C5.8 -19.8 1.8 -20 1.8 -16.4L1.8 -3.2C1.8 -0.6 4 -1 6.4 -1",
  ],
  m: [
    14.6,
    "M0 -1C1.2 -1.6 1.6 -6 1.8 -9.6L1.8 -1L1.8 -5.6C2.4 -8.6 3.4 -10 4.8 -10C6.2 -10 7 -9 7 -7L7 -1L7 -5.6C7.6 -8.6 8.6 -10 10 -10C11.4 -10 12.2 -9 12.2 -7L12.2 -3C12.2 -0.8 13.2 -1 14.6 -1",
  ],
  n: [
    9.6,
    "M0 -1C1.2 -1.6 1.6 -6 1.8 -9.6L1.8 -1L1.8 -5.6C2.4 -8.6 3.4 -10 4.8 -10C6.4 -10 7.2 -9 7.2 -7L7.2 -3C7.2 -0.8 8.2 -1 9.6 -1",
  ],
  o: [
    9,
    "M0 -1C1.4 -1.4 1.4 -9.6 4.3 -10C2.5 -10 1 -7.8 1 -5C1 -2.2 2.5 0 4.3 0C6.1 0 7.6 -2.2 7.6 -5C7.6 -7.8 6.1 -10 4.3 -10C6 -10 7.4 -9.2 9 -9",
    "",
    1,
  ],
  p: [
    9.6,
    "M0 -1C1.2 -1.6 1.6 -6 1.8 -9.6L1.8 9L1.8 -5.6C2.4 -8.6 3.4 -10 5 -10C7 -10 8.2 -8 8.2 -5C8.2 -2 6.6 0 4.8 0C3.4 0 2.4 -0.6 1.8 -1.6C2.4 -0.6 3.4 0 4.8 0C6.6 0 7.8 -0.8 9.6 -1",
  ],
  q: [
    10.4,
    "M0 -1C1.4 -1.4 1.4 -9.6 4.3 -10C2.5 -10 1 -7.8 1 -5C1 -2.2 2.5 0 4.3 0C6.1 0 7.6 -2.2 7.6 -5L7.8 -10L7.8 9C8.8 6 9 0 10.4 -1",
  ],
  r: [
    8.6,
    "M0 -1C1.2 -1.6 1.6 -6 1.8 -9.6L1.8 -1L1.8 -5.6C2.6 -8.6 4.2 -10 5.8 -10C6.8 -10 7.6 -9.6 8.2 -8.8",
    "",
    1,
  ],
  s: [
    8.4,
    "M0 -1C1.6 -2 3 -7 4.4 -10.2C5.6 -8 7.4 -6 7.4 -3.6C7.4 -1.2 5.6 0 3.6 0C2 0 1 -0.6 0.6 -1.6C1 -0.6 2 0 3.6 0C5.6 0 6.8 -0.8 8.4 -1",
  ],
  t: [
    6.6,
    "M0 -1C1 -1.4 2.2 -8 2.4 -15L2.4 -3.2C2.4 -0.8 4 -1 6.6 -1",
    "M-0.8 -9.6L6.2 -9.6",
  ],
  u: [
    10,
    "M0 -1C1.2 -1.6 1.6 -6 1.8 -9.6L1.8 -3.6C1.8 -1 3 0 4.6 0C6.2 0 7.4 -1.4 7.6 -4L7.6 -9.8L7.6 -3C7.6 -0.8 8.6 -1 10 -1",
  ],
  v: [
    9,
    "M0 -1C1.2 -1.6 1.6 -6 1.6 -9.6C1.6 -6 2.6 0 4.4 0C6.4 0 7.6 -6 7.6 -9.6C8 -9 8.4 -8.8 9 -8.8",
    "",
    1,
  ],
  w: [
    12.6,
    "M0 -1C1.2 -1.6 1.6 -6 1.6 -9.6L1.6 -3.6C1.6 -1 2.6 0 4 0C5.4 0 6.2 -1 6.2 -3.6L6.2 -8L6.2 -3.6C6.2 -1 7 0 8.4 0C9.8 0 10.8 -1 10.8 -3.6L10.8 -9.6C11.2 -9 11.8 -8.8 12.6 -8.8",
    "",
    1,
  ],
  x: [
    9,
    "M0 -1C1.6 -2 2 -8.6 3 -9.6L7 -1C7.6 -0.4 8.4 -1 9 -1",
    "M7.4 -9.6L2.4 -0.4",
  ],
  y: [
    9.6,
    "M0 -1C1.2 -1.6 1.6 -6 1.8 -9.6L1.8 -3.6C1.8 -1 3 0 4.6 0C6.2 0 7.4 -1.4 7.6 -4L7.6 -9.8L7.6 4.4C7.6 9 5.6 9.6 4.2 9.6C2 9.6 1.4 7.6 2.8 6C4.6 4 7.4 1.6 9.6 -1",
  ],
  z: [
    8.8,
    "M0 -1C1 -2 1.4 -9.6 2.6 -9.6L7.4 -9.6L1.6 -0.2L6 -0.2C7 -0.2 7.8 -1 8.8 -1",
  ],
  "!": [4, "M2 -16L2 -4.4", "M2 -0.6L2.1 -0.7", 1],
  ".": [3.6, "M1.8 -0.6L1.9 -0.7", "", 1],
};

export const SX = 1.22;
export const TRACK = 1;
export const WORD_GAP = 6;

export const place = (d: string, dx: number, sx: number = SX): string => {
  let k = 0;
  return d.replace(/-?\d*\.?\d+/g, (n) =>
    k++ % 2 === 0 ? String(round(+n * sx + dx)) : n,
  );
};

export type ScriptBox = { x0: number; x1: number; top: number };
export type ScriptWord = {
  main: string;
  extra: string[];
  width: number;
  top: number;
  bottom: number;
  boxes: ScriptBox[];
};

const extent = (d: string): number[] => {
  const n = (d.match(/-?\d*\.?\d+/g) ?? []).map(Number);
  return n.filter((_, i) => i % 2 === 1);
};

export const layoutScript = (text: string): ScriptWord => {
  const clean = String(text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  let x = 0;
  let main = "";
  const extra: string[] = [];
  const boxes: ScriptBox[] = [];
  let lift = true;
  let top = 0;
  let bottom = 0;
  for (const ch of clean) {
    const g = SCRIPT[ch];
    if (!g) {
      if (main) x += WORD_GAP;
      lift = true;
      continue;
    }
    const d = place(g[1], x);
    main += lift ? d : "L" + d.slice(1);
    if (g[2]) extra.push(place(g[2], x));
    const ys = extent(g[1] + (g[2] ?? ""));
    const t = Math.min(...ys);
    top = Math.min(top, t);
    bottom = Math.max(bottom, ...ys);
    boxes.push({ x0: round(x), x1: round(x + g[0] * SX), top: t });
    lift = !!g[3];
    x += g[0] * SX + TRACK;
  }
  return {
    main,
    extra,
    width: boxes.length ? round(x - TRACK) : 0,
    top,
    bottom,
    boxes,
  };
};

export type Spot = {
  x: number;
  y: number;
  size: number;
  rotate: number;
  depth: number;
};

/**
 * Places stickers cleanly along the lower/middle body of the wordmark so they
 * never poke up into the corporate text columns above.
 */
export const stickerSpots = (
  word: ScriptWord,
  n: number,
  seed: number = 0,
): Spot[] => {
  const count = Math.max(0, Math.floor(n) || 0);
  if (!count || !word.width) return [];
  return Array.from({ length: count }, (_, i) => {
    const x = ((i + 0.5) / count) * word.width;
    const verticalOffsets = [-3.2, -5.8, -3.6, -6.2, -4.0];
    return {
      x: round(x + (hash(i * 4.1 + seed) - 0.5) * 2),
      y: round(verticalOffsets[i % verticalOffsets.length]),
      size: round(5.2 + (i % 2) * 0.6),
      rotate: round(([-8, 6, -5, 9, -4][i % 5] ?? 0)),
      depth: round(0.45 + hash(i * 5.5 + seed + 3) * 0.55),
    };
  });
};

export type StickerKind =
  | "nom"
  | "pb"
  | "glass"
  | "logistics"
  | "product"
  | "burst"
  | "smiley"
  | "heart"
  | "bubble"
  | "daisy"
  | "camera"
  | "bolt";

export type StickerSpec =
  | StickerKind
  | {
      kind?: StickerKind;
      node?: React.ReactNode;
      label?: string;
      text?: string;
      x?: number;
      y?: number;
      size?: number;
      rotate?: number;
    };

export type SocialKind =
  | "linkedin"
  | "instagram"
  | "tiktok"
  | "x"
  | "youtube"
  | "dribbble";
export type Social = { kind: SocialKind; href: string; label?: string };
export type Job = { title: string; href?: string; onClick?: () => void };
export type Credit = { role: string; name: string };

export interface StickerSlapFooterProps {
  wordmark?: string;
  homeHref?: string;
  onHomeClick?: () => void;
  navLabel?: string;
  navHref?: string;
  onNavClick?: () => void;
  chatHref?: string;
  chatLabel?: string;
  onChatClick?: () => void;
  jobsLabel?: string;
  jobs?: Job[];
  officeLabel?: string;
  address?: string[];
  mapLabel?: string;
  mapHref?: string;
  onMapClick?: () => void;
  contactLabel?: string;
  email?: string;
  copiedLabel?: string;
  note?: string;
  socials?: Social[];
  stickers?: StickerSpec[];
  credits?: Credit[];
  height?: string;
  wordmarkMaxHeight?: string;
  paper?: string;
  panel?: string;
  ink?: string;
  cream?: string;
  accent?: string;
  fontSans?: string;
  onStickerMove?: (index: number, x: number, y: number) => void;
  className?: string;
}

const DEFAULT_JOBS: Job[] = [
  { title: "Vidrios Emplomados a Medida" },
  { title: "Blindaje en Lámina de Plomo" },
  { title: "Catálogo General & Equipos" },
  { title: "Nosotros (+14 Años en México)" },
];

const DEFAULT_SOCIALS: Social[] = [];

const DEFAULT_STICKERS: StickerSpec[] = [
  "nom",
  "pb",
  "glass",
  "logistics",
];

const DEFAULT_CREDITS: Credit[] = [
  { role: "Normativa Oficial", name: "NOM-229-SSA1-2002 · COFEPRIS" },
  { role: "Facturación Fiscal", name: "CFDI 4.0 · Distribuidora ARXEM® México" },
  { role: "Embalaje Nacional", name: "Huacal de Madera Estructural · 32 Estados" },
];

const LABELS: Record<StickerKind, string> = {
  nom: "Sello Certificación NOM-229-SSA1",
  pb: "Placa Metálica Plomo Pb-82 99.9%",
  glass: "Sello Cristal Óptico PbO",
  logistics: "Etiqueta Huacal Blindado 32 Estados",
  product: "Pieza Studio ARXEM",
  burst: "Sello Certificación",
  smiley: "Sello Clínico",
  heart: "Sello Garantía",
  bubble: "Sello Soporte",
  daisy: "Sello Calidad",
  camera: "Sello Radiología",
  bolt: "Sello Entrega Rápida",
};

const CUT = -1.2;
const STROKE = 3.0;
const SLANT = 0.14;

const SQUIGGLE = "M1 5C12 2 24 7 36 4S60 2 72 4S82 6 87 3";

const ICONS: Record<SocialKind, React.ReactNode> = {
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
      <path d="M8 10.5V16.5M12 16.5V10.5M12 13.2C12 11.6 13.1 10.4 14.6 10.4C16.1 10.4 17 11.4 17 13.1V16.5" />
      <path className="ssf-dot" d="M8 7.4L8 7.5" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5.2" />
      <circle cx="12" cy="12" r="3.8" />
      <path className="ssf-dot" d="M16.9 7.1L16.9 7.2" />
    </>
  ),
  tiktok: (
    <path d="M13.6 4V15A3.3 3.3 0 1 1 10.3 11.7M13.6 4C14 6.6 15.8 8.2 18.4 8.4" />
  ),
  x: <path d="M5 4.5H8.8L19 19.5H15.2ZM18.6 4.5L13.3 10.5M5.4 19.5L10.7 13.5" />,
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12.4" rx="4" />
      <path d="M10.4 9.6L14.6 12.2L10.4 14.8Z" />
    </>
  ),
  dribbble: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M7.4 4.9C11 9 13.6 14 15 20.2M3.6 10.6C9 11 14 9.6 18 6.2M5.6 17.6C8.6 14 13 12.6 20.4 13.4" />
    </>
  ),
};

const CSS =
  ".ssf{position:relative;isolation:isolate;overflow:hidden;overflow:clip;container-type:inline-size;display:flex;flex-direction:column;width:100%;box-sizing:border-box;padding:clamp(12px,1.5cqw,22px);background:var(--ssf-paper);color:var(--ssf-ink);font-family:var(--ssf-sans);font-weight:400;-webkit-font-smoothing:antialiased}" +
  ":where(.ssf) *,:where(.ssf) *::before,:where(.ssf) *::after{box-sizing:border-box}" +
  ":where(.ssf) button{appearance:none;background:none;border:0;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer}" +
  ":where(.ssf) a{color:inherit;text-decoration:none}" +
  ":where(.ssf) ul,:where(.ssf) p,:where(.ssf) h3{margin:0;padding:0;list-style:none;font:inherit}" +
  ".ssf svg{display:block;max-width:none;overflow:visible}" +
  ".ssf :focus-visible{outline:2px solid var(--ssf-accent);outline-offset:3px;border-radius:6px}" +
  ".ssf-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}" +
  // main obsidian architectural panel
  ".ssf-panel{position:relative;z-index:1;flex:1;display:flex;flex-direction:column;overflow:hidden;overflow:clip;border-radius:clamp(24px,2.5cqw,36px);background:var(--ssf-panel);color:var(--ssf-cream);transform-origin:50% 100%;scale:calc(.96 + .04 * var(--ssf-sp,1));border:1px solid rgba(255,255,255,0.08);box-shadow:0 32px 80px -20px rgba(13,17,23,0.35)}" +
  // integrated corporate header bar inside the dark panel
  ".ssf-header{position:relative;z-index:2;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;padding:clamp(24px,3.2cqw,40px) clamp(24px,3.8cqw,56px);border-bottom:1px solid rgba(255,255,255,0.08)}" +
  ".ssf-brand{display:inline-flex;align-items:center;gap:14px;color:#fff;transition:opacity .25s}" +
  ".ssf-brand:hover{opacity:.88}" +
  ".ssf-brand-badge{width:42px;height:42px;border-radius:12px;background:#fff;display:grid;place-items:center;padding:5px;box-shadow:0 6px 18px rgba(0,0,0,0.25)}" +
  ".ssf-brand-badge img{width:100%;height:100%;object-fit:contain}" +
  ".ssf-brand-text{display:flex;flex-direction:column}" +
  ".ssf-brand-name{font-size:18px;font-weight:800;letter-spacing:.08em;line-height:1;color:#fff}" +
  ".ssf-brand-sub{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(247,247,244,0.48);margin-top:4px}" +
  ".ssf-header-actions{display:flex;flex-wrap:wrap;align-items:center;gap:10px}" +
  ".ssf-btn-ghost{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:999px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(247,247,244,0.88);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.16em;transition:all .25s ease}" +
  ".ssf-btn-ghost:hover{background:rgba(255,255,255,0.14);border-color:rgba(255,255,255,0.28);color:#fff;transform:translateY(-1px)}" +
  ".ssf-btn-primary{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:999px;background:#0052FF;color:#fff;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.16em;transition:all .25s ease;box-shadow:0 8px 24px -6px rgba(0,82,255,0.55)}" +
  ".ssf-btn-primary:hover{background:#2563EB;transform:translateY(-1px)}" +
  ".ssf-dot-live{width:6px;height:6px;border-radius:50%;background:#34D399;box-shadow:0 0 8px #34D399}" +
  // 3 corporate columns
  ".ssf-cols{position:relative;z-index:2;display:grid;grid-template-columns:repeat(var(--ssf-n,3),minmax(0,1fr));gap:clamp(24px,3.2cqw,48px) clamp(20px,3cqw,44px);padding:clamp(30px,4.2cqw,54px) clamp(24px,3.8cqw,56px) clamp(28px,3.8cqw,52px)}" +
  ".ssf-col{display:flex;flex-direction:column;align-items:flex-start;min-width:0}" +
  ".ssf-tag{display:inline-flex;align-items:center;gap:6px;margin-bottom:clamp(14px,1.5cqw,20px);font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.22em;color:rgba(247,247,244,0.42)}" +
  ".ssf-big{font-size:clamp(16px,1.55cqw,22px);font-weight:600;line-height:1.45;letter-spacing:-.015em;color:rgba(247,247,244,0.9)}" +
  ".ssf-line{display:block;overflow:hidden;overflow:clip;padding:0 .08em .08em;margin:0 -.08em -.08em}" +
  ".ssf-line>*{display:inline-block}" +
  ".ssf-big a,.ssf-big button{position:relative;text-align:left;transition:color .2s}" +
  ".ssf-big a:hover,.ssf-big button:hover{color:#fff}" +
  ".ssf-big a::after,.ssf-big button::after{content:'';position:absolute;left:0;right:0;bottom:1px;height:1.5px;border-radius:1em;background:#0052FF;transform:scaleX(0);transform-origin:100% 50%;transition:transform .4s cubic-bezier(.6,0,.2,1)}" +
  ".ssf-big a:hover::after,.ssf-big button:hover::after,.ssf-big a:focus-visible::after,.ssf-big button:focus-visible::after{transform:scaleX(1);transform-origin:0 50%}" +
  ".ssf-copy{display:inline-grid !important}" +
  ".ssf-copy>span{grid-area:1/1;transition:transform .45s cubic-bezier(.2,1.2,.3,1),opacity .25s}" +
  ".ssf-copy .ssf-done{transform:translateY(105%);opacity:0;color:#34D399}" +
  ".ssf-copy.is-copied .ssf-addr{transform:translateY(-105%);opacity:0}" +
  ".ssf-copy.is-copied .ssf-done{transform:none;opacity:1}" +
  ".ssf-ast{display:inline-block;margin-left:.08em;color:#0052FF;transition:transform .5s cubic-bezier(.2,1.6,.3,1)}" +
  ".ssf-big a:hover .ssf-ast,.ssf-big button:hover .ssf-ast{transform:rotate(90deg) scale(1.15)}" +
  ".ssf-map{position:relative;display:inline-block;margin-top:clamp(14px,1.5cqw,20px);font-size:11px;font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.18em;color:rgba(247,247,244,0.65);padding-bottom:.55em}" +
  ".ssf-map svg{position:absolute;left:0;bottom:0;width:100%;height:.45em;color:#0052FF}" +
  ".ssf-map path{fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-dasharray:var(--l,120px) var(--l,120px);stroke-dashoffset:0}" +
  ".ssf-map:hover{color:#fff}" +
  ".ssf-map:hover path,.ssf-map:focus-visible path{animation:ssf-rewrite .7s cubic-bezier(.6,0,.3,1)}" +
  ".ssf-note{margin-top:clamp(12px,1.2cqw,16px);max-width:38ch;font-size:12px;line-height:1.55;color:rgba(247,247,244,0.45)}" +
  // the wordmark stage
  ".ssf-stage{position:relative;z-index:1;margin-top:auto;width:min(92%,calc(var(--ssf-wmh) * var(--ssf-ar)));align-self:center;padding:clamp(16px,2cqw,28px) clamp(8px,1cqw,16px) 0}" +
  ".ssf-stage-in{position:relative;container-type:inline-size;transform:translateY(calc((1 - var(--ssf-sp,1)) * 12%))}" +
  ".ssf-wm-btn{display:block;width:100%;border-radius:0 !important;cursor:pointer;-webkit-tap-highlight-color:transparent}" +
  ".ssf-wm{width:100%;height:auto;color:rgba(247,247,244,0.92)}" +
  ".ssf-wm path{fill:none;stroke:currentColor;stroke-width:" +
  STROKE +
  ";stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:var(--l,3000px) calc(var(--l,3000px) + 8px);stroke-dashoffset:calc(var(--l,3000px) + 4px)}" +
  // corporate tactile seals (stickers)
  ".ssf-st{position:absolute;z-index:3;translate:-50% -50%;touch-action:none;user-select:none;-webkit-user-select:none;transform:translate(calc(var(--ssf-px,0) * var(--d) * 6px),calc(var(--ssf-py,0) * var(--d) * 4px));transition:transform .7s cubic-bezier(.2,.8,.2,1)}" +
  ".ssf-st-btn{display:block;width:100%;cursor:grab;rotate:calc(var(--r) + var(--tilt,0deg));transition:rotate .5s cubic-bezier(.2,1.4,.3,1)}" +
  ".ssf-st.is-drag{z-index:9;transition:none}" +
  ".ssf-st.is-drag .ssf-st-btn{cursor:grabbing;transition:rotate .12s linear}" +
  ".ssf-st-lift{display:block;transition:transform .35s cubic-bezier(.2,1.5,.3,1),filter .35s;filter:drop-shadow(0 10px 22px rgba(0,0,0,.52))}" +
  ".ssf-st-btn:hover .ssf-st-lift,.ssf-st-btn:focus-visible .ssf-st-lift{transform:translateY(-5%) scale(1.06);filter:drop-shadow(0 16px 28px rgba(0,0,0,.65))}" +
  ".ssf-st.is-drag .ssf-st-lift{transform:translateY(-8%) scale(1.1);filter:drop-shadow(0 24px 34px rgba(0,0,0,.72))}" +
  ".ssf-st-slap{display:block}" +
  ".ssf-st svg{width:100%;height:auto}" +
  ".ssf-sheen{transform:translateX(-130%);transition:transform 0s}" +
  ".ssf-st-btn:hover .ssf-sheen{transform:translateX(130%);transition:transform .9s cubic-bezier(.4,0,.2,1)}" +
  ".ssf-ring{position:absolute;left:50%;top:50%;width:135%;aspect-ratio:1;translate:-50% -50%;border-radius:50%;border:1.5px solid rgba(96,165,250,0.55);opacity:0;pointer-events:none}" +
  // credits / legal pill
  ".ssf-credits{position:absolute;z-index:6;right:clamp(16px,1.8cqw,28px);bottom:clamp(16px,1.8cqw,28px)}" +
  ".ssf-pill{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:999px;background:rgba(13,17,23,0.78);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.14);color:rgba(247,247,244,0.8);font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.16em;font-weight:600;transition:all .3s ease}" +
  ".ssf-pill:hover{background:#0052FF;border-color:#0052FF;color:#fff;transform:translateY(-2px)}" +
  ".ssf-pop{position:absolute;right:0;bottom:calc(100% + 10px);width:max-content;max-width:min(320px,82cqw);padding:16px 18px;border-radius:18px;background:#fff;color:var(--ssf-ink);box-shadow:0 20px 50px rgba(0,0,0,.45);transform-origin:90% 100%;animation:ssf-popin .35s cubic-bezier(.2,1.4,.3,1)}" +
  ".ssf-pop li{display:flex;flex-direction:column;padding:7px 0;font-size:12px;line-height:1.35}" +
  ".ssf-pop li+li{border-top:1px solid rgba(13,17,23,0.08)}" +
  ".ssf-pop b{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;opacity:.5;text-transform:uppercase;letter-spacing:.14em}" +
  ".ssf-pop strong{font-weight:800;letter-spacing:-.01em;margin-top:2px}" +
  "@container (max-width: 760px){.ssf-cols{grid-template-columns:minmax(0,1fr)}.ssf-stage{width:min(135%,calc(var(--ssf-wmh) * var(--ssf-ar)));max-width:none;margin-left:-4%}}" +
  // entrance storyboard
  ".ssf:not(.is-in) .ssf-header>*,.ssf:not(.is-in) .ssf-tag,.ssf:not(.is-in) .ssf-line>*,.ssf:not(.is-in) .ssf-map,.ssf:not(.is-in) .ssf-note,.ssf:not(.is-in) .ssf-pill{opacity:0}" +
  ".ssf.is-in .ssf-header>*{animation:ssf-fade .65s ease both;animation-delay:.15s}" +
  ".ssf.is-in .ssf-panel{animation:ssf-grow .95s cubic-bezier(.7,0,.2,1) both}" +
  ".ssf.is-in .ssf-tag{animation:ssf-fade .55s ease both;animation-delay:calc(.3s + var(--c) * .08s)}" +
  ".ssf.is-in .ssf-line>*{animation:ssf-rise .65s cubic-bezier(.2,.9,.2,1) both;animation-delay:calc(.4s + var(--c) * .08s + var(--i) * .06s)}" +
  ".ssf.is-in .ssf-map,.ssf.is-in .ssf-note{animation:ssf-fade .6s ease both;animation-delay:calc(.65s + var(--c) * .08s)}" +
  ".ssf.is-in .ssf-pill{animation:ssf-pop .55s cubic-bezier(.2,1.5,.3,1) both;animation-delay:var(--end)}" +
  ".ssf:not(.is-in) .ssf-wm path{visibility:hidden}" +
  ".ssf.is-in .ssf-wm path{animation:ssf-write var(--dur) var(--at) cubic-bezier(.55,.1,.35,1) both}" +
  ".ssf:not(.is-in) .ssf-st-slap{opacity:0}" +
  ".ssf.is-in .ssf-st-slap{animation:ssf-slap .55s var(--at) cubic-bezier(.3,1.4,.4,1) both}" +
  ".ssf.is-in .ssf-ring{animation:ssf-ring .65s var(--at) cubic-bezier(.2,.8,.2,1) both}" +
  "@keyframes ssf-rewrite{0%{stroke-dashoffset:var(--l,120px)}100%{stroke-dashoffset:0}}" +
  "@keyframes ssf-popin{from{opacity:0;transform:translateY(8px) scale(.85)}}" +
  "@keyframes ssf-write{0%{stroke-dashoffset:calc(var(--l,3000px) + 4px);visibility:visible}100%{stroke-dashoffset:0;visibility:visible}}" +
  "@keyframes ssf-grow{0%{clip-path:inset(14% 4% 0 4% round 40px);transform:translateY(20px)}100%{clip-path:inset(0 0 0 0 round 0);transform:none}}" +
  "@keyframes ssf-pop{0%{opacity:0;transform:scale(.75)}100%{opacity:1;transform:none}}" +
  "@keyframes ssf-rise{from{opacity:1;transform:translateY(108%)}to{opacity:1;transform:none}}" +
  "@keyframes ssf-fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}" +
  "@keyframes ssf-slap{0%{opacity:0;transform:scale(1.65) rotate(10deg) translateY(-16%);filter:blur(1px)}60%{opacity:1;transform:scale(.95) rotate(-2deg);filter:none}82%{transform:scale(1.02) rotate(1deg)}100%{opacity:1;transform:none}}" +
  "@keyframes ssf-ring{0%{opacity:0;transform:scale(.35)}40%{opacity:.65}100%{opacity:0;transform:scale(1)}}";

const useStrokeLengths = (
  ref: React.RefObject<Element | null>,
  key: string,
) =>
  React.useEffect(() => {
    ref.current
      ?.querySelectorAll<SVGPathElement>("path[data-draw]")
      .forEach((p) => {
        p.style.setProperty("--l", Math.ceil(p.getTotalLength()) + 1 + "px");
      });
  }, [ref, key]);

/* -------------------------------------------------------------------------- */
/*     High-Craft Industrial & Clinical Die-Cut Badges (Upgraded Stickers)    */
/* -------------------------------------------------------------------------- */

function StickerSvg({ kind }: { kind: StickerKind; text?: string }) {
  const uid = "ssf" + React.useId().replace(/[^a-zA-Z0-9]/g, "");

  if (kind === "nom" || kind === "burst") {
    // 01: Anodized Precision Circular Seal (NOM-229-SSA1)
    return (
      <svg viewBox="0 0 132 132" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={uid + "bg"} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#090D16" />
          </linearGradient>
          <linearGradient id={uid + "rim"} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#0052FF" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <clipPath id={uid + "c"}>
            <circle cx="66" cy="66" r="56" />
          </clipPath>
          <linearGradient id={uid + "sh"} x1="0" x2="1" y1="0" y2="0">
            <stop offset=".35" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".35" />
            <stop offset=".65" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Outer metallic rim */}
        <circle
          cx="66"
          cy="66"
          r="56"
          fill={"url(#" + uid + "bg)"}
          stroke={"url(#" + uid + "rim)"}
          strokeWidth="2.5"
        />
        {/* 24 precision dial ticks */}
        {Array.from({ length: 24 }).map((_, idx) => {
          const a = (idx * 15 * Math.PI) / 180;
          const r1 = idx % 3 === 0 ? 45 : 47.5;
          const r2 = 50.5;
          return (
            <line
              key={idx}
              x1={66 + Math.cos(a) * r1}
              y1={66 + Math.sin(a) * r1}
              x2={66 + Math.cos(a) * r2}
              y2={66 + Math.sin(a) * r2}
              stroke="#60A5FA"
              strokeOpacity={idx % 3 === 0 ? "0.65" : "0.28"}
              strokeWidth={idx % 3 === 0 ? "1.4" : "1"}
            />
          );
        })}
        <circle
          cx="66"
          cy="66"
          r="41"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        {/* Top Cobalt Pill */}
        <rect x="40" y="34" width="52" height="14" rx="7" fill="#0052FF" />
        <text
          x="66"
          y="43.5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="7.5"
          fontFamily="monospace"
          fontWeight="700"
          letterSpacing="1.2"
        >
          COFEPRIS
        </text>
        <text
          x="66"
          y="69"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="16.5"
          fontFamily="'Outfit', sans-serif"
          fontWeight="800"
          letterSpacing="-0.4"
        >
          NOM-229
        </text>
        <text
          x="66"
          y="83"
          textAnchor="middle"
          fill="#94A3B8"
          fontSize="8"
          fontFamily="monospace"
          fontWeight="600"
          letterSpacing="1.5"
        >
          SSA1 · 2002
        </text>
        <circle cx="66" cy="94" r="2.2" fill="#34D399" />
        <g clipPath={"url(#" + uid + "c)"}>
          <g transform="rotate(20 66 66)">
            <rect
              className="ssf-sheen"
              x="-24"
              y="-24"
              width="180"
              height="180"
              fill={"url(#" + uid + "sh)"}
            />
          </g>
        </g>
      </svg>
    );
  }

  if (kind === "pb" || kind === "camera") {
    // 02: Brushed Titanium Periodic Element Plate (Pb 82 · 99.9%)
    return (
      <svg viewBox="0 0 132 132" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={uid + "pb"} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="45%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <clipPath id={uid + "c"}>
            <rect x="14" y="14" width="104" height="104" rx="22" />
          </clipPath>
          <linearGradient id={uid + "sh"} x1="0" x2="1" y1="0" y2="0">
            <stop offset=".35" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".6" />
            <stop offset=".65" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          x="14"
          y="14"
          width="104"
          height="104"
          rx="22"
          fill={"url(#" + uid + "pb)"}
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
        <rect
          x="21"
          y="21"
          width="90"
          height="90"
          rx="16"
          fill="none"
          stroke="#0D1117"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        {/* 4 Precision Corner Rivets */}
        {[
          [26, 26],
          [106, 26],
          [26, 106],
          [106, 106],
        ].map(([cx, cy], idx) => (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r="2"
            fill="#64748B"
            opacity="0.55"
          />
        ))}
        <text
          x="30"
          y="39"
          fill="#0052FF"
          fontSize="11"
          fontFamily="monospace"
          fontWeight="800"
        >
          82
        </text>
        <text
          x="102"
          y="38"
          textAnchor="end"
          fill="#475569"
          fontSize="8.5"
          fontFamily="monospace"
          fontWeight="600"
        >
          207.2 u
        </text>
        <text
          x="66"
          y="78"
          textAnchor="middle"
          fill="#0D1117"
          fontSize="38"
          fontFamily="'Outfit', sans-serif"
          fontWeight="800"
          letterSpacing="-1.5"
        >
          Pb
        </text>
        <rect x="33" y="88" width="66" height="14" rx="7" fill="#0D1117" />
        <text
          x="66"
          y="97.5"
          textAnchor="middle"
          fill="#F8FAFC"
          fontSize="7.5"
          fontFamily="monospace"
          fontWeight="700"
          letterSpacing="1.2"
        >
          PLOMO 99.9%
        </text>
        <g clipPath={"url(#" + uid + "c)"}>
          <g transform="rotate(20 66 66)">
            <rect
              className="ssf-sheen"
              x="-24"
              y="-24"
              width="180"
              height="180"
              fill={"url(#" + uid + "sh)"}
            />
          </g>
        </g>
      </svg>
    );
  }

  if (kind === "glass" || kind === "daisy") {
    // 03: Optical Lead-Glass Amber Prism Badge (PbO ≥ 4.8 g/cm³)
    return (
      <svg viewBox="0 0 132 132" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={uid + "amb"} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="55%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <clipPath id={uid + "c"}>
            <rect x="14" y="14" width="104" height="104" rx="26" />
          </clipPath>
          <linearGradient id={uid + "sh"} x1="0" x2="1" y1="0" y2="0">
            <stop offset=".35" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".5" />
            <stop offset=".65" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          x="14"
          y="14"
          width="104"
          height="104"
          rx="26"
          fill={"url(#" + uid + "amb)"}
          stroke="#FDE68A"
          strokeWidth="2"
        />
        {/* Refractive diagonal glass lines */}
        <line
          x1="24"
          y1="96"
          x2="96"
          y2="24"
          stroke="#FEF3C7"
          strokeOpacity="0.22"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <line
          x1="42"
          y1="104"
          x2="104"
          y2="42"
          stroke="#FEF3C7"
          strokeOpacity="0.14"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect
          x="22"
          y="22"
          width="88"
          height="88"
          rx="20"
          fill="none"
          stroke="#FEF3C7"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <text
          x="66"
          y="42"
          textAnchor="middle"
          fill="#FEF3C7"
          fontSize="8"
          fontFamily="monospace"
          fontWeight="700"
          letterSpacing="1.6"
        >
          ÓPTICA CLÍNICA
        </text>
        <text
          x="66"
          y="69"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="22"
          fontFamily="'Outfit', sans-serif"
          fontWeight="800"
          letterSpacing="-0.5"
        >
          2.4mm
        </text>
        <text
          x="66"
          y="85"
          textAnchor="middle"
          fill="#FFFBEB"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="700"
          letterSpacing="1"
        >
          PbO ≥ 4.8 g/cm³
        </text>
        <g clipPath={"url(#" + uid + "c)"}>
          <g transform="rotate(20 66 66)">
            <rect
              className="ssf-sheen"
              x="-24"
              y="-24"
              width="180"
              height="180"
              fill={"url(#" + uid + "sh)"}
            />
          </g>
        </g>
      </svg>
    );
  }

  // 04: Architectural Logistics Telemetry Tag (32 Estados · Huacal Blindado)
  return (
    <svg viewBox="0 0 148 112" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={uid + "c"}>
          <rect x="6" y="10" width="136" height="92" rx="18" />
        </clipPath>
        <linearGradient id={uid + "sh"} x1="0" x2="1" y1="0" y2="0">
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".45" />
          <stop offset=".65" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect
        x="6"
        y="10"
        width="136"
        height="92"
        rx="18"
        fill="#0F172A"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2"
      />
      {/* Top status bar */}
      <circle cx="24" cy="28" r="4" fill="#10B981" />
      <text
        x="34"
        y="31"
        fill="#34D399"
        fontSize="8.5"
        fontFamily="monospace"
        fontWeight="700"
        letterSpacing="1.4"
      >
        HUACAL BLINDADO
      </text>
      <line
        x1="18"
        y1="40"
        x2="130"
        y2="40"
        stroke="#FFFFFF"
        strokeOpacity="0.1"
        strokeWidth="1"
      />
      <text
        x="20"
        y="64"
        fill="#FFFFFF"
        fontSize="19"
        fontFamily="'Outfit', sans-serif"
        fontWeight="800"
        letterSpacing="-0.4"
      >
        32 ESTADOS
      </text>
      <text
        x="20"
        y="80"
        fill="#94A3B8"
        fontSize="8.5"
        fontFamily="monospace"
        fontWeight="600"
        letterSpacing="1.2"
      >
        ENVÍO ASEGURADO · CFDI 4.0
      </text>
      {/* Minimalist vertical barcode on right edge */}
      {[114, 118, 121, 125, 128].map((bx, idx) => (
        <line
          key={idx}
          x1={bx}
          y1="48"
          x2={bx}
          y2="84"
          stroke="#FFFFFF"
          strokeOpacity={idx % 2 === 0 ? "0.35" : "0.18"}
          strokeWidth={idx % 2 === 0 ? "2" : "1"}
        />
      ))}
      <g clipPath={"url(#" + uid + "c)"}>
        <g transform="rotate(20 74 56)">
          <rect
            className="ssf-sheen"
            x="-24"
            y="-24"
            width="190"
            height="190"
            fill={"url(#" + uid + "sh)"}
          />
        </g>
      </g>
    </svg>
  );
}

const isExternal = (href?: string) => !!href && /^https?:/.test(href);
const linkProps = (href?: string, customOnClick?: () => void) => ({
  href: href || "#",
  target: isExternal(href) ? "_blank" : undefined,
  rel: isExternal(href) ? "noopener noreferrer" : undefined,
  onClick: (e: React.MouseEvent) => {
    if (customOnClick) {
      e.preventDefault();
      customOnClick();
      return;
    }
    if (!href || href === "#") e.preventDefault();
  },
});

type Placed = { x: number; y: number };

export default function StickerSlapFooter({
  wordmark = "arxem",
  homeHref = "#",
  onHomeClick,
  navLabel = "Explorar Catálogo",
  navHref = "#",
  onNavClick,
  chatHref = "#",
  chatLabel = "WhatsApp Ingeniería",
  onChatClick,
  jobsLabel = "01 // SOLUCIONES & TIENDA",
  jobs = DEFAULT_JOBS,
  officeLabel = "02 // PLANTA & LOGÍSTICA",
  address = [
    "Tecámac, Estado de México",
    "Envíos en Huacal a 32 Estados",
    "Lun – Vie · 9:00 a 18:00 hrs",
  ],
  mapLabel = "Cobertura Nacional Garantizada",
  mapHref = "#",
  onMapClick,
  contactLabel = "03 // CONTACTO DIRECTO",
  email = "ventas@distribuidoraarxem.com",
  copiedLabel = "¡Correo copiado al portapapeles! ✓",
  note = "*Atención directa sin conmutador: 55 1313 5860 · 55 1125 0518 · Facturación CFDI 4.0.",
  socials = DEFAULT_SOCIALS,
  stickers = DEFAULT_STICKERS,
  credits = DEFAULT_CREDITS,
  height = "78svh",
  wordmarkMaxHeight = "38svh",
  paper = "#F7F7F4",
  panel = "#0D1117",
  ink = "#0D1117",
  cream = "#F7F7F4",
  accent = "#0052FF",
  fontSans = "'Outfit', 'Geist', system-ui, -apple-system, sans-serif",
  onStickerMove,
  className = "",
}: StickerSlapFooterProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const popRef = React.useRef<HTMLDivElement>(null);
  const [seen, setSeen] = React.useState(false);
  const [run, setRun] = React.useState(0);
  const [copied, setCopied] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [moved, setMoved] = React.useState<Record<number, Placed>>({});
  const [order, setOrder] = React.useState<number[]>([]);
  const drag = React.useRef<{
    i: number;
    id: number;
    sx: number;
    sy: number;
    px: number;
    py: number;
    lx: number;
    t: number;
    tilt: number;
    w: number;
    h: number;
    went: boolean;
  } | null>(null);

  const word = React.useMemo(() => layoutScript(wordmark), [wordmark]);
  const pad = STROKE / 2 + 0.6;
  const vbX = -1.4 - pad;
  const vbY = word.top - pad;
  const vbW = Math.max(word.width, 1) + 2.8 + pad * 2 - word.top * SLANT;
  const vbH = word.bottom + pad - vbY;
  const cutH = CUT - vbY;

  const spots = React.useMemo(
    () => stickerSpots(word, stickers.length, 3),
    [word, stickers.length],
  );
  const drawDur = clamp(0.7 + word.width / 45, 1.1, 2.2);
  const writeAt = 0.75;
  const toPct = (s: Spot) => ({
    x: ((s.x - s.y * SLANT - vbX) / vbW) * 100,
    y: ((s.y - vbY) / vbH) * 100,
  });

  const items = stickers.map((spec, i) => {
    const o = typeof spec === "string" ? { kind: spec } : spec;
    const spot = spots[i] ?? { x: 0, y: -4.5, size: 5.4, rotate: 0, depth: 1 };
    const auto = toPct(spot);
    const home = { x: o.x ?? auto.x, y: o.y ?? auto.y };
    const xf =
      clamp((home.x / 100) * vbW + vbX, 0, word.width) /
      Math.max(word.width, 1);
    return {
      i,
      kind: (o.kind ?? "nom") as StickerKind,
      node: o.node,
      text: o.text,
      label: o.label ?? LABELS[(o.kind ?? "nom") as StickerKind],
      home,
      at: moved[i] ?? home,
      size: o.size ?? (spot.size / vbW) * 100,
      rotate: o.rotate ?? spot.rotate,
      depth: spot.depth,
      delay: writeAt + drawDur * Math.pow(xf, 0.92) + 0.08,
    };
  });
  const endAt = writeAt + drawDur + word.extra.length * 0.16 + 0.35;

  useStrokeLengths(rootRef, wordmark + run);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = document.documentElement.clientHeight || r.height;
      const span = Math.min(r.height, vh) || 1;
      const p = clamp((vh - r.top) / span, 0, 1);
      el.style.setProperty("--ssf-sp", (1 - Math.pow(1 - p, 2)).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true, capture: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll, { capture: true });
      removeEventListener("resize", onScroll);
    };
  }, []);

  React.useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(0), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!popRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copy = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied((c) => c + 1);
    } catch {
      window.location.href = "mailto:" + email;
    }
  };

  const raise = (i: number) =>
    setOrder((o) => [...o.filter((k) => k !== i), i]);

  const putAt = (i: number, p: Placed, announce: boolean = true) => {
    setMoved((m) => ({ ...m, [i]: p }));
    if (announce) onStickerMove?.(i, round(p.x), round(p.y));
  };

  const wiggle = (el: Element | null, frames: Keyframe[], duration: number) => {
    (el as HTMLElement | null)?.animate?.(frames, {
      duration,
      easing: "cubic-bezier(.3,1.4,.4,1)",
    });
  };
  const slapFrames: Keyframe[] = [
    { transform: "scale(1.1)" },
    { transform: "scale(.95,1.03)", offset: 0.4 },
    { transform: "scale(1.02,.98)", offset: 0.7 },
    { transform: "none" },
  ];
  const shakeFrames: Keyframe[] = [
    { transform: "none" },
    { transform: "rotate(-8deg) scale(1.06)", offset: 0.3 },
    { transform: "rotate(6deg)", offset: 0.6 },
    { transform: "none" },
  ];

  const onDown = (e: React.PointerEvent<HTMLButtonElement>, i: number) => {
    if (e.button !== 0 || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    const at = items[i].at;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = {
      i,
      id: e.pointerId,
      sx: at.x,
      sy: at.y,
      px: e.clientX,
      py: e.clientY,
      lx: e.clientX,
      t: performance.now(),
      tilt: 0,
      w: r.width,
      h: r.height,
      went: false,
    };
    raise(i);
  };
  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.px;
    const dy = e.clientY - d.py;
    if (!d.went && Math.hypot(dx, dy) < 4) return;
    const host = e.currentTarget.parentElement;
    if (!host) return;
    if (!d.went) host.classList.add("is-drag");
    d.went = true;
    const x = clamp(d.sx + (dx / d.w) * 100, 4, 96);
    const y = clamp(d.sy + (dy / d.h) * 100, -35, 92);
    host.style.left = x + "%";
    host.style.top = y + "%";
    const now = performance.now();
    const v = (e.clientX - d.lx) / Math.max(1, now - d.t);
    d.tilt = d.tilt * 0.75 + clamp(v * 18, -18, 18) * 0.25;
    d.lx = e.clientX;
    d.t = now;
    host.style.setProperty("--tilt", d.tilt.toFixed(2) + "deg");
  };
  const onUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    const host = e.currentTarget.parentElement;
    host?.classList.remove("is-drag");
    host?.style.setProperty("--tilt", "0deg");
    const lift = e.currentTarget.querySelector(".ssf-st-lift");
    if (d.went && host) {
      putAt(d.i, {
        x: parseFloat(host.style.left),
        y: parseFloat(host.style.top),
      });
      wiggle(lift, slapFrames, 420);
    } else wiggle(lift, shakeFrames, 500);
  };
  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = e.shiftKey ? 6 : 2;
    const at = items[i].at;
    const go: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    if (go[e.key]) {
      e.preventDefault();
      raise(i);
      putAt(i, {
        x: clamp(at.x + go[e.key][0], 4, 96),
        y: clamp(at.y + go[e.key][1], -35, 92),
      });
    } else if (e.key === "Home" || e.key === "Escape") {
      e.preventDefault();
      goHome(i, e.currentTarget);
    }
  };
  const goHome = (i: number, btn: HTMLElement) => {
    setMoved((m) => {
      const next = { ...m };
      delete next[i];
      return next;
    });
    onStickerMove?.(i, round(items[i].home.x), round(items[i].home.y));
    wiggle(btn.querySelector(".ssf-st-lift"), slapFrames, 420);
  };

  const replay = () => {
    setMoved({});
    setRun((r) => r + 1);
  };

  const style = {
    "--ssf-paper": paper,
    "--ssf-panel": panel,
    "--ssf-ink": ink,
    "--ssf-cream": cream ?? paper,
    "--ssf-accent": accent,
    "--ssf-sans": fontSans,
    "--ssf-wmh": wordmarkMaxHeight,
    "--ssf-ar": String(round(vbW / cutH)),
    minHeight: height,
  } as React.CSSProperties;

  const onPointer = (e: React.PointerEvent<HTMLElement>) => {
    const el = rootRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    el.style.setProperty(
      "--ssf-px",
      (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3),
    );
    el.style.setProperty(
      "--ssf-py",
      (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3),
    );
  };
  const onLeave = () => {
    rootRef.current?.style.setProperty("--ssf-px", "0");
    rootRef.current?.style.setProperty("--ssf-py", "0");
  };

  const cols: React.ReactNode[] = [];
  if (jobs.length)
    cols.push(
      <div className="ssf-col" key="jobs">
        <h3 className="ssf-tag">{jobsLabel}</h3>
        <ul className="ssf-big">
          {jobs.map((j, i) => (
            <li
              key={i}
              className="ssf-line"
              style={{ "--i": i } as React.CSSProperties}
            >
              {j.onClick || j.href ? (
                <a {...linkProps(j.href, j.onClick)}>{j.title}</a>
              ) : (
                <span>{j.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>,
    );
  if (address.length)
    cols.push(
      <div className="ssf-col" key="office">
        <h3 className="ssf-tag">{officeLabel}</h3>
        <address className="ssf-big" style={{ fontStyle: "normal" }}>
          {address.map((l, i) => (
            <span
              key={i}
              className="ssf-line"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span>{l}</span>
            </span>
          ))}
        </address>
        {mapLabel && (
          <a className="ssf-map" {...linkProps(mapHref, onMapClick)}>
            {mapLabel}
            <svg
              viewBox="0 0 88 8"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path d={SQUIGGLE} data-draw="" />
            </svg>
          </a>
        )}
      </div>,
    );
  if (email || chatHref || onChatClick || socials.length)
    cols.push(
      <div className="ssf-col" key="contact">
        <h3 className="ssf-tag">{contactLabel}</h3>
        <ul className="ssf-big">
          {email && (
            <li className="ssf-line" style={{ "--i": 0 } as React.CSSProperties}>
              <button
                type="button"
                className={"ssf-copy" + (copied ? " is-copied" : "")}
                onClick={copy}
                title="Copiar correo electrónico"
              >
                <span className="ssf-addr">{email}</span>
                <span className="ssf-done" aria-hidden="true">
                  {copiedLabel}
                </span>
              </button>
            </li>
          )}
          {(chatHref || onChatClick) && chatLabel && (
            <li className="ssf-line" style={{ "--i": 1 } as React.CSSProperties}>
              <a {...linkProps(chatHref, onChatClick)}>
                {chatLabel}
                {note && <span className="ssf-ast">*</span>}
              </a>
            </li>
          )}
        </ul>
        {note && <p className="ssf-note">{note}</p>}
        <span className="ssf-sr" role="status">
          {copied ? "Correo copiado" : ""}
        </span>
      </div>,
    );

  return (
    <footer
      ref={rootRef}
      className={
        "ssf" + (seen ? " is-in" : "") + (className ? " " + className : "")
      }
      style={style}
      onPointerMove={onPointer}
      onPointerLeave={onLeave}
    >
      <style>{CSS}</style>

      {/* Main Architectural Obsidian Panel */}
      <div className="ssf-panel">
        {/* Integrated Corporate Header inside the dark panel */}
        <div className="ssf-header">
          <a
            className="ssf-brand"
            {...linkProps(homeHref, onHomeClick)}
            aria-label="ARXEM Radiología, ir al inicio"
          >
            <span className="ssf-brand-badge">
              <img src="/arxem-symbol.png" alt="ARXEM" />
            </span>
            <span className="ssf-brand-text">
              <span className="ssf-brand-name">ARXEM®</span>
              <span className="ssf-brand-sub">
                Ingeniería &amp; Protección Radiológica · Est. 2012
              </span>
            </span>
          </a>

          <div className="ssf-header-actions">
            {navLabel && (
              <a className="ssf-btn-ghost" {...linkProps(navHref, onNavClick)}>
                <span>{navLabel}</span>
              </a>
            )}
            {(chatHref || onChatClick) && (
              <a
                className="ssf-btn-primary"
                {...linkProps(chatHref, onChatClick)}
              >
                <span className="ssf-dot-live" />
                <span>55 1313 5860 · Especialista en Línea</span>
              </a>
            )}
          </div>
        </div>

        {/* 3 Clean Corporate Columns */}
        {cols.length > 0 && (
          <div
            className="ssf-cols"
            style={{ "--ssf-n": cols.length } as React.CSSProperties}
          >
            {cols.map((c, k) => (
              <React.Fragment key={k}>
                {React.cloneElement(
                  c as React.ReactElement<{ style?: React.CSSProperties }>,
                  { style: { "--c": k } as React.CSSProperties },
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Self-Writing "arxem" Wordmark + Upgraded Industrial Seals */}
        <div className="ssf-stage">
          <div
            className="ssf-stage-in"
            ref={stageRef}
            style={{
              marginBottom: round(-((vbH - cutH) / vbW) * 100) + "%",
            }}
          >
            <button
              type="button"
              className="ssf-wm-btn"
              onClick={replay}
              aria-label={"Redibujar firma " + wordmark}
            >
              <svg
                key={run}
                className="ssf-wm"
                viewBox={[vbX, vbY, vbW, vbH].map(round).join(" ")}
                aria-hidden="true"
                focusable="false"
              >
                <g transform={"skewX(-8)"}>
                  <path
                    d={word.main}
                    data-draw=""
                    style={
                      {
                        "--dur": drawDur + "s",
                        "--at": writeAt + "s",
                      } as React.CSSProperties
                    }
                  />
                  {word.extra.map((d, k) => (
                    <path
                      key={k}
                      d={d}
                      data-draw=""
                      style={
                        {
                          "--dur": ".28s",
                          "--at": round(writeAt + drawDur + k * 0.16) + "s",
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </g>
              </svg>
            </button>

            {items.map((s) => (
              <div
                key={s.i}
                className="ssf-st"
                style={
                  {
                    left: s.at.x + "%",
                    top: s.at.y + "%",
                    width: "clamp(58px, " + round(s.size) + "cqw, 88px)",
                    zIndex: 3 + Math.max(0, order.indexOf(s.i) + 1),
                    "--r": s.rotate + "deg",
                    "--d": s.depth,
                    "--at": round(s.delay) + "s",
                  } as React.CSSProperties
                }
              >
                <button
                  type="button"
                  className="ssf-st-btn"
                  aria-label={
                    s.label +
                    ". Arrastra para mover o haz doble clic para restaurar."
                  }
                  onPointerDown={(e) => onDown(e, s.i)}
                  onPointerMove={onMove}
                  onPointerUp={onUp}
                  onPointerCancel={onUp}
                  onDoubleClick={(e) => goHome(s.i, e.currentTarget)}
                  onKeyDown={(e) => onKey(e, s.i)}
                >
                  <span key={run} className="ssf-st-slap">
                    <span className="ssf-st-lift">
                      {s.node ?? <StickerSvg kind={s.kind} text={s.text} />}
                    </span>
                  </span>
                </button>
                <span key={"r" + run} className="ssf-ring" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        {/* Minimalist Corporate Certs & Legal Popover */}
        {credits.length > 0 && (
          <div className="ssf-credits" ref={popRef}>
            {open && (
              <ul className="ssf-pop">
                {credits.map((c, i) => (
                  <li key={i}>
                    <b>{c.role}</b>
                    <strong>{c.name}</strong>
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              className="ssf-pill"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              style={{ "--end": round(endAt) + "s" } as React.CSSProperties}
            >
              <span>© {new Date().getFullYear()} ARXEM® · NOM-229</span>
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}
