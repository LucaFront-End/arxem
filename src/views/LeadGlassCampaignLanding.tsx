import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  ShoppingBag,
  Plus,
  ShieldCheck,
  Truck,
  FileCheck,
  Check
} from 'lucide-react';
import { CATALOG_PRODUCTS, CatalogProduct } from '../data/catalogData';
import { saveQuoteToCMS, openWhatsAppWithQuote } from '../data/taxonomyData';
import { ActiveRoute } from '../components/Navbar';

interface LeadGlassCampaignLandingProps {
  onSelectProduct: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct, variantLabel?: string, price?: number) => void;
  onNavigate: (route: ActiveRoute) => void;
}

type Vec3 = { x: number; y: number; z: number };

interface PolyFace {
  verts: Vec3[];
  fill: string;
  stroke: string;
  strokeWidth?: number;
  alpha?: number;
  depthBias?: number;
}

interface HeroPreset {
  id: string;
  label: string;
  pb: string;
  density: string;
  origin: 'China' | 'Alemania' | 'Francia';
  thickFactor: number;
}

const HERO_PRESETS: HeroPreset[] = [
  {
    id: '8mm-cn',
    label: '8 mm',
    pb: '1.9 mm Pb',
    density: '4.2 g/cm³',
    origin: 'China',
    thickFactor: 0.75
  },
  {
    id: '10mm-cn',
    label: '10 mm',
    pb: '2.4 mm Pb',
    density: '4.35 g/cm³',
    origin: 'China',
    thickFactor: 1.0
  },
  {
    id: '12mm-cn',
    label: '12 mm',
    pb: '2.9 mm Pb',
    density: '4.4 g/cm³',
    origin: 'China',
    thickFactor: 1.32
  },
  {
    id: '10mm-fr',
    label: 'Francia 10 mm',
    pb: '2.6 mm Pb',
    density: '4.8 g/cm³',
    origin: 'Francia',
    thickFactor: 1.12
  }
];

/**
 * 60fps 3D Isometric Optical Monolith & X-Ray Refraction Stage.
 * Renders a floating lead-silicate glass prism with internal PbO density planes
 * and a real-time photon attenuation simulation.
 */
const IsometricOpticalMonolith: React.FC<{
  preset: HeroPreset;
  chapterIndex?: number;
}> = ({ preset, chapterIndex = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 });
  const animRef = useRef({
    thick: preset.thickFactor,
    explode: 0.35,
    simTime: 0,
    lastNow: performance.now()
  });

  const propsRef = useRef({ preset, chapterIndex });
  propsRef.current = { preset, chapterIndex };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    animRef.current.lastNow = performance.now();

    const makeBox = (
      x0: number,
      x1: number,
      y0: number,
      y1: number,
      z0: number,
      z1: number,
      opts: {
        top: string;
        left: string;
        right: string;
        stroke: string;
        strokeWidth?: number;
        alpha?: number;
        depthBias?: number;
      }
    ): PolyFace[] => {
      const alpha = opts.alpha ?? 1;
      const bias = opts.depthBias ?? 0;
      const sw = opts.strokeWidth ?? 1.1;
      return [
        {
          verts: [
            { x: x0, y: y0, z: z0 },
            { x: x1, y: y0, z: z0 },
            { x: x1, y: y0, z: z1 },
            { x: x0, y: y0, z: z1 }
          ],
          fill: opts.left,
          stroke: opts.stroke,
          strokeWidth: sw,
          alpha: alpha * 0.75,
          depthBias: bias - 4
        },
        {
          verts: [
            { x: x0, y: y0, z: z0 },
            { x: x1, y: y0, z: z0 },
            { x: x1, y: y1, z: z0 },
            { x: x0, y: y1, z: z0 }
          ],
          fill: opts.left,
          stroke: opts.stroke,
          strokeWidth: sw,
          alpha: alpha * 0.9,
          depthBias: bias - 2
        },
        {
          verts: [
            { x: x0, y: y0, z: z0 },
            { x: x0, y: y0, z: z1 },
            { x: x0, y: y1, z: z1 },
            { x: x0, y: y1, z: z0 }
          ],
          fill: opts.right,
          stroke: opts.stroke,
          strokeWidth: sw,
          alpha: alpha * 0.9,
          depthBias: bias - 2
        },
        {
          verts: [
            { x: x1, y: y0, z: z0 },
            { x: x1, y: y0, z: z1 },
            { x: x1, y: y1, z: z1 },
            { x: x1, y: y1, z: z0 }
          ],
          fill: opts.right,
          stroke: opts.stroke,
          strokeWidth: sw,
          alpha,
          depthBias: bias
        },
        {
          verts: [
            { x: x0, y: y0, z: z1 },
            { x: x1, y: y0, z: z1 },
            { x: x1, y: y1, z: z1 },
            { x: x0, y: y1, z: z1 }
          ],
          fill: opts.left,
          stroke: opts.stroke,
          strokeWidth: sw,
          alpha,
          depthBias: bias
        },
        {
          verts: [
            { x: x0, y: y1, z: z0 },
            { x: x1, y: y1, z: z0 },
            { x: x1, y: y1, z: z1 },
            { x: x0, y: y1, z: z1 }
          ],
          fill: opts.top,
          stroke: opts.stroke,
          strokeWidth: sw,
          alpha,
          depthBias: bias + 2
        }
      ];
    };

    const makeHollowFrame = (
      x0: number,
      x1: number,
      y0: number,
      y1: number,
      z0: number,
      z1: number,
      barW: number,
      opts: {
        top: string;
        left: string;
        right: string;
        stroke: string;
        strokeWidth?: number;
        alpha?: number;
        depthBias?: number;
      }
    ): PolyFace[] => [
      ...makeBox(x0, x1, y0, y0 + barW, z0, z1, opts),
      ...makeBox(x0, x1, y1 - barW, y1, z0, z1, opts),
      ...makeBox(x0, x1, y0 + barW, y1 - barW, z0, z0 + barW, opts),
      ...makeBox(x0, x1, y0 + barW, y1 - barW, z1 - barW, z1, opts)
    ];

    const render = (now: number) => {
      const st = animRef.current;
      const dt = Math.min(0.05, (now - st.lastNow) / 1000);
      st.lastNow = now;
      st.simTime += dt;
      const t = st.simTime;

      const { preset: curPreset, chapterIndex: cIdx } = propsRef.current;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const W = rect.width;
      const H = rect.height;
      if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      const cyc = (Math.sin(t * 0.8 - 0.3) + 1) * 0.5;
      const targetExp = Math.max(0.15, Math.min(0.95, cyc));
      st.explode += (targetExp - st.explode) * 0.06;
      st.thick += (curPreset.thickFactor - st.thick) * 0.1;

      const m = mouseRef.current;
      m.cx += (m.tx - m.cx) * 0.08;
      m.cy += (m.ty - m.cy) * 0.08;

      const yaw = Math.PI / 4 + Math.sin(t * 0.36) * 0.04 + m.cx * 0.24 + cIdx * 0.08;
      const pitch = 0.52 + Math.cos(t * 0.3) * 0.02 + m.cy * 0.12;
      const scale = Math.min(W, H) * 0.0029;
      const centerX = W * 0.5;
      const centerY = H * 0.52;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);

      const project = (v: Vec3) => {
        const rx = v.x * cosY - v.z * sinY;
        const rz = v.x * sinY + v.z * cosY;
        const ry = v.y * cosP - rz * sinP;
        const depth = v.y * sinP + rz * cosP;
        return {
          sx: centerX + rx * scale,
          sy: centerY - ry * scale,
          depth
        };
      };

      // Subtle architectural floor calibration grid
      const floorY = -68;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(13, 17, 23, 0.045)';
      for (let g = -120; g <= 120; g += 30) {
        const p1 = project({ x: g, y: floorY, z: -120 });
        const p2 = project({ x: g, y: floorY, z: 120 });
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();

        const q1 = project({ x: -120, y: floorY, z: g });
        const q2 = project({ x: 120, y: floorY, z: g });
        ctx.beginPath();
        ctx.moveTo(q1.sx, q1.sy);
        ctx.lineTo(q2.sx, q2.sy);
        ctx.stroke();
      }

      const glassHalfT = 8.5 * st.thick;
      const spread = st.explode * 36;
      const floatY = Math.sin(t * 1.2) * 3.5;

      const faces: PolyFace[] = [];

      // Rear Telescopic Steel Subframe
      const f1X = -16 - spread;
      faces.push(
        ...makeHollowFrame(f1X - 5, f1X, -42 + floatY, 54 + floatY, -68, 68, 7, {
          top: '#475569',
          left: '#1E293B',
          right: '#0F172A',
          stroke: '#0D1117',
          depthBias: -14
        })
      );

      // Perimeter Lead Gasket
      const f2X = -8 - spread * 0.45;
      faces.push(
        ...makeHollowFrame(f2X - 3, f2X, -39 + floatY, 51 + floatY, -65, 65, 4.5, {
          top: '#60A5FA',
          left: '#2563EB',
          right: '#1D4ED8',
          stroke: '#1E40AF',
          depthBias: -6
        })
      );

      // Core Lead-Silicate Crystal Monolith
      const palette =
        curPreset.origin === 'Francia'
          ? {
              top: 'rgba(56, 189, 248, 0.72)',
              left: 'rgba(14, 165, 233, 0.48)',
              right: 'rgba(2, 132, 199, 0.62)',
              stroke: '#0284C7'
            }
          : curPreset.origin === 'Alemania'
          ? {
              top: 'rgba(99, 102, 241, 0.70)',
              left: 'rgba(79, 70, 229, 0.46)',
              right: 'rgba(67, 56, 202, 0.60)',
              stroke: '#4338CA'
            }
          : {
              top: 'rgba(96, 165, 250, 0.72)',
              left: 'rgba(37, 99, 235, 0.48)',
              right: 'rgba(0, 82, 255, 0.62)',
              stroke: '#2563EB'
            };

      faces.push(
        ...makeBox(-glassHalfT, glassHalfT, -36 + floatY, 48 + floatY, -62, 62, {
          ...palette,
          strokeWidth: 1.5,
          alpha: 0.92,
          depthBias: 4
        })
      );

      // Internal Golden PbO Atomic Lattice Planes (2 planes inside the crystal)
      for (const offset of [-glassHalfT * 0.3, glassHalfT * 0.3]) {
        faces.push({
          verts: [
            { x: offset, y: -32 + floatY, z: -57 },
            { x: offset, y: 44 + floatY, z: -57 },
            { x: offset, y: 44 + floatY, z: 57 },
            { x: offset, y: -32 + floatY, z: 57 }
          ],
          fill: 'rgba(245, 158, 11, 0.20)',
          stroke: 'rgba(217, 119, 6, 0.48)',
          alpha: 0.85,
          depthBias: 6
        });
      }

      // Specular Light Sweep
      const specZ = ((t * 40) % 104) - 52;
      faces.push({
        verts: [
          { x: glassHalfT + 0.4, y: -32 + floatY, z: specZ - 10 },
          { x: glassHalfT + 0.4, y: 44 + floatY, z: specZ + 5 },
          { x: glassHalfT + 0.4, y: 44 + floatY, z: specZ + 16 },
          { x: glassHalfT + 0.4, y: -32 + floatY, z: specZ }
        ],
        fill: 'rgba(255, 255, 255, 0.72)',
        stroke: 'transparent',
        alpha: 0.9,
        depthBias: 9
      });

      // Front Brushed Inox 304 Frame
      const f4X = 14 + spread * 0.9;
      faces.push(
        ...makeHollowFrame(f4X, f4X + 5.5, -42 + floatY, 54 + floatY, -68, 68, 7, {
          top: '#FFFFFF',
          left: '#E2E8F0',
          right: '#CBD5E1',
          stroke: '#0D1117',
          depthBias: 18
        })
      );

      // Painter's Algorithm Depth Sort
      const projected = faces.map((f) => {
        const pts = f.verts.map(project);
        const avgDepth =
          pts.reduce((acc, p) => acc + p.depth, 0) / pts.length + (f.depthBias ?? 0);
        return { f, pts, avgDepth };
      });

      projected.sort((a, b) => a.avgDepth - b.avgDepth);

      for (const { f, pts } of projected) {
        ctx.save();
        ctx.globalAlpha = f.alpha ?? 1;
        ctx.beginPath();
        ctx.moveTo(pts[0].sx, pts[0].sy);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].sx, pts[i].sy);
        }
        ctx.closePath();
        ctx.fillStyle = f.fill;
        ctx.fill();
        if (f.stroke !== 'transparent') {
          ctx.lineWidth = f.strokeWidth ?? 1.1;
          ctx.strokeStyle = f.stroke;
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
        ctx.restore();
      }

      // Live X-Ray Attenuation Beam
      const src = project({ x: -118, y: 6 + floatY, z: 0 });
      const hit = project({ x: 0, y: 6 + floatY, z: 0 });
      const out = project({ x: 118, y: 6 + floatY, z: 0 });

      ctx.save();
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(src.sx, src.sy);
      ctx.lineTo(hit.sx, hit.sy);
      ctx.stroke();

      const p = (t * 1.3) % 1;
      const px = src.sx + (hit.sx - src.sx) * p;
      const py = src.sy + (hit.sy - src.sy) * p;
      ctx.setLineDash([]);
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#0052FF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(hit.sx, hit.sy);
      ctx.lineTo(out.sx, out.sy);
      ctx.stroke();
      ctx.restore();

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseRef.current.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        mouseRef.current.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      }}
      onPointerLeave={() => {
        mouseRef.current.tx = 0;
        mouseRef.current.ty = 0;
      }}
      className="relative w-full h-full select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

interface OriginChapter {
  index: string;
  country: 'China' | 'Alemania' | 'Francia';
  eyebrow: string;
  titleLight: string;
  titleBold: string;
  pbMetric: string;
  densityMetric: string;
  thicknessLabel: string;
  summary: string;
  preset: HeroPreset;
}

const ORIGIN_CHAPTERS: OriginChapter[] = [
  {
    index: '01',
    country: 'China',
    eyebrow: 'VERSATILIDAD COMERCIAL · 8 MM / 10 MM / 12 MM',
    titleLight: 'Serie Estándar',
    titleBold: 'Importación China.',
    pbMetric: '1.7 – 2.9 mm Pb',
    densityMetric: '4.2 – 4.4 g/cm³',
    thicknessLabel: '18 medidas en pulgadas',
    summary:
      'La línea más amplia en inventario inmediato: desde mirillas dentales de 8"×10" hasta ventanales de control de 36"×72".',
    preset: HERO_PRESETS[1]
  },
  {
    index: '02',
    country: 'Alemania',
    eyebrow: 'ALTA TRANSMISIÓN LUMÍNICA · 8 MM',
    titleLight: 'Ingeniería Óptica',
    titleBold: 'Grado Alemán.',
    pbMetric: '2.10 mm Pb',
    densityMetric: '4.5 g/cm³',
    thicknessLabel: 'Formatos 60×110 y 110×120 cm',
    summary:
      'Logra 2.10 mm de equivalencia en plomo en tan solo 8 mm de espesor, ofreciendo ligereza estructural y nitidez clínica.',
    preset: {
      id: '8mm-de',
      label: 'Alemania 8 mm',
      pb: '2.10 mm Pb',
      density: '4.5 g/cm³',
      origin: 'Alemania',
      thickFactor: 0.82
    }
  },
  {
    index: '03',
    country: 'Francia',
    eyebrow: 'MÁXIMA DENSIDAD ATÓMICA · 10 MM',
    titleLight: 'Pureza Quirúrgica',
    titleBold: 'Grado Francés.',
    pbMetric: '2.60 mm Pb',
    densityMetric: '4.8 g/cm³',
    thicknessLabel: 'Tomografía y Hemodinamia',
    summary:
      'El estándar hospitalario más alto en 10 mm de espesor: 2.60 mm Pb certificados para salas de alto flujo y tomografía multicorte.',
    preset: HERO_PRESETS[3]
  }
];

/** Extracts approximate width & height in cm from a product name for proportional visual scale */
function parseDimensionsCm(name: string): { wCm: number; hCm: number; label: string } {
  const cmMatch = name.match(/(\d+)\s*[x×]\s*(\d+)\s*cm/i);
  if (cmMatch) {
    const w = parseFloat(cmMatch[1]);
    const h = parseFloat(cmMatch[2]);
    return { wCm: w, hCm: h, label: `${w} × ${h} cm` };
  }
  const inMatch = name.match(/(\d+)\s*[x×]\s*(\d+)/);
  if (inMatch) {
    const wIn = parseFloat(inMatch[1]);
    const hIn = parseFloat(inMatch[2]);
    return {
      wCm: Math.round(wIn * 2.54),
      hCm: Math.round(hIn * 2.54),
      label: `${wIn}" × ${hIn}"`
    };
  }
  return { wCm: 61, hCm: 91, label: '24" × 36"' };
}

export const LeadGlassCampaignLanding: React.FC<LeadGlassCampaignLandingProps> = ({
  onSelectProduct,
  onAddToCart,
  onNavigate
}) => {
  const [heroPreset, setHeroPreset] = useState<HeroPreset>(HERO_PRESETS[1]);
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [originFilter, setOriginFilter] = useState<'all' | 'china' | 'francia' | 'alemania'>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const allLeadGlassProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((p) => p.storePillar === 'vidrios-emplomados');
  }, []);

  const filteredGlassProducts = useMemo(() => {
    return allLeadGlassProducts.filter((p) => {
      if (originFilter === 'all') return true;
      return p.name.toLowerCase().includes(originFilter);
    });
  }, [allLeadGlassProducts, originFilter]);

  const [selectedGlass, setSelectedGlass] = useState<CatalogProduct>(
    () =>
      allLeadGlassProducts.find((p) => p.sku === 'VE8C24') ||
      allLeadGlassProducts[0] ||
      CATALOG_PRODUCTS[0]
  );

  // Keep selectedGlass synced when filter changes
  useEffect(() => {
    if (
      filteredGlassProducts.length > 0 &&
      !filteredGlassProducts.some((p) => p.id === selectedGlass.id)
    ) {
      setSelectedGlass(filteredGlassProducts[0]);
    }
  }, [filteredGlassProducts, selectedGlass.id]);

  // Sticky scroll observer for Section 02 chapters
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.48;
      let closestIdx = 0;
      let minDistance = Infinity;

      chapterRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const dist = Math.abs(center - viewportCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveChapterIdx(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExpressWhatsAppQuote = (glass: CatalogProduct) => {
    const record = saveQuoteToCMS({
      type: 'CAMPANA_VIDRIO',
      clientName: 'Especialista / Arquitecto',
      clientCompany: 'Proyecto Radiológico',
      clientPhone: 'WhatsApp Directo',
      clientCity: 'México',
      summary: `Vidrio Emplomado: ${glass.name} (SKU: ${glass.sku || 'STD'})`,
      specs: {
        producto: glass.name,
        sku: glass.sku || 'STD',
        equivalenciaPb: glass.leadEquivalency,
        pesoKg: glass.weight,
        precioMXN: glass.basePrice
      },
      estimatedTotalMXN: glass.basePrice,
      status: 'ENVIADO_WHATSAPP'
    });

    const msg = [
      `Hola *ARXEM®*, me interesa cotizar / adquirir este *Vidrio Emplomado*:`,
      ``,
      `• *Pieza:* ${glass.name}`,
      `• *Atenuación:* ${glass.leadEquivalency}`,
      `• *SKU:* ${glass.sku || 'Estándar'}`,
      `• *Precio Publicado:* $${glass.basePrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`,
      `• *Folio:* ${record.id}`,
      ``,
      `¿Me confirman disponibilidad inmediata para envío en huacal de madera?`
    ].join('\n');

    openWhatsAppWithQuote(msg);
  };

  const selectedDims = useMemo(() => parseDimensionsCm(selectedGlass.name), [selectedGlass.name]);
  const activeChapter = ORIGIN_CHAPTERS[activeChapterIdx] || ORIGIN_CHAPTERS[0];

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#0D1117]">
      {/* =====================================================================
          SECTION 01: MONUMENTAL MINIMALIST HERO + 3D ISOMETRIC OPTICAL MONOLITH
      ===================================================================== */}
      <section className="pt-12 pb-24 lg:pt-16 lg:pb-32 border-b border-[#0D1117]/[0.08]">
        <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Minimalist Editorial Pitch */}
            <div className="lg:col-span-6 space-y-8">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#0D1117]/45">
                  01 — ÓPTICA DE PROTECCIÓN RADIOLÓGICA · NOM-229
                </span>
              </div>

              <h1
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-5xl sm:text-7xl lg:text-[76px] leading-[0.92] tracking-[-0.035em] uppercase text-[#0D1117]"
              >
                <span className="font-extralight block text-[#0D1117]/50">
                  Claridad Óptica.
                </span>
                <span className="font-extrabold block mt-1">
                  Cero Radiación.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#0D1117]/60 font-light leading-relaxed max-w-md">
                Cristal de silicato de plomo importado de Francia, Alemania y China. Más de 21 medidas en inventario para envío hoy o corte a medida.
              </p>

              {/* Minimalist Dual CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#comparador-escala"
                  className="px-8 py-4 rounded-full bg-[#0D1117] hover:bg-[#0052FF] text-white font-mono text-xs uppercase tracking-[0.18em] transition-all inline-flex items-center gap-2.5"
                >
                  <span>Explorar Medidas</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('vidrio-personalizado')}
                  className="px-7 py-4 rounded-full bg-white hover:bg-[#0D1117] text-[#0D1117] hover:text-white border border-[#0D1117]/12 font-mono text-xs uppercase tracking-[0.18em] transition-all inline-flex items-center gap-2"
                >
                  <span>Corte a Medida 3D</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Minimalist 3-Metric Strip */}
              <div className="pt-8 border-t border-[#0D1117]/[0.08] grid grid-cols-3 gap-6">
                <div>
                  <span
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-2xl sm:text-3xl font-extrabold text-[#0D1117] block"
                  >
                    &gt;87%
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 mt-1 block">
                    Transmisión Luz
                  </span>
                </div>

                <div>
                  <span
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-2xl sm:text-3xl font-extrabold text-[#0052FF] block"
                  >
                    2.9 mm Pb
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 mt-1 block">
                    Máx. Atenuación
                  </span>
                </div>

                <div>
                  <span
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-2xl sm:text-3xl font-extrabold text-[#0D1117] block"
                  >
                    21 SKUs
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 mt-1 block">
                    Stock Inmediato
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive 3D Isometric Prism Pedestal */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3.6] rounded-[32px] bg-white overflow-hidden">
                {/* Top-Left Live Spec Readout */}
                <div className="absolute top-6 left-6 z-20 pointer-events-none">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0D1117]/40 block">
                    MONOLITO ISOMÉTRICO · {heroPreset.origin.toUpperCase()}
                  </span>
                  <span
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-lg font-extrabold text-[#0D1117] mt-0.5 block"
                  >
                    {heroPreset.pb} · {heroPreset.density}
                  </span>
                </div>

                {/* Top-Right Interactive Thickness Pills */}
                <div className="absolute top-5 right-5 z-20 inline-flex p-1 rounded-full bg-[#F7F7F4] border border-[#0D1117]/[0.08]">
                  {HERO_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setHeroPreset(p)}
                      className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.12em] transition-all ${
                        heroPreset.id === p.id
                          ? 'bg-[#0D1117] text-white font-semibold'
                          : 'text-[#0D1117]/50 hover:text-[#0D1117]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* 60fps 3D Isometric Canvas */}
                <IsometricOpticalMonolith preset={heroPreset} />

                {/* Bottom Legend */}
                <div className="pointer-events-none absolute bottom-5 inset-x-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#0D1117]/40">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Fotones RX
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
                      0.00 µSv/h Operador
                    </span>
                  </div>
                  <span>Silicato PbO 55%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02: STICKY-SCROLL STORYTELLING — «3 ORÍGENES. 3 GRADOS ÓPTICOS.»
      ===================================================================== */}
      <section className="py-24 lg:py-32 border-b border-[#0D1117]/[0.08]">
        <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
          {/* Section Header */}
          <div className="pb-16 border-b border-[#0D1117]/[0.08] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#0D1117]/40 block mb-3">
                02 — ARQUITECTURA DE MATERIALES
              </span>
              <h2
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-4xl sm:text-6xl leading-[0.94] tracking-[-0.03em] uppercase text-[#0D1117]"
              >
                <span className="font-extralight block text-[#0D1117]/55">
                  Tres Orígenes.
                </span>
                <span className="font-extrabold block mt-1">
                  Grado Quirúrgico.
                </span>
              </h2>
            </div>

            <p className="text-sm text-[#0D1117]/55 max-w-sm font-light">
              Desliza para comparar la densidad atómica y equivalencia en plomo entre nuestras tres líneas de importación directa.
            </p>
          </div>

          {/* Sticky Scroll Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-12">
            {/* Left Scrolling Chapters */}
            <div className="lg:col-span-5 space-y-28 lg:py-16">
              {ORIGIN_CHAPTERS.map((chap, idx) => {
                const isActive = idx === activeChapterIdx;
                return (
                  <div
                    key={chap.index}
                    ref={(el) => {
                      chapterRefs.current[idx] = el;
                    }}
                    className={`transition-opacity duration-500 space-y-6 ${
                      isActive ? 'opacity-100' : 'opacity-30'
                    }`}
                  >
                    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0052FF]">
                      <span>{chap.index} / 03</span>
                      <span>·</span>
                      <span>{chap.eyebrow}</span>
                    </div>

                    <h3
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="text-3xl sm:text-5xl leading-[0.96] tracking-[-0.03em] uppercase text-[#0D1117]"
                    >
                      <span className="font-extralight block text-[#0D1117]/55">
                        {chap.titleLight}
                      </span>
                      <span className="font-extrabold block mt-1">
                        {chap.titleBold}
                      </span>
                    </h3>

                    <p className="text-sm sm:text-base text-[#0D1117]/60 font-light leading-relaxed max-w-md">
                      {chap.summary}
                    </p>

                    {/* Minimalist 2-Metric Hairline Row */}
                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#0D1117]/[0.08]">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                          Equivalencia Pb
                        </span>
                        <span
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                          className="text-2xl font-extrabold text-[#0D1117] mt-0.5 block"
                        >
                          {chap.pbMetric}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                          Densidad Óptica
                        </span>
                        <span
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                          className="text-2xl font-extrabold text-[#0052FF] mt-0.5 block"
                        >
                          {chap.densityMetric}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="#comparador-escala"
                        onClick={() =>
                          setOriginFilter(
                            chap.country.toLowerCase() as 'china' | 'alemania' | 'francia'
                          )
                        }
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#0D1117] hover:text-[#0052FF] transition-colors"
                      >
                        <span>Ver medidas de {chap.country}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Sticky Visual Stage */}
            <div className="lg:col-span-7 lg:sticky lg:top-24">
              <div className="relative aspect-[4/3.4] rounded-[32px] bg-white overflow-hidden p-8 flex flex-col justify-between">
                {/* Single-line Sculptural Background SVG that morphs per chapter */}
                <svg
                  viewBox="0 0 600 500"
                  fill="none"
                  className="pointer-events-none absolute inset-0 w-full h-full select-none"
                >
                  <g transform="translate(300, 250)">
                    <circle
                      r={160 + activeChapterIdx * 22}
                      stroke="#0D1117"
                      strokeOpacity="0.05"
                      strokeWidth="1"
                      className="transition-all duration-700"
                    />
                    <circle
                      r={115 + activeChapterIdx * 15}
                      stroke="#0052FF"
                      strokeOpacity="0.14"
                      strokeWidth="1"
                      strokeDasharray="6 10"
                      className="transition-all duration-700"
                    />
                  </g>
                </svg>

                {/* Top Bar inside Sticky Canvas */}
                <div className="relative z-20 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0D1117]/40 block">
                      CAPÍTULO {activeChapter.index} · {activeChapter.country.toUpperCase()}
                    </span>
                    <span
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="text-xl font-extrabold text-[#0D1117]"
                    >
                      {activeChapter.pbMetric}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {ORIGIN_CHAPTERS.map((c, i) => (
                      <span
                        key={c.index}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === activeChapterIdx ? 'w-8 bg-[#0052FF]' : 'w-2 bg-[#0D1117]/15'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Center 3D Isometric Canvas Morphing by Chapter */}
                <div className="relative z-10 flex-1 my-2">
                  <IsometricOpticalMonolith
                    preset={activeChapter.preset}
                    chapterIndex={activeChapterIdx}
                  />
                </div>

                {/* Bottom Bar inside Sticky Canvas */}
                <div className="relative z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/45 pt-3 border-t border-[#0D1117]/[0.06]">
                  <span>{activeChapter.thicknessLabel}</span>
                  <span>Densidad {activeChapter.densityMetric}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 03: INTERACTIVE ARCHITECTURAL SCALE COMPARATOR & QUICK BUY
      ===================================================================== */}
      <section
        id="comparador-escala"
        className="py-24 lg:py-32 border-b border-[#0D1117]/[0.08]"
      >
        <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
          {/* Header + Minimalist Origin Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#0D1117]/[0.08]">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#0D1117]/40 block mb-3">
                03 — COMPARADOR DE ESCALA ARQUITECTÓNICA
              </span>
              <h2
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-4xl sm:text-6xl leading-[0.94] tracking-[-0.03em] uppercase text-[#0D1117]"
              >
                <span className="font-extralight block text-[#0D1117]/55">
                  Selecciona tu
                </span>
                <span className="font-extrabold block mt-1">
                  Medida en Escala.
                </span>
              </h2>
            </div>

            {/* Origin Pills */}
            <div className="inline-flex p-1.5 rounded-full bg-white border border-[#0D1117]/[0.08] self-start lg:self-auto">
              {(
                [
                  { id: 'all', label: 'Todos' },
                  { id: 'china', label: 'China' },
                  { id: 'francia', label: 'Francia' },
                  { id: 'alemania', label: 'Alemania' }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setOriginFilter(tab.id)}
                  className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.14em] transition-all ${
                    originFilter === tab.id
                      ? 'bg-[#0D1117] text-white font-semibold'
                      : 'text-[#0D1117]/55 hover:text-[#0D1117]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Size Scrubber Pills */}
          <div className="py-6 border-b border-[#0D1117]/[0.08] overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {filteredGlassProducts.map((glass) => {
                const dims = parseDimensionsCm(glass.name);
                const active = glass.id === selectedGlass.id;
                return (
                  <button
                    key={glass.id}
                    type="button"
                    onClick={() => setSelectedGlass(glass)}
                    className={`px-4 py-2.5 rounded-full font-mono text-xs transition-all flex items-center gap-2 ${
                      active
                        ? 'bg-[#0052FF] text-white font-semibold shadow-sm'
                        : 'bg-white text-[#0D1117]/70 hover:text-[#0D1117]'
                    }`}
                  >
                    <span>{dims.label}</span>
                    <span
                      className={`text-[10px] ${
                        active ? 'text-white/80' : 'text-[#0D1117]/35'
                      }`}
                    >
                      · {glass.sku || 'PB'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Split Interactive Stage: Left Proportional Scale Visualizer + Right Purchase Monolith */}
          <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Proportional Control-Room Window Scale Stage (Cols 1-7) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3.3] rounded-[32px] bg-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#0D1117]/40">
                  <span>ESCALA REAL FRENTE A MURO DE CONTROL (ALTURA 2.10 M)</span>
                  <span className="text-[#0052FF] font-semibold">
                    {selectedDims.wCm} × {selectedDims.hCm} CM
                  </span>
                </div>

                {/* Proportional Viewport Canvas */}
                <div className="relative flex-1 my-4 flex items-center justify-center">
                  {/* Reference Wall Elevation Outline */}
                  <div className="relative w-full h-full max-w-[460px] max-h-[280px] border border-dashed border-[#0D1117]/15 rounded-2xl flex items-center justify-center">
                    <span className="absolute -top-5 left-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#0D1117]/30">
                      Vano Muro Radiológico
                    </span>

                    {/* Dynamically Scaled Glass Window Pane */}
                    <motion.div
                      key={selectedGlass.id}
                      initial={{ opacity: 0.6, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        width: `${Math.min(88, Math.max(24, (selectedDims.wCm / 135) * 100))}%`,
                        height: `${Math.min(86, Math.max(24, (selectedDims.hCm / 190) * 100))}%`
                      }}
                      className="relative rounded-xl border-2 border-[#0052FF] bg-gradient-to-br from-[#0052FF]/[0.10] via-amber-400/[0.08] to-[#0052FF]/[0.18] shadow-[0_20px_50px_-15px_rgba(0,82,255,0.22)] flex flex-col items-center justify-center p-3 text-center"
                    >
                      <span
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="font-extrabold text-sm sm:text-base text-[#0D1117]"
                      >
                        {selectedDims.label}
                      </span>
                      <span className="font-mono text-[10px] text-[#0D1117]/55">
                        {selectedDims.wCm} × {selectedDims.hCm} cm
                      </span>
                    </motion.div>
                  </div>

                  {/* Studio Cutout Floating Preview in Bottom-Right Corner */}
                  <img
                    src="/products/orbit-01-vidrio.png"
                    alt={selectedGlass.name}
                    className="hidden sm:block absolute -bottom-2 right-2 w-28 h-28 object-contain drop-shadow-[0_18px_28px_rgba(13,17,23,0.18)] pointer-events-none"
                  />
                </div>

                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 pt-3 border-t border-[#0D1117]/[0.06]">
                  <span>SKU: {selectedGlass.sku || 'STD'}</span>
                  <span>Masa: {selectedGlass.weight} kg</span>
                </div>
              </div>
            </div>

            {/* Right Minimalist Spec & Purchase Monolith (Cols 8-12) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0052FF] mb-3">
                  <span>{selectedGlass.leadEquivalency}</span>
                  <span>·</span>
                  <span>SKU {selectedGlass.sku || 'STD'}</span>
                </div>

                <h3
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0D1117] leading-[1.08]"
                >
                  {selectedGlass.name}
                </h3>
              </div>

              {/* Hairline Spec Rows */}
              <div className="divide-y divide-[#0D1117]/[0.08] border-t border-b border-[#0D1117]/[0.08] text-xs">
                <div className="py-3.5 flex items-center justify-between">
                  <span className="font-mono uppercase tracking-[0.16em] text-[#0D1117]/45">
                    Dimensiones Nominales
                  </span>
                  <span className="font-mono font-semibold text-[#0D1117]">
                    {selectedDims.label} ({selectedDims.wCm} × {selectedDims.hCm} cm)
                  </span>
                </div>
                <div className="py-3.5 flex items-center justify-between">
                  <span className="font-mono uppercase tracking-[0.16em] text-[#0D1117]/45">
                    Equivalencia en Plomo
                  </span>
                  <span className="font-mono font-semibold text-[#0052FF]">
                    {selectedGlass.leadEquivalency}
                  </span>
                </div>
                <div className="py-3.5 flex items-center justify-between">
                  <span className="font-mono uppercase tracking-[0.16em] text-[#0D1117]/45">
                    Peso Físico
                  </span>
                  <span className="font-mono font-semibold text-[#0D1117]">
                    {selectedGlass.weight} kg
                  </span>
                </div>
                <div className="py-3.5 flex items-center justify-between">
                  <span className="font-mono uppercase tracking-[0.16em] text-[#0D1117]/45">
                    Normativa
                  </span>
                  <span className="font-mono font-semibold text-emerald-700">
                    Cumple NOM-229-SSA1 COFEPRIS
                  </span>
                </div>
              </div>

              {/* Price + Direct Actions */}
              <div className="space-y-5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                      Precio Neto Publicado
                    </span>
                    <span
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="text-4xl font-extrabold text-[#0D1117] mt-0.5 block"
                    >
                      ${selectedGlass.basePrice.toLocaleString('es-MX', {
                        minimumFractionDigits: 2
                      })}{' '}
                      <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#0D1117]/40 font-normal">
                        MXN
                      </span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProduct(selectedGlass)}
                    className="font-mono text-xs uppercase tracking-[0.16em] text-[#0052FF] hover:underline"
                  >
                    Ver ficha →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onAddToCart(selectedGlass)}
                    className="py-4 px-5 rounded-full bg-[#0D1117] hover:bg-[#0052FF] text-white font-mono text-xs uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Agregar al Carrito</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleExpressWhatsAppQuote(selectedGlass)}
                    className="py-4 px-5 rounded-full bg-white hover:bg-[#0D1117] text-[#0D1117] hover:text-white border border-[#0D1117]/15 font-mono text-xs uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Cotizar WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Minimalist Trust Micro-Row */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-[#0D1117]/50">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0052FF]" />
                    Certificado COFEPRIS
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#0052FF]" />
                    Huacal Asegurado
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-[#0052FF]" />
                    CFDI 4.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 04: FRAMELESS ARCHITECTURAL INDEX TABLE (ALL 21 SIZES)
      ===================================================================== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-[#0D1117]/[0.08]">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#0D1117]/40 block mb-2">
                04 — ÍNDICE TÉCNICO COMPLETO ({filteredGlassProducts.length} MEDIDAS)
              </span>
              <h2
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-3xl sm:text-5xl tracking-[-0.03em] uppercase text-[#0D1117]"
              >
                <span className="font-extralight text-[#0D1117]/55">Archivo </span>
                <span className="font-extrabold">de Medidas.</span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('vidrio-personalizado')}
              className="font-mono text-xs uppercase tracking-[0.18em] text-[#0052FF] hover:underline inline-flex items-center gap-1.5"
            >
              <span>¿Necesitas un corte especial? Ir al Configurador 3D</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Hairline Architectural Index Table */}
          <div className="divide-y divide-[#0D1117]/[0.08] border-b border-[#0D1117]/[0.08]">
            {filteredGlassProducts.map((glass, idx) => {
              const dims = parseDimensionsCm(glass.name);
              const isAdded = justAddedId === glass.id;
              return (
                <div
                  key={glass.id}
                  onClick={() => onSelectProduct(glass)}
                  className="group cursor-pointer py-5 px-3 hover:bg-white/80 transition-colors grid grid-cols-12 items-center gap-4"
                >
                  <div className="col-span-2 sm:col-span-1 font-mono text-xs text-[#0D1117]/35">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="col-span-10 sm:col-span-5">
                    <div
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="font-bold text-base text-[#0D1117] group-hover:text-[#0052FF] transition-colors"
                    >
                      {glass.name}
                    </div>
                    <div className="font-mono text-[11px] text-[#0D1117]/40">
                      SKU: {glass.sku || 'STD'} · {dims.wCm} × {dims.hCm} cm
                    </div>
                  </div>

                  <div className="col-span-4 sm:col-span-2 font-mono text-xs text-[#0052FF]">
                    {glass.leadEquivalency}
                  </div>

                  <div className="col-span-4 sm:col-span-2 font-mono text-xs text-[#0D1117]/50">
                    {glass.weight} kg
                  </div>

                  <div className="col-span-4 sm:col-span-2 flex items-center justify-end gap-3">
                    <span
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="font-extrabold text-base text-[#0D1117]"
                    >
                      ${glass.basePrice.toLocaleString('es-MX')}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(glass);
                        setJustAddedId(glass.id);
                        setTimeout(() => setJustAddedId(null), 1400);
                      }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white group-hover:bg-[#0D1117] group-hover:text-white text-[#0D1117]'
                      }`}
                      aria-label={`Agregar ${glass.name}`}
                    >
                      {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
