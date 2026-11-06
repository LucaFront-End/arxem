import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { CATALOG_PRODUCTS, CatalogProduct } from '../data/catalogData';
import { saveQuoteToCMS, openWhatsAppWithQuote } from '../data/taxonomyData';

interface CustomGlassLandingProps {
  onSelectProduct: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct, variantLabel?: string, price?: number) => void;
  onOpenCMSModal: () => void;
}

interface GlassSpecOption {
  id: string;
  label: string;
  shortLabel: string;
  origin: 'China' | 'Francia' | 'Alemania';
  thicknessMm: number;
  pbEquivalency: string;
  densityGcm3: number;
  pricePerSqMeterMXN: number;
  recommendedRooms: string[];
}

const GLASS_SPECS: GlassSpecOption[] = [
  {
    id: 'china-8mm',
    label: '8 mm · Importado de China',
    shortLabel: '8 mm China',
    origin: 'China',
    thicknessMm: 8,
    pbEquivalency: '1.7 – 1.92 mm Pb',
    densityGcm3: 4.2,
    pricePerSqMeterMXN: 51500,
    recommendedRooms: ['Dental / Periapical', 'Panorámico / CBCT', 'Mastografía', 'Veterinaria']
  },
  {
    id: 'alemania-8mm',
    label: '8 mm · Importado de Alemania',
    shortLabel: '8 mm Alemania',
    origin: 'Alemania',
    thicknessMm: 8,
    pbEquivalency: '2.10 mm Pb',
    densityGcm3: 4.5,
    pricePerSqMeterMXN: 104000,
    recommendedRooms: ['Rayos X Convencional', 'Quirófano', 'Clínica Alta Especialidad']
  },
  {
    id: 'china-10mm',
    label: '10 mm · Importado de China',
    shortLabel: '10 mm China',
    origin: 'China',
    thicknessMm: 10,
    pbEquivalency: '2.0 – 2.40 mm Pb',
    densityGcm3: 4.35,
    pricePerSqMeterMXN: 69500,
    recommendedRooms: ['Rayos X Convencional', 'Fluoroscopía', 'Tomografía Axial (CT)']
  },
  {
    id: 'francia-10mm',
    label: '10 mm · Importado de Francia (Grado Óptico)',
    shortLabel: '10 mm Francia',
    origin: 'Francia',
    thicknessMm: 10,
    pbEquivalency: '2.60 mm Pb',
    densityGcm3: 4.8,
    pricePerSqMeterMXN: 95500,
    recommendedRooms: ['Tomografía (CT)', 'Hemodinamia', 'Hospitales Certificados']
  },
  {
    id: 'china-12mm',
    label: '12 mm · Importado de China (Máxima Atenuación)',
    shortLabel: '12 mm China',
    origin: 'China',
    thicknessMm: 12,
    pbEquivalency: '2.5 – 2.90 mm Pb',
    densityGcm3: 4.4,
    pricePerSqMeterMXN: 73500,
    recommendedRooms: ['Tomografía Multicorte', 'Hemodinamia', 'Arco en C / Angiografía']
  }
];

const STANDARD_PRESETS = [
  { label: '8" × 10"', wCm: 20.32, hCm: 25.4 },
  { label: '12" × 16"', wCm: 30.48, hCm: 40.64 },
  { label: '18" × 24"', wCm: 45.72, hCm: 60.96 },
  { label: '24" × 36"', wCm: 60.96, hCm: 91.44 },
  { label: '32" × 40"', wCm: 81.28, hCm: 101.6 },
  { label: '36" × 48"', wCm: 91.44, hCm: 121.92 },
  { label: '36" × 72"', wCm: 91.44, hCm: 182.88 },
  { label: '60 × 110 cm', wCm: 60, hCm: 110 },
  { label: '110 × 120 cm', wCm: 110, hCm: 120 }
];

type Vec3 = { x: number; y: number; z: number };

interface PolyFace {
  verts: Vec3[];
  fill: string;
  stroke: string;
  strokeWidth?: number;
  alpha?: number;
  depthBias?: number;
}

type StageMode = 'auto' | 'exploded' | 'assembled';

/**
 * Interactive 60fps 3D Isometric Lead-Glass Assembly Visualizer.
 * Dynamically scales width, height, crystal thickness, and optical tint in real time.
 */
const IsometricGlassVisualizer: React.FC<{
  widthCm: number;
  heightCm: number;
  spec: GlassSpecOption;
  viewMode: StageMode;
}> = ({ widthCm, heightCm, spec, viewMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labelWidthRef = useRef<HTMLDivElement | null>(null);
  const labelHeightRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 });

  const animRef = useRef({
    wNorm: widthCm / 100,
    hNorm: heightCm / 100,
    thickNorm: spec.thicknessMm / 10,
    explode: 0.45,
    simTime: 0,
    lastNow: performance.now()
  });

  const propsRef = useRef({ widthCm, heightCm, spec, viewMode });
  propsRef.current = { widthCm, heightCm, spec, viewMode };

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
      const sw = opts.strokeWidth ?? 1;
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

      const { widthCm: wCm, heightCm: hCm, spec: curSpec, viewMode: vMode } = propsRef.current;

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

      // Smoothly interpolate dimensions & explode factor
      const targetW = Math.max(0.32, Math.min(1.38, wCm / 95));
      const targetH = Math.max(0.32, Math.min(1.32, hCm / 95));
      const targetThick = curSpec.thicknessMm / 9;

      let targetExplode = 0;
      if (vMode === 'exploded') targetExplode = 1;
      else if (vMode === 'assembled') targetExplode = 0;
      else {
        const cyc = (Math.sin(t * 0.85 - 0.3) + 1) * 0.5;
        targetExplode = Math.max(0, Math.min(1, (cyc - 0.25) * 1.65));
      }

      st.wNorm += (targetW - st.wNorm) * 0.1;
      st.hNorm += (targetH - st.hNorm) * 0.1;
      st.thickNorm += (targetThick - st.thickNorm) * 0.1;
      st.explode += (targetExplode - st.explode) * 0.08;

      const m = mouseRef.current;
      m.cx += (m.tx - m.cx) * 0.08;
      m.cy += (m.ty - m.cy) * 0.08;

      const yaw = Math.PI / 4 + Math.sin(t * 0.38) * 0.03 + m.cx * 0.22;
      const pitch = 0.52 + Math.cos(t * 0.32) * 0.015 + m.cy * 0.12;
      const scale = Math.min(W, H) * 0.00275;
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

      // Subtle architectural floor grid
      const floorY = -76;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(13, 17, 23, 0.05)';
      for (let g = -140; g <= 140; g += 28) {
        const p1 = project({ x: g, y: floorY, z: -140 });
        const p2 = project({ x: g, y: floorY, z: 140 });
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();

        const q1 = project({ x: -140, y: floorY, z: g });
        const q2 = project({ x: 140, y: floorY, z: g });
        ctx.beginPath();
        ctx.moveTo(q1.sx, q1.sy);
        ctx.lineTo(q2.sx, q2.sy);
        ctx.stroke();
      }

      const halfZ = 56 * st.wNorm; // Width along Z axis
      const halfY = 44 * st.hNorm; // Height along Y axis
      const glassHalfT = 6.5 * st.thickNorm;
      const spread = st.explode * 42;

      const faces: PolyFace[] = [];

      // Partition Wall Cutaway (Alabaster Concrete)
      const wallZ = Math.max(halfZ + 26, 98);
      const wallBot = Math.min(-halfY - 16, -54);
      faces.push(
        ...makeBox(-12, 12, floorY, -halfY, -wallZ, wallZ, {
          top: '#FFFFFF',
          left: '#E2E8F0',
          right: '#CBD5E1',
          stroke: '#94A3B8',
          depthBias: -26
        }),
        ...makeBox(-12, 12, -halfY, halfY + 14, -wallZ, -halfZ - 8, {
          top: '#FFFFFF',
          left: '#E2E8F0',
          right: '#CBD5E1',
          stroke: '#94A3B8',
          depthBias: -22
        }),
        ...makeBox(-12, 12, -halfY, 4, halfZ + 8, wallZ, {
          top: '#FFFFFF',
          left: '#E2E8F0',
          right: '#CBD5E1',
          stroke: '#94A3B8',
          depthBias: 16
        })
      );
      void wallBot;

      // Layer 1: Rear Telescopic Steel Subframe
      const f1X = -15 - spread * 1.05;
      faces.push(
        ...makeHollowFrame(f1X - 6, f1X, -halfY - 7, halfY + 7, -halfZ - 7, halfZ + 7, 7, {
          top: '#475569',
          left: '#1E293B',
          right: '#0F172A',
          stroke: '#0D1117',
          depthBias: -12
        })
      );

      // Layer 2: Perimeter Lead Gasket (Sello Emplomado)
      const f2X = -7 - spread * 0.48;
      faces.push(
        ...makeHollowFrame(f2X - 3.5, f2X, -halfY - 4, halfY + 4, -halfZ - 4, halfZ + 4, 4.5, {
          top: '#60A5FA',
          left: '#2563EB',
          right: '#1D4ED8',
          stroke: '#1E40AF',
          depthBias: -5
        })
      );

      // Layer 3: Lead-Silicate Optical Crystal (Tint shifts subtly by origin)
      const crystalPalette =
        curSpec.origin === 'Francia'
          ? {
              top: 'rgba(56, 189, 248, 0.72)',
              left: 'rgba(14, 165, 233, 0.48)',
              right: 'rgba(2, 132, 199, 0.62)',
              stroke: '#0284C7'
            }
          : curSpec.origin === 'Alemania'
          ? {
              top: 'rgba(99, 102, 241, 0.68)',
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
        ...makeBox(-glassHalfT, glassHalfT, -halfY, halfY, -halfZ, halfZ, {
          ...crystalPalette,
          strokeWidth: 1.5,
          alpha: 0.92,
          depthBias: 4
        })
      );

      // Internal Warm Amber PbO Core Plane inside Crystal
      faces.push({
        verts: [
          { x: 0, y: -halfY + 3, z: -halfZ + 3 },
          { x: 0, y: halfY - 3, z: -halfZ + 3 },
          { x: 0, y: halfY - 3, z: halfZ - 3 },
          { x: 0, y: -halfY + 3, z: halfZ - 3 }
        ],
        fill: 'rgba(245, 158, 11, 0.25)',
        stroke: 'rgba(217, 119, 6, 0.55)',
        alpha: 0.85,
        depthBias: 6
      });

      // Specular Reflection Sweep across Glass
      const sweepSpan = Math.max(20, halfZ * 1.5);
      const specZ = ((t * 38) % (sweepSpan * 2)) - sweepSpan;
      if (specZ > -halfZ + 8 && specZ < halfZ - 8) {
        faces.push({
          verts: [
            { x: glassHalfT + 0.4, y: -halfY + 4, z: Math.max(-halfZ + 3, specZ - 9) },
            { x: glassHalfT + 0.4, y: halfY - 4, z: Math.min(halfZ - 3, specZ + 4) },
            { x: glassHalfT + 0.4, y: halfY - 4, z: Math.min(halfZ - 3, specZ + 13) },
            { x: glassHalfT + 0.4, y: -halfY + 4, z: Math.max(-halfZ + 3, specZ) }
          ],
          fill: 'rgba(255, 255, 255, 0.68)',
          stroke: 'transparent',
          alpha: 0.9,
          depthBias: 9
        });
      }

      // Layer 4: Front Brushed Inox 304 Retainer Frame
      const f4X = 13 + spread * 0.95;
      faces.push(
        ...makeHollowFrame(f4X, f4X + 6, -halfY - 7, halfY + 7, -halfZ - 7, halfZ + 7, 7, {
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

      // Live X-Ray Attenuation Beam (Red incident ray stopped at crystal -> clean blue optical sightline)
      const src = project({ x: -120, y: 6, z: 0 });
      const hit = project({ x: 0, y: 6, z: 0 });
      const out = project({ x: 120, y: 6, z: 0 });

      ctx.save();
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(src.sx, src.sy);
      ctx.lineTo(hit.sx, hit.sy);
      ctx.stroke();

      const p = (t * 1.25) % 1;
      const px = src.sx + (hit.sx - src.sx) * p;
      const py = src.sy + (hit.sy - src.sy) * p;
      ctx.setLineDash([]);
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(px, py, 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#0052FF';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(hit.sx, hit.sy);
      ctx.lineTo(out.sx, out.sy);
      ctx.stroke();
      ctx.restore();

      // 3D Architectural Dimension Lines on the Crystal
      const dimTopLeft = project({ x: 0, y: halfY + 14, z: -halfZ });
      const dimTopRight = project({ x: 0, y: halfY + 14, z: halfZ });
      const dimTopMid = project({ x: 0, y: halfY + 18, z: 0 });

      ctx.save();
      ctx.strokeStyle = 'rgba(13, 17, 23, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(dimTopLeft.sx, dimTopLeft.sy);
      ctx.lineTo(dimTopRight.sx, dimTopRight.sy);
      ctx.stroke();

      const dimSideTop = project({ x: 0, y: halfY, z: -halfZ - 16 });
      const dimSideBot = project({ x: 0, y: -halfY, z: -halfZ - 16 });
      const dimSideMid = project({ x: 0, y: 0, z: -halfZ - 22 });

      ctx.beginPath();
      ctx.moveTo(dimSideTop.sx, dimSideTop.sy);
      ctx.lineTo(dimSideBot.sx, dimSideBot.sy);
      ctx.stroke();
      ctx.restore();

      if (labelWidthRef.current) {
        labelWidthRef.current.style.transform = `translate3d(${dimTopMid.sx.toFixed(1)}px, ${dimTopMid.sy.toFixed(1)}px, 0)`;
      }
      if (labelHeightRef.current) {
        labelHeightRef.current.style.transform = `translate3d(${dimSideMid.sx.toFixed(1)}px, ${dimSideMid.sy.toFixed(1)}px, 0)`;
      }

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

      {/* 3D Projected Width & Height Callout Pills */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={labelWidthRef}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-white/95 border border-[#0D1117]/12 font-mono text-[10px] font-semibold text-[#0D1117] shadow-sm whitespace-nowrap"
        >
          Ancho: {widthCm} cm
        </div>
        <div
          ref={labelHeightRef}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-white/95 border border-[#0D1117]/12 font-mono text-[10px] font-semibold text-[#0D1117] shadow-sm whitespace-nowrap"
        >
          Alto: {heightCm} cm
        </div>
      </div>
    </div>
  );
};

export const CustomGlassLanding: React.FC<CustomGlassLandingProps> = ({
  onSelectProduct,
  onAddToCart
}) => {
  const [widthCm, setWidthCm] = useState<number>(60.96); // 24"
  const [heightCm, setHeightCm] = useState<number>(91.44); // 36"
  const [selectedSpecId, setSelectedSpecId] = useState<string>('china-8mm');
  const [roomType, setRoomType] = useState<string>('Rayos X Convencional');
  const [quantity, setQuantity] = useState<number>(1);
  const [includeWoodCrate, setIncludeWoodCrate] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<StageMode>('auto');

  // Client Lead Form
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [savedRecordId, setSavedRecordId] = useState<string | null>(null);

  const activeSpec =
    GLASS_SPECS.find((s) => s.id === selectedSpecId) || GLASS_SPECS[0];

  // Engineering calculations
  const widthInches = (widthCm / 2.54).toFixed(1);
  const heightInches = (heightCm / 2.54).toFixed(1);
  const areaSqM = Math.max(0.05, (widthCm / 100) * (heightCm / 100));

  const unitWeightKg = Math.max(
    3.5,
    Number(((widthCm * heightCm * (activeSpec.thicknessMm / 10) * activeSpec.densityGcm3) / 1000).toFixed(1))
  );

  const rawGlassPrice = Math.round(areaSqM * activeSpec.pricePerSqMeterMXN);
  const crateFee = includeWoodCrate ? 1250 : 0;
  const unitEstimatedMXN = Math.max(3320, rawGlassPrice + crateFee);
  const totalEstimatedMXN = unitEstimatedMXN * quantity;

  const closestCatalogGlass = useMemo(() => {
    const glasses = CATALOG_PRODUCTS.filter((p) => p.storePillar === 'vidrios-emplomados');
    const originMatch = glasses.filter((g) =>
      g.name.toLowerCase().includes(activeSpec.origin.toLowerCase())
    );
    return originMatch.length > 0 ? originMatch.slice(0, 3) : glasses.slice(0, 3);
  }, [activeSpec]);

  const handleSaveAndSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const nameToUse = clientName.trim() || 'Ingeniero / Especialista Clínico';
    const companyToUse = clientCompany.trim() || 'Proyecto Hospitalario / Clínica';
    const cityToUse = clientCity.trim() || 'México';

    const record = saveQuoteToCMS({
      type: 'VIDRIO_PERSONALIZADO',
      clientName: nameToUse,
      clientCompany: companyToUse,
      clientPhone: clientPhone.trim() || 'WhatsApp Directo',
      clientCity: cityToUse,
      summary: `Vidrio Emplomado ${widthCm}x${heightCm} cm (${widthInches}"x${heightInches}") · ${activeSpec.label} (${activeSpec.pbEquivalency})`,
      specs: {
        anchoCm: widthCm,
        altoCm: heightCm,
        pulgadas: `${widthInches}" x ${heightInches}"`,
        areaM2: Number(areaSqM.toFixed(3)),
        espesorMm: activeSpec.thicknessMm,
        origen: activeSpec.origin,
        equivalenciaPb: activeSpec.pbEquivalency,
        pesoUnitarioKg: unitWeightKg,
        tipoSala: roomType,
        cantidad: quantity,
        huacalMadera: includeWoodCrate ? 'Incluido' : 'No'
      },
      estimatedTotalMXN: totalEstimatedMXN,
      status: 'ENVIADO_WHATSAPP'
    });

    setSavedRecordId(record.id);

    const whatsappMsg = [
      `Hola *ARXEM®*, configuré un *Vidrio Emplomado a Medida* en su sitio web:`,
      ``,
      `📐 *ESPECIFICACIÓN TÉCNICA (FOLIO: ${record.id})*`,
      `• *Dimensiones:* ${widthCm} cm × ${heightCm} cm (${widthInches}" × ${heightInches}")`,
      `• *Área Óptica:* ${areaSqM.toFixed(2)} m²`,
      `• *Espesor y Origen:* ${activeSpec.label}`,
      `• *Protección Equivalente:* ${activeSpec.pbEquivalency}`,
      `• *Peso Físico Estimado:* ${unitWeightKg} kg por pieza`,
      `• *Tipo de Sala:* ${roomType}`,
      `• *Cantidad:* ${quantity} pieza(s)`,
      `• *Embalaje Huacal de Madera:* ${includeWoodCrate ? 'Sí, blindado para envío' : 'Recolección local'}`,
      `• *Inversión Estimada:* $${totalEstimatedMXN.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`,
      ``,
      `👤 *DATOS DE CONTACTO:*`,
      `• *Nombre:* ${nameToUse}`,
      `• *Clínica / Constructora:* ${companyToUse}`,
      `• *Ciudad de Entrega:* ${cityToUse}`,
      `• *Teléfono:* ${clientPhone || 'Este número'}`,
      ``,
      `¿Me apoyan validando disponibilidad en medida estándar cercana o tiempo de corte?`
    ].join('\n');

    openWhatsAppWithQuote(whatsappMsg);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#0D1117] pt-12 pb-28">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        {/* ===================================================================
            1. MINIMALIST ARCHITECTURAL HEADER
        =================================================================== */}
        <header className="pb-12 border-b border-[#0D1117]/[0.08] flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#0D1117]/45">
                01 — INGENIERÍA ÓPTICA A MEDIDA · NOM-229-SSA1
              </span>
            </div>

            <h1
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-4xl sm:text-6xl lg:text-[64px] leading-[0.94] tracking-[-0.035em] uppercase text-[#0D1117]"
            >
              <span className="font-extralight block text-[#0D1117]/55">
                Vidrio Emplomado
              </span>
              <span className="font-extrabold block mt-1">
                Configurador 3D.
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#0D1117]/60 max-w-md font-light leading-relaxed">
            Dimensiona el cristal de observación radiológica al milímetro. El modelo isométrico 3D calcula en vivo la masa estructural, atenuación equivalente en plomo (mm Pb) e inversión estimada.
          </p>
        </header>

        {/* ===================================================================
            2. SPLIT-SCREEN WORKSPACE (LEFT 3D STAGE + RIGHT FRAMELESS CONTROLS)
        =================================================================== */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ─── LEFT STICKY 3D ISOMETRIC STUDIO STAGE (Cols 1-6) ─── */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-6">
            <div className="relative aspect-[4/3.5] rounded-[28px] bg-white overflow-hidden">
              {/* Top-Left Live Spec Tag */}
              <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0D1117]/40">
                  SIMULACIÓN ÓPTICA 3D · {activeSpec.origin.toUpperCase()}
                </div>
                <div
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-lg font-extrabold text-[#0D1117] mt-0.5"
                >
                  {widthCm} × {heightCm} cm{' '}
                  <span className="font-light text-[#0D1117]/45 text-sm">
                    ({widthInches}" × {heightInches}")
                  </span>
                </div>
              </div>

              {/* Top-Right View Mode Switcher */}
              <div className="absolute top-5 right-5 z-20 inline-flex p-1 rounded-full bg-[#F7F7F4] border border-[#0D1117]/[0.08]">
                {(
                  [
                    { id: 'auto' as StageMode, label: 'Ciclo' },
                    { id: 'exploded' as StageMode, label: 'Despiece' },
                    { id: 'assembled' as StageMode, label: 'Ensamble' }
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setViewMode(m.id)}
                    className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.14em] transition-all ${
                      viewMode === m.id
                        ? 'bg-[#0D1117] text-white font-semibold'
                        : 'text-[#0D1117]/50 hover:text-[#0D1117]'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Interactive 60fps 3D Isometric Canvas */}
              <IsometricGlassVisualizer
                widthCm={widthCm}
                heightCm={heightCm}
                spec={activeSpec}
                viewMode={viewMode}
              />

              {/* Bottom Physics Legend inside Canvas */}
              <div className="pointer-events-none absolute bottom-5 inset-x-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#0D1117]/45">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Haz RX Primario
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
                    Visión Libre 0.00 µSv/h
                  </span>
                </div>
                <span className="text-[#0052FF] font-semibold">
                  {activeSpec.pbEquivalency}
                </span>
              </div>
            </div>

            {/* Minimalist Hairline Telemetry Readout Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-b border-[#0D1117]/[0.08] py-5 gap-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                  Atenuación Pb
                </span>
                <span
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-lg font-extrabold text-[#0052FF] mt-1 block"
                >
                  {activeSpec.pbEquivalency}
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                  Área Óptica
                </span>
                <span
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-lg font-extrabold text-[#0D1117] mt-1 block"
                >
                  {areaSqM.toFixed(2)} m²
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                  Masa ({quantity} pza)
                </span>
                <span
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-lg font-extrabold text-[#0D1117] mt-1 block"
                >
                  {(unitWeightKg * quantity).toFixed(1)} kg
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                  Inversión Est.
                </span>
                <span
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-lg font-extrabold text-[#0D1117] mt-1 block"
                >
                  ${totalEstimatedMXN.toLocaleString('es-MX')}
                </span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT FRAMELESS CONFIGURATION STEPS (Cols 7-12) ─── */}
          <div className="lg:col-span-6 space-y-12">
            {/* STEP 01: DIMENSIONS */}
            <section className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#0D1117]/[0.08] pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D1117]/45">
                  01 / Dimensiones del Cristal
                </span>
                <span className="font-mono text-[11px] text-[#0052FF]">
                  Corte con tolerancia ±1 mm
                </span>
              </div>

              {/* Minimalist Preset Pills */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0D1117]/40 block mb-2.5">
                  Medidas estándar rápidas
                </span>
                <div className="flex flex-wrap gap-2">
                  {STANDARD_PRESETS.map((preset) => {
                    const active =
                      Math.abs(widthCm - preset.wCm) < 0.5 &&
                      Math.abs(heightCm - preset.hCm) < 0.5;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setWidthCm(preset.wCm);
                          setHeightCm(preset.hCm);
                        }}
                        className={`px-3.5 py-2 rounded-full font-mono text-xs transition-all ${
                          active
                            ? 'bg-[#0D1117] text-white font-semibold'
                            : 'bg-white text-[#0D1117]/70 hover:text-[#0D1117]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Frameless Sliders for Width & Height */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#0D1117]/55">
                      Ancho (cm)
                    </label>
                    <div className="flex items-baseline gap-1.5">
                      <input
                        type="number"
                        min={10}
                        max={250}
                        step={0.1}
                        value={widthCm}
                        onChange={(e) => setWidthCm(parseFloat(e.target.value) || 20)}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="w-20 text-right bg-transparent border-b border-[#0D1117]/20 focus:border-[#0052FF] focus:outline-none text-2xl font-extrabold text-[#0D1117]"
                      />
                      <span className="font-mono text-xs text-[#0D1117]/40">
                        cm ({widthInches}")
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={200}
                    step={0.5}
                    value={widthCm}
                    onChange={(e) => setWidthCm(parseFloat(e.target.value) || 20)}
                    className="w-full accent-[#0D1117] cursor-pointer h-1 bg-[#0D1117]/15 rounded-lg"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#0D1117]/55">
                      Alto (cm)
                    </label>
                    <div className="flex items-baseline gap-1.5">
                      <input
                        type="number"
                        min={10}
                        max={250}
                        step={0.1}
                        value={heightCm}
                        onChange={(e) => setHeightCm(parseFloat(e.target.value) || 25)}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="w-20 text-right bg-transparent border-b border-[#0D1117]/20 focus:border-[#0052FF] focus:outline-none text-2xl font-extrabold text-[#0D1117]"
                      />
                      <span className="font-mono text-xs text-[#0D1117]/40">
                        cm ({heightInches}")
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={220}
                    step={0.5}
                    value={heightCm}
                    onChange={(e) => setHeightCm(parseFloat(e.target.value) || 25)}
                    className="w-full accent-[#0D1117] cursor-pointer h-1 bg-[#0D1117]/15 rounded-lg"
                  />
                </div>
              </div>
            </section>

            {/* STEP 02: THICKNESS & ORIGIN */}
            <section className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-[#0D1117]/[0.08] pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D1117]/45">
                  02 / Espesor, Origen y Equivalencia (mm Pb)
                </span>
                <span className="font-mono text-[11px] text-[#0D1117]/40">
                  {GLASS_SPECS.length} especificaciones
                </span>
              </div>

              <div className="divide-y divide-[#0D1117]/[0.08] border-b border-[#0D1117]/[0.08]">
                {GLASS_SPECS.map((spec) => {
                  const isSelected = spec.id === selectedSpecId;
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      onClick={() => setSelectedSpecId(spec.id)}
                      className={`w-full py-4 px-4 text-left transition-all flex items-center justify-between gap-4 rounded-2xl ${
                        isSelected
                          ? 'bg-[#0D1117] text-white my-1'
                          : 'hover:bg-white/70 text-[#0D1117]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                            className="font-bold text-base"
                          >
                            {spec.label}
                          </span>
                          <span
                            className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full ${
                              isSelected
                                ? 'bg-[#0052FF] text-white'
                                : 'bg-[#0052FF]/10 text-[#0052FF]'
                            }`}
                          >
                            {spec.pbEquivalency}
                          </span>
                        </div>
                        <p
                          className={`text-xs font-light ${
                            isSelected ? 'text-white/65' : 'text-[#0D1117]/50'
                          }`}
                        >
                          {spec.recommendedRooms.join(' · ')}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`font-mono text-xs block ${
                            isSelected ? 'text-white/80' : 'text-[#0D1117]/55'
                          }`}
                        >
                          {spec.densityGcm3} g/cm³
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 03: ROOM APPLICATION & QUANTITY */}
            <section className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#0D1117]/[0.08] pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D1117]/45">
                  03 / Aplicación Clínica y Embalaje
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0D1117]/45 block mb-2">
                    Tipo de Sala Radiológica
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full py-3 px-4 rounded-2xl bg-white border border-[#0D1117]/10 text-sm text-[#0D1117] focus:outline-none focus:border-[#0D1117]"
                  >
                    <option value="Rayos X Convencional">Sala de Rayos X Convencional</option>
                    <option value="Tomografía Axial (CT)">Sala de Tomografía (CT / TAC)</option>
                    <option value="Mastografía">Sala de Mastografía</option>
                    <option value="Consultorio Dental / CBCT">Gabinete Dental / CBCT</option>
                    <option value="Hemodinamia / Quirófano">Hemodinamia / Quirófano</option>
                    <option value="Clínica Veterinaria">Sala Radiológica Veterinaria</option>
                  </select>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0D1117]/45 block mb-2">
                      Piezas
                    </span>
                    <div className="inline-flex items-center rounded-full bg-white border border-[#0D1117]/10 px-2 py-1">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#0D1117]/60 hover:text-[#0D1117]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-9 text-center font-mono text-sm font-semibold">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#0D1117]/60 hover:text-[#0D1117]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIncludeWoodCrate((v) => !v)}
                    className={`flex-1 py-3.5 px-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      includeWoodCrate
                        ? 'bg-white border-[#0D1117] text-[#0D1117]'
                        : 'bg-transparent border-[#0D1117]/15 text-[#0D1117]/50'
                    }`}
                  >
                    <span className="text-xs font-medium">Huacal de Madera</span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        includeWoodCrate ? 'bg-[#0D1117] text-white' : 'border border-[#0D1117]/30'
                      }`}
                    >
                      {includeWoodCrate && <Check className="w-2.5 h-2.5" />}
                    </span>
                  </button>
                </div>
              </div>
            </section>

            {/* STEP 04: MINIMALIST QUOTE FORM */}
            <form onSubmit={handleSaveAndSendWhatsApp} className="space-y-6 pt-2">
              <div className="flex items-baseline justify-between border-b border-[#0D1117]/[0.08] pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D1117]/45">
                  04 / Solicitar Cotización Formal
                </span>
                <span className="font-mono text-[11px] text-emerald-700">
                  Respuesta inmediata de ingeniería
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Nombre / Arquitecto / Especialista *"
                  className="py-3 bg-transparent border-b border-[#0D1117]/15 focus:border-[#0D1117] focus:outline-none text-sm text-[#0D1117] placeholder:text-[#0D1117]/35"
                />
                <input
                  type="text"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  placeholder="Hospital, Clínica o Constructora"
                  className="py-3 bg-transparent border-b border-[#0D1117]/15 focus:border-[#0D1117] focus:outline-none text-sm text-[#0D1117] placeholder:text-[#0D1117]/35"
                />
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="WhatsApp / Teléfono (10 dígitos) *"
                  className="py-3 bg-transparent border-b border-[#0D1117]/15 focus:border-[#0D1117] focus:outline-none text-sm text-[#0D1117] placeholder:text-[#0D1117]/35"
                />
                <input
                  type="text"
                  required
                  value={clientCity}
                  onChange={(e) => setClientCity(e.target.value)}
                  placeholder="Ciudad y Estado de entrega *"
                  className="py-3 bg-transparent border-b border-[#0D1117]/15 focus:border-[#0D1117] focus:outline-none text-sm text-[#0D1117] placeholder:text-[#0D1117]/35"
                />
              </div>

              {/* Total Summary + Primary CTA */}
              <div className="pt-4 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                      Inversión Estimada ({quantity} {quantity === 1 ? 'pieza' : 'piezas'})
                    </span>
                    <div
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="text-4xl font-extrabold tracking-tight text-[#0D1117] mt-0.5"
                    >
                      ${totalEstimatedMXN.toLocaleString('es-MX', { minimumFractionDigits: 2 })}{' '}
                      <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#0D1117]/40 font-normal">
                        MXN
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-[#0D1117]/45">
                    Flete en huacal asegurado
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-[#0D1117] hover:bg-[#0052FF] text-white text-xs font-mono uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2.5"
                >
                  <span>Enviar Especificación por WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {savedRecordId && (
                  <p className="font-mono text-xs text-emerald-700">
                    ✓ Configuración registrada con folio {savedRecordId}. Abriendo WhatsApp...
                  </p>
                )}
              </div>

              {/* Subtle Trust Guarantees */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#0D1117]/55">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
                  <span>Certificado NOM-229</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
                  <span>Huacal de madera</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
                  <span>Factura CFDI 4.0</span>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ===================================================================
            3. CLOSEST STANDARD SIZES IN STOCK (FRAMELESS GALLERY)
        =================================================================== */}
        <section className="mt-28 pt-14 border-t border-[#0D1117]/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0D1117]/40 block mb-2">
                ENTREGA INMEDIATA · ORIGEN {activeSpec.origin.toUpperCase()}
              </span>
              <h2
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-2xl sm:text-4xl tracking-[-0.025em] text-[#0D1117] uppercase"
              >
                <span className="font-extralight text-[#0D1117]/60">Medidas de línea </span>
                <span className="font-extrabold">en stock.</span>
              </h2>
            </div>

            <p className="text-xs text-[#0D1117]/50 max-w-sm font-light">
              Si tu obra permite ajustar el vano a una medida estándar, puedes ordenar con envío inmediato hoy mismo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {closestCatalogGlass.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="group cursor-pointer flex flex-col justify-between p-6 rounded-[24px] bg-white hover:shadow-[0_20px_50px_-20px_rgba(13,17,23,0.1)] transition-all"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#0D1117]/40 mb-4">
                  <span>{item.leadEquivalency}</span>
                  <span>SKU: {item.sku || 'STD'}</span>
                </div>

                <div className="h-40 flex items-center justify-center my-2">
                  <img
                    src="/products/orbit-01-vidrio.png"
                    alt={item.name}
                    className="max-h-36 object-contain drop-shadow-[0_18px_28px_rgba(13,17,23,0.14)] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="pt-4 border-t border-[#0D1117]/[0.06] flex items-end justify-between gap-3">
                  <div>
                    <h3
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="font-bold text-sm text-[#0D1117] group-hover:text-[#0052FF] transition-colors line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    <span
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="text-lg font-extrabold text-[#0D1117] mt-0.5 block"
                    >
                      ${item.basePrice.toLocaleString('es-MX')} MXN
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item);
                    }}
                    className="w-9 h-9 rounded-full bg-[#F7F7F4] group-hover:bg-[#0D1117] group-hover:text-white flex items-center justify-center transition-colors shrink-0"
                    aria-label="Agregar al carrito"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
