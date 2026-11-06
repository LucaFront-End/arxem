import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Check,
  ShieldCheck,
  Truck,
  FileCheck
} from 'lucide-react';
import { CATALOG_PRODUCTS, CatalogProduct } from '../data/catalogData';
import { saveQuoteToCMS, openWhatsAppWithQuote } from '../data/taxonomyData';

interface CustomShieldingLandingProps {
  onSelectProduct: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct, variantLabel?: string, price?: number) => void;
  onOpenCMSModal: () => void;
}

interface LeadSheetOption {
  id: string;
  thicknessMm: 1 | 1.5 | 2;
  dimensionsLabel: string;
  widthM: number;
  heightM: number;
  areaM2: number;
  weightKg: number;
  priceMXN: number;
  sku: string;
  recommendedUse: string;
}

// Exact prices & SKUs from ARXEM catalog
const LEAD_SHEET_OPTIONS: LeadSheetOption[] = [
  {
    id: 'LPE12',
    thicknessMm: 1,
    dimensionsLabel: '1.00 × 2.00 m · 1.0 mm Pb',
    widthM: 1.0,
    heightM: 2.0,
    areaM2: 2.0,
    weightKg: 24.0,
    priceMXN: 2942.16,
    sku: 'LPE12',
    recommendedUse: 'Rayos X Dental Periapical, Panorámico, Mamografía'
  },
  {
    id: 'LPE1210',
    thicknessMm: 1,
    dimensionsLabel: '1.00 × 2.10 m · 1.0 mm Pb (Altura COFEPRIS)',
    widthM: 1.0,
    heightM: 2.1,
    areaM2: 2.1,
    weightKg: 25.0,
    priceMXN: 3076.32,
    sku: 'LPE1210',
    recommendedUse: 'Gabinetes Dentales, Veterinarias y Muros Secundarios'
  },
  {
    id: 'LPE11',
    thicknessMm: 1.5,
    dimensionsLabel: '1.00 × 1.00 m · 1.5 mm Pb',
    widthM: 1.0,
    heightM: 1.0,
    areaM2: 1.0,
    weightKg: 18.0,
    priceMXN: 2316.08,
    sku: 'LPE11',
    recommendedUse: 'Puertas Blindadas, Marcos y Adecuaciones'
  },
  {
    id: 'LPE125',
    thicknessMm: 1.5,
    dimensionsLabel: '1.00 × 2.00 m · 1.5 mm Pb',
    widthM: 1.0,
    heightM: 2.0,
    areaM2: 2.0,
    weightKg: 36.0,
    priceMXN: 4298.32,
    sku: 'LPE125',
    recommendedUse: 'Salas de Rayos X Convencional y Fluoroscopía'
  },
  {
    id: 'LPE112',
    thicknessMm: 2,
    dimensionsLabel: '1.00 × 1.00 m · 2.0 mm Pb',
    widthM: 1.0,
    heightM: 1.0,
    areaM2: 1.0,
    weightKg: 24.0,
    priceMXN: 2942.16,
    sku: 'LPE112',
    recommendedUse: 'Puertas de Tomografía y Refuerzo de Barrera Primaria'
  },
  {
    id: 'LPE122',
    thicknessMm: 2,
    dimensionsLabel: '1.00 × 2.00 m · 2.0 mm Pb',
    widthM: 1.0,
    heightM: 2.0,
    areaM2: 2.0,
    weightKg: 48.0,
    priceMXN: 5655.52,
    sku: 'LPE122',
    recommendedUse: 'Salas de Rayos X Hospitalarias y Tomografía Axial (CT)'
  },
  {
    id: 'LPE12102',
    thicknessMm: 2,
    dimensionsLabel: '1.00 × 2.10 m · 2.0 mm Pb (Cero Empalme Vertical)',
    widthM: 1.0,
    heightM: 2.1,
    areaM2: 2.1,
    weightKg: 51.0,
    priceMXN: 5938.4,
    sku: 'LPE12102',
    recommendedUse: 'Tomografía (CT), Hemodinamia y Salas de Alto Flujo'
  },
  {
    id: 'LPE11210',
    thicknessMm: 2,
    dimensionsLabel: '1.10 × 2.10 m · 2.0 mm Pb (Máxima Cobertura con Traslape)',
    widthM: 1.1,
    heightM: 2.1,
    areaM2: 2.31,
    weightKg: 56.0,
    priceMXN: 6504.16,
    sku: 'LPE11210',
    recommendedUse: 'Proyectos Constructivos Hospitalarios Llave en Mano'
  }
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
 * Interactive 60fps 3D Isometric Radiology Bunker & Lead-Sheet Modulation Visualizer.
 * Dynamically scales perimeter, barrier height, lead sheet panels, overlap strips, and doors.
 */
const IsometricShieldingVisualizer: React.FC<{
  wallPerimeterM: number;
  shieldHeightM: number;
  doorsCount: number;
  thicknessMm: 1 | 1.5 | 2;
  sheetsRequired: number;
  includeOverlap: boolean;
  viewMode: StageMode;
}> = ({
  wallPerimeterM,
  shieldHeightM,
  doorsCount,
  thicknessMm,
  sheetsRequired,
  includeOverlap,
  viewMode
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labelPerimRef = useRef<HTMLDivElement | null>(null);
  const labelHeightRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 });

  const animRef = useRef({
    perimNorm: 1,
    heightNorm: 1,
    thickNorm: thicknessMm / 1.5,
    explode: 0.45,
    simTime: 0,
    lastNow: performance.now()
  });

  const propsRef = useRef({
    wallPerimeterM,
    shieldHeightM,
    doorsCount,
    thicknessMm,
    sheetsRequired,
    includeOverlap,
    viewMode
  });
  propsRef.current = {
    wallPerimeterM,
    shieldHeightM,
    doorsCount,
    thicknessMm,
    sheetsRequired,
    includeOverlap,
    viewMode
  };

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

      const {
        wallPerimeterM: perim,
        shieldHeightM: sHeight,
        doorsCount: doors,
        thicknessMm: thick,
        includeOverlap: hasOverlap,
        viewMode: vMode
      } = propsRef.current;

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

      // Smoothly interpolate room span & barrier height
      const targetPerim = Math.max(0.68, Math.min(1.22, 0.72 + (perim / 45) * 0.48));
      const targetHeight = Math.max(0.68, Math.min(1.32, sHeight / 2.2));
      const targetThick = thick * 0.75;

      let targetExplode = 0;
      if (vMode === 'exploded') targetExplode = 1;
      else if (vMode === 'assembled') targetExplode = 0;
      else {
        const cyc = (Math.sin(t * 0.85 - 0.3) + 1) * 0.5;
        targetExplode = Math.max(0, Math.min(1, (cyc - 0.25) * 1.65));
      }

      st.perimNorm += (targetPerim - st.perimNorm) * 0.1;
      st.heightNorm += (targetHeight - st.heightNorm) * 0.1;
      st.thickNorm += (targetThick - st.thickNorm) * 0.1;
      st.explode += (targetExplode - st.explode) * 0.08;

      const m = mouseRef.current;
      m.cx += (m.tx - m.cx) * 0.08;
      m.cy += (m.ty - m.cy) * 0.08;

      const yaw = Math.PI / 4 + Math.sin(t * 0.35) * 0.03 + m.cx * 0.22;
      const pitch = 0.54 + Math.cos(t * 0.3) * 0.015 + m.cy * 0.12;
      const scale = Math.min(W, H) * 0.0027;
      const centerX = W * 0.5;
      const centerY = H * 0.54;

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
      const floorY = -66;
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

      const span = 96 * st.perimNorm;
      const wallTop = -56 + 104 * st.heightNorm;
      const leadT = 5.5 * st.thickNorm;
      const wallLift = st.explode * 24;
      const doorSlide = st.explode * 42;

      const faces: PolyFace[] = [];

      // 1. Concrete Bunker Floor Slab & Structural Perimeter Walls
      faces.push(
        ...makeBox(-span - 12, span + 6, floorY, -56, -span - 12, span + 6, {
          top: '#FFFFFF',
          left: '#E2E8F0',
          right: '#CBD5E1',
          stroke: '#94A3B8',
          depthBias: -45
        }),
        ...makeBox(-span - 12, span, -56, wallTop, -span - 12, -span, {
          top: '#FFFFFF',
          left: '#E2E8F0',
          right: '#CBD5E1',
          stroke: '#94A3B8',
          depthBias: -32
        }),
        ...makeBox(-span - 12, -span, -56, wallTop, -span, span, {
          top: '#FFFFFF',
          left: '#CBD5E1',
          right: '#E2E8F0',
          stroke: '#94A3B8',
          depthBias: -32
        })
      );

      // 2. Modular 99.9% Electrolytic Lead Sheet Panels along Both Walls
      const panelsPerWall = Math.max(3, Math.min(7, Math.round(perim / 3.2)));
      const wallLen = span * 2 - 6;
      const panelW = wallLen / panelsPerWall;

      for (let i = 0; i < panelsPerWall; i++) {
        const pStart = -span + 2 + i * panelW;
        const pEnd = pStart + panelW - 1.5;

        // Back wall lead panel
        faces.push(
          ...makeBox(
            pStart,
            pEnd,
            -54 + wallLift,
            wallTop - 2 + wallLift,
            -span,
            -span + leadT,
            {
              top: '#475569',
              left: '#1E293B',
              right: '#0F172A',
              stroke: '#0052FF',
              strokeWidth: 1.2,
              depthBias: -16
            }
          )
        );

        // Left wall lead panel
        faces.push(
          ...makeBox(
            -span,
            -span + leadT,
            -54 + wallLift,
            wallTop - 2 + wallLift,
            pStart,
            pEnd,
            {
              top: '#475569',
              left: '#0F172A',
              right: '#1E293B',
              stroke: '#0052FF',
              strokeWidth: 1.2,
              depthBias: -16
            }
          )
        );

        // NOM-229 1.5cm Anti-Leak Overlap Strips between panels
        if (hasOverlap && i > 0) {
          faces.push(
            ...makeBox(
              pStart - 2.5,
              pStart + 2.5,
              -52 + wallLift * 1.22,
              wallTop + wallLift * 1.22,
              -span + leadT,
              -span + leadT + 2.5,
              {
                top: '#60A5FA',
                left: '#0052FF',
                right: '#1D4ED8',
                stroke: '#FFFFFF',
                depthBias: -10
              }
            ),
            ...makeBox(
              -span + leadT,
              -span + leadT + 2.5,
              -52 + wallLift * 1.22,
              wallTop + wallLift * 1.22,
              pStart - 2.5,
              pStart + 2.5,
              {
                top: '#60A5FA',
                left: '#0052FF',
                right: '#1D4ED8',
                stroke: '#FFFFFF',
                depthBias: -10
              }
            )
          );
        }
      }

      // Corner Anti-Leak L-Seam
      if (hasOverlap) {
        faces.push(
          ...makeBox(
            -span,
            -span + 10,
            -52 + wallLift * 1.25,
            wallTop + 2 + wallLift * 1.25,
            -span,
            -span + 10,
            {
              top: '#60A5FA',
              left: '#0052FF',
              right: '#1D4ED8',
              stroke: '#FFFFFF',
              depthBias: -9
            }
          )
        );
      }

      // 3. Shielded Sliding Door(s) in Foreground
      if (doors > 0) {
        faces.push(
          ...makeBox(-14 + doorSlide, 44 + doorSlide, -54, wallTop - 8, span - 6, span + 3, {
            top: '#334155',
            left: '#1E293B',
            right: '#0F172A',
            stroke: '#0052FF',
            strokeWidth: 1.4,
            depthBias: 24
          })
        );
      }
      if (doors >= 2) {
        faces.push(
          ...makeBox(span - 6, span + 3, -54, wallTop - 8, -28 + doorSlide * 0.7, 24 + doorSlide * 0.7, {
            top: '#334155',
            left: '#1E293B',
            right: '#0F172A',
            stroke: '#0052FF',
            strokeWidth: 1.3,
            depthBias: 22
          })
        );
      }

      // 4. Center CT / X-Ray Scanner Gantry inside Bunker
      faces.push(
        ...makeBox(-20, 20, -56, -40, -20, 20, {
          top: '#E2E8F0',
          left: '#CBD5E1',
          right: '#94A3B8',
          stroke: '#64748B',
          depthBias: 2
        }),
        ...makeHollowFrame(-10, 10, -40, 22, -30, 30, 10, {
          top: '#FFFFFF',
          left: '#E2E8F0',
          right: '#CBD5E1',
          stroke: '#0D1117',
          depthBias: 6
        }),
        ...makeBox(
          -34 + Math.sin(t * 1.3) * 10,
          44 + Math.sin(t * 1.3) * 10,
          -20,
          -14,
          -9,
          9,
          {
            top: '#60A5FA',
            left: '#2563EB',
            right: '#1D4ED8',
            stroke: '#FFFFFF',
            depthBias: 10
          }
        )
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

      // Contained Radial X-Ray Wave inside Bunker
      const p = (t * 0.75) % 1;
      const rad = 16 + p * (span * 0.78);
      ctx.save();
      ctx.strokeStyle = `rgba(0, 82, 255, ${(1 - p) * 0.65})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let a = 0; a <= 36; a++) {
        const ang = (a / 36) * Math.PI * 2;
        const wx = Math.max(-span + 10, Math.min(span - 10, Math.cos(ang) * rad));
        const wz = Math.max(-span + 10, Math.min(span - 10, Math.sin(ang) * rad));
        const pt = project({ x: wx, y: -22, z: wz });
        if (a === 0) ctx.moveTo(pt.sx, pt.sy);
        else ctx.lineTo(pt.sx, pt.sy);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      // Update 3D-Projected Labels
      const perimAnchor = project({ x: 0, y: wallTop + 14 + wallLift, z: -span });
      const heightAnchor = project({ x: -span - 16, y: (wallTop - 56) * 0.5, z: 0 });

      if (labelPerimRef.current) {
        labelPerimRef.current.style.transform = `translate3d(${perimAnchor.sx.toFixed(1)}px, ${perimAnchor.sy.toFixed(1)}px, 0)`;
      }
      if (labelHeightRef.current) {
        labelHeightRef.current.style.transform = `translate3d(${heightAnchor.sx.toFixed(1)}px, ${heightAnchor.sy.toFixed(1)}px, 0)`;
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

      {/* 3D Projected Dimension Callout Pills */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={labelPerimRef}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-white/95 border border-[#0D1117]/12 font-mono text-[10px] font-semibold text-[#0D1117] shadow-sm whitespace-nowrap"
        >
          Perímetro: {wallPerimeterM} m · {sheetsRequired} placas
        </div>
        <div
          ref={labelHeightRef}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-white/95 border border-[#0D1117]/12 font-mono text-[10px] font-semibold text-[#0D1117] shadow-sm whitespace-nowrap"
        >
          Altura: {shieldHeightM} m
        </div>
      </div>
    </div>
  );
};

export const CustomShieldingLanding: React.FC<CustomShieldingLandingProps> = ({
  onSelectProduct,
  onAddToCart
}) => {
  const [wallPerimeterM, setWallPerimeterM] = useState<number>(14);
  const [shieldHeightM, setShieldHeightM] = useState<number>(2.1); // Standard 2.10m NOM-229
  const [doorsCount, setDoorsCount] = useState<number>(1);
  const [selectedThickness, setSelectedThickness] = useState<1 | 1.5 | 2>(2);
  const [selectedSheetId, setSelectedSheetId] = useState<string>('LPE11210');
  const [includeOverlap, setIncludeOverlap] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<StageMode>('auto');
  const [roomFacilityType] = useState<string>('Sala de Rayos X / Tomografía Hospitalaria');

  // Client Lead Form
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [savedRecordId, setSavedRecordId] = useState<string | null>(null);

  const matchingSheets = LEAD_SHEET_OPTIONS.filter((s) => s.thicknessMm === selectedThickness);
  const activeSheet =
    LEAD_SHEET_OPTIONS.find((s) => s.id === selectedSheetId) ||
    matchingSheets[0] ||
    LEAD_SHEET_OPTIONS[0];

  // Engineering calculations
  const wallsAreaM2 = wallPerimeterM * shieldHeightM;
  const doorsAreaM2 = doorsCount * 2.1; // ~1.0m x 2.1m per door
  const netAreaM2 = wallsAreaM2 + doorsAreaM2;
  const overlapFactor = includeOverlap ? 1.08 : 1.0; // +8% overlap for 1.5cm joints per NOM-229
  const grossAreaM2 = netAreaM2 * overlapFactor;

  const sheetsRequired = Math.max(1, Math.ceil(grossAreaM2 / activeSheet.areaM2));
  const totalWeightKg = Number((sheetsRequired * activeSheet.weightKg).toFixed(1));
  const totalInvestmentMXN = Number((sheetsRequired * activeSheet.priceMXN).toFixed(2));

  const catalogLeadSheets = CATALOG_PRODUCTS.filter((p) => p.storePillar === 'blindaje');

  const handleThicknessSelect = (t: 1 | 1.5 | 2) => {
    setSelectedThickness(t);
    const firstForThickness = LEAD_SHEET_OPTIONS.find((s) => s.thicknessMm === t);
    if (firstForThickness) setSelectedSheetId(firstForThickness.id);
  };

  const handleSaveAndSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const nameToUse = clientName.trim() || 'Ingeniero / Arquitecto de Obra';
    const companyToUse = clientCompany.trim() || 'Constructora / Hospital';
    const cityToUse = clientCity.trim() || 'México';

    const record = saveQuoteToCMS({
      type: 'BLINDAJE_PERSONALIZADO',
      clientName: nameToUse,
      clientCompany: companyToUse,
      clientPhone: clientPhone.trim() || 'WhatsApp Directo',
      clientCity: cityToUse,
      summary: `${sheetsRequired} Láminas de Plomo (${activeSheet.dimensionsLabel}) para ${grossAreaM2.toFixed(1)} m²`,
      specs: {
        perimetroLinealM: wallPerimeterM,
        alturaBlindajeM: shieldHeightM,
        puertasBlindadas: doorsCount,
        areaNetaM2: Number(netAreaM2.toFixed(2)),
        areaConTraslapeM2: Number(grossAreaM2.toFixed(2)),
        espesorPlomoMm: activeSheet.thicknessMm,
        formatoLamina: activeSheet.dimensionsLabel,
        skuLamina: activeSheet.sku,
        cantidadLaminas: sheetsRequired,
        pesoTotalKg: totalWeightKg,
        tipoSala: roomFacilityType
      },
      estimatedTotalMXN: totalInvestmentMXN,
      status: 'ENVIADO_WHATSAPP'
    });

    setSavedRecordId(record.id);

    const whatsappMsg = [
      `Hola *ARXEM®*, realicé el cálculo de *Blindaje Radiológico Estructural* en su sitio web:`,
      ``,
      `🛡️ *EXPLOSIÓN DE INSUMOS DE BLINDAJE (FOLIO: ${record.id})*`,
      `• *Perímetro de Muros:* ${wallPerimeterM} m lineales × ${shieldHeightM} m de altura`,
      `• *Puertas a Blindar:* ${doorsCount}`,
      `• *Área Total (con traslape NOM-229):* ${grossAreaM2.toFixed(2)} m²`,
      `• *Lámina Seleccionada:* ${activeSheet.dimensionsLabel} (SKU: ${activeSheet.sku})`,
      `• *Cantidad Exacta Requerida:* ${sheetsRequired} láminas de plomo (Pureza 99.9%)`,
      `• *Peso Total del Plomo:* ${totalWeightKg.toLocaleString('es-MX')} kg`,
      `• *Inversión Total en Lámina:* $${totalInvestmentMXN.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`,
      ``,
      `👤 *DATOS DE CONTACTO:*`,
      `• *Nombre:* ${nameToUse}`,
      `• *Constructora / Clínica:* ${companyToUse}`,
      `• *Ciudad de Obra:* ${cityToUse}`,
      `• *Teléfono:* ${clientPhone || 'Este número'}`,
      ``,
      `¿Me confirman existencias y costo de flete para envío a obra?`
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
                02 — INGENIERÍA DE BLINDAJE ESTRUCTURAL · PUREZA 99.9% PB
              </span>
            </div>

            <h1
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-4xl sm:text-6xl lg:text-[64px] leading-[0.94] tracking-[-0.035em] uppercase text-[#0D1117]"
            >
              <span className="font-extralight block text-[#0D1117]/55">
                Blindaje en Plomo
              </span>
              <span className="font-extrabold block mt-1">
                Calculadora 3D.
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#0D1117]/60 max-w-md font-light leading-relaxed">
            Cuantifica la cantidad exacta de láminas de plomo electrolítico (1.0 mm, 1.5 mm y 2.0 mm) para muros, puertas y búnkeres radiológicos bajo la norma NOM-229-SSA1.
          </p>
        </header>

        {/* ===================================================================
            2. SPLIT-SCREEN WORKSPACE (LEFT 3D STAGE + RIGHT FRAMELESS CONTROLS)
        =================================================================== */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ─── LEFT STICKY 3D ISOMETRIC BUNKER STAGE (Cols 1-6) ─── */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-6">
            <div className="relative aspect-[4/3.5] rounded-[28px] bg-white overflow-hidden">
              {/* Top-Left Live Spec Tag */}
              <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0D1117]/40">
                  MODULACIÓN ISOMÉTRICA 3D · SKU {activeSheet.sku}
                </div>
                <div
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-lg font-extrabold text-[#0D1117] mt-0.5"
                >
                  {sheetsRequired} Láminas de {activeSheet.thicknessMm} mm Pb{' '}
                  <span className="font-light text-[#0D1117]/45 text-sm">
                    ({grossAreaM2.toFixed(1)} m²)
                  </span>
                </div>
              </div>

              {/* Top-Right View Mode Switcher */}
              <div className="absolute top-5 right-5 z-20 inline-flex p-1 rounded-full bg-[#F7F7F4] border border-[#0D1117]/[0.08]">
                {(
                  [
                    { id: 'auto' as StageMode, label: 'Ciclo' },
                    { id: 'exploded' as StageMode, label: 'Despiece' },
                    { id: 'assembled' as StageMode, label: 'Búnker' }
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

              {/* Interactive 60fps 3D Isometric Bunker Canvas */}
              <IsometricShieldingVisualizer
                wallPerimeterM={wallPerimeterM}
                shieldHeightM={shieldHeightM}
                doorsCount={doorsCount}
                thicknessMm={selectedThickness}
                sheetsRequired={sheetsRequired}
                includeOverlap={includeOverlap}
                viewMode={viewMode}
              />

              {/* Bottom Physics Legend inside Canvas */}
              <div className="pointer-events-none absolute bottom-5 inset-x-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#0D1117]/45">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
                    Traslape 1.5 cm Anti-Fuga
                  </span>
                  <span>Exterior: 0.00 µSv/h</span>
                </div>
                <span className="text-[#0052FF] font-semibold">
                  99.9% Pureza Pb
                </span>
              </div>
            </div>

            {/* Minimalist Hairline Telemetry Readout Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-b border-[#0D1117]/[0.08] py-5 gap-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                  Área c/ Traslape
                </span>
                <span
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-lg font-extrabold text-[#0D1117] mt-1 block"
                >
                  {grossAreaM2.toFixed(2)} m²
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                  Placas Exactas
                </span>
                <span
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-lg font-extrabold text-[#0052FF] mt-1 block"
                >
                  {sheetsRequired} pzas
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                  Peso Total Pb
                </span>
                <span
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-lg font-extrabold text-[#0D1117] mt-1 block"
                >
                  {totalWeightKg.toLocaleString('es-MX')} kg
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                  Inversión Plomo
                </span>
                <span
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-lg font-extrabold text-[#0D1117] mt-1 block"
                >
                  ${totalInvestmentMXN.toLocaleString('es-MX')}
                </span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT FRAMELESS CONFIGURATION STEPS (Cols 7-12) ─── */}
          <div className="lg:col-span-6 space-y-12">
            {/* STEP 01: WALL PERIMETER, HEIGHT & DOORS */}
            <section className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#0D1117]/[0.08] pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D1117]/45">
                  01 / Dimensiones de Muros y Puertas
                </span>
                <span className="font-mono text-[11px] text-[#0052FF]">
                  Altura mínima COFEPRIS: 2.10 m
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2">
                {/* Perimeter */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <label className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0D1117]/55">
                      Perímetro
                    </label>
                    <div className="flex items-baseline gap-1">
                      <input
                        type="number"
                        min={1}
                        max={200}
                        step={0.5}
                        value={wallPerimeterM}
                        onChange={(e) => setWallPerimeterM(parseFloat(e.target.value) || 4)}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="w-16 text-right bg-transparent border-b border-[#0D1117]/20 focus:border-[#0052FF] focus:outline-none text-2xl font-extrabold text-[#0D1117]"
                      />
                      <span className="font-mono text-xs text-[#0D1117]/40">m</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={60}
                    step={0.5}
                    value={wallPerimeterM}
                    onChange={(e) => setWallPerimeterM(parseFloat(e.target.value) || 4)}
                    className="w-full accent-[#0D1117] cursor-pointer h-1 bg-[#0D1117]/15 rounded-lg"
                  />
                </div>

                {/* Height */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <label className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0D1117]/55">
                      Altura
                    </label>
                    <div className="flex items-baseline gap-1">
                      <input
                        type="number"
                        min={1}
                        max={6}
                        step={0.1}
                        value={shieldHeightM}
                        onChange={(e) => setShieldHeightM(parseFloat(e.target.value) || 2.1)}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="w-16 text-right bg-transparent border-b border-[#0D1117]/20 focus:border-[#0052FF] focus:outline-none text-2xl font-extrabold text-[#0D1117]"
                      />
                      <span className="font-mono text-xs text-[#0D1117]/40">m</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1.5}
                    max={3.5}
                    step={0.1}
                    value={shieldHeightM}
                    onChange={(e) => setShieldHeightM(parseFloat(e.target.value) || 2.1)}
                    className="w-full accent-[#0D1117] cursor-pointer h-1 bg-[#0D1117]/15 rounded-lg"
                  />
                </div>

                {/* Doors */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <label className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0D1117]/55">
                      Puertas
                    </label>
                    <div className="flex items-baseline gap-1">
                      <input
                        type="number"
                        min={0}
                        max={20}
                        step={1}
                        value={doorsCount}
                        onChange={(e) => setDoorsCount(parseInt(e.target.value) || 0)}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="w-14 text-right bg-transparent border-b border-[#0D1117]/20 focus:border-[#0052FF] focus:outline-none text-2xl font-extrabold text-[#0D1117]"
                      />
                      <span className="font-mono text-xs text-[#0D1117]/40">pza</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={6}
                    step={1}
                    value={doorsCount}
                    onChange={(e) => setDoorsCount(parseInt(e.target.value) || 0)}
                    className="w-full accent-[#0D1117] cursor-pointer h-1 bg-[#0D1117]/15 rounded-lg"
                  />
                </div>
              </div>

              {/* Minimalist Overlap Toggle */}
              <button
                type="button"
                onClick={() => setIncludeOverlap((v) => !v)}
                className="w-full pt-2 flex items-center justify-between text-left group"
              >
                <span className="text-xs text-[#0D1117]/65 group-hover:text-[#0D1117] transition-colors">
                  Incluir <strong className="font-semibold text-[#0D1117]">+8% de traslape anti-fuga (1.5 cm entre láminas)</strong> exigido por NOM-229-SSA1
                </span>
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors shrink-0 ml-3 ${
                    includeOverlap ? 'bg-[#0D1117] text-white' : 'border border-[#0D1117]/25'
                  }`}
                >
                  {includeOverlap && <Check className="w-3 h-3" />}
                </span>
              </button>
            </section>

            {/* STEP 02: THICKNESS & SHEET FORMAT */}
            <section className="space-y-5">
              <div className="flex items-baseline justify-between border-b border-[#0D1117]/[0.08] pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D1117]/45">
                  02 / Espesor Certificado y Formato de Placa
                </span>
                <span className="font-mono text-[11px] text-[#0D1117]/40">
                  Plomo Electrolítico 99.9%
                </span>
              </div>

              {/* 3 Minimalist Thickness Selector Pills */}
              <div className="grid grid-cols-3 gap-3">
                {([1, 1.5, 2] as const).map((t) => {
                  const active = selectedThickness === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleThicknessSelect(t)}
                      className={`py-4 px-4 rounded-2xl text-left transition-all ${
                        active
                          ? 'bg-[#0D1117] text-white'
                          : 'bg-white text-[#0D1117] hover:bg-white/80'
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.14em] block ${
                          active ? 'text-white/55' : 'text-[#0D1117]/40'
                        }`}
                      >
                        {t === 1 ? 'Dental / Mamo' : t === 1.5 ? 'Rayos X' : 'Tomografía CT'}
                      </span>
                      <span
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="text-2xl font-extrabold block mt-0.5"
                      >
                        {t} mm Pb
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Hairline List of Sheet Formats for Selected Thickness */}
              <div className="divide-y divide-[#0D1117]/[0.08] border-t border-b border-[#0D1117]/[0.08]">
                {matchingSheets.map((sheet) => {
                  const isSelected = sheet.id === activeSheet.id;
                  return (
                    <button
                      key={sheet.id}
                      type="button"
                      onClick={() => setSelectedSheetId(sheet.id)}
                      className={`w-full py-4 px-4 text-left transition-all flex items-center justify-between gap-4 rounded-2xl ${
                        isSelected
                          ? 'bg-[#0052FF] text-white my-1'
                          : 'hover:bg-white/70 text-[#0D1117]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                          className="font-bold text-base"
                        >
                          {sheet.dimensionsLabel}
                        </div>
                        <div
                          className={`font-mono text-[11px] ${
                            isSelected ? 'text-white/80' : 'text-[#0D1117]/45'
                          }`}
                        >
                          SKU: {sheet.sku} · {sheet.weightKg} kg/placa · {sheet.recommendedUse}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                          className="font-extrabold text-base block"
                        >
                          ${sheet.priceMXN.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </span>
                        <span
                          className={`font-mono text-[10px] ${
                            isSelected ? 'text-white/75' : 'text-[#0D1117]/40'
                          }`}
                        >
                          MXN / placa
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 03: MINIMALIST QUOTE FORM */}
            <form onSubmit={handleSaveAndSendWhatsApp} className="space-y-6 pt-2">
              <div className="flex items-baseline justify-between border-b border-[#0D1117]/[0.08] pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D1117]/45">
                  03 / Recibir Explosión de Insumos y Cotización
                </span>
                <span className="font-mono text-[11px] text-emerald-700">
                  Envío nacional a obra
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Nombre / Ingeniero / Arquitecto *"
                  className="py-3 bg-transparent border-b border-[#0D1117]/15 focus:border-[#0D1117] focus:outline-none text-sm text-[#0D1117] placeholder:text-[#0D1117]/35"
                />
                <input
                  type="text"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  placeholder="Constructora, Hospital o Clínica"
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
                  placeholder="Ciudad de entrega de obra *"
                  className="py-3 bg-transparent border-b border-[#0D1117]/15 focus:border-[#0D1117] focus:outline-none text-sm text-[#0D1117] placeholder:text-[#0D1117]/35"
                />
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40 block">
                      Total por {sheetsRequired} láminas ({totalWeightKg.toLocaleString('es-MX')} kg de plomo)
                    </span>
                    <div
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="text-4xl font-extrabold tracking-tight text-[#0D1117] mt-0.5"
                    >
                      ${totalInvestmentMXN.toLocaleString('es-MX', { minimumFractionDigits: 2 })}{' '}
                      <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#0D1117]/40 font-normal">
                        MXN
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-[#0D1117]/45">
                    SKU: {activeSheet.sku}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-[#0D1117] hover:bg-[#0052FF] text-white text-xs font-mono uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2.5"
                >
                  <span>Enviar Cuantificación por WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {savedRecordId && (
                  <p className="font-mono text-xs text-emerald-700">
                    ✓ Explosión de insumos registrada con folio {savedRecordId}. Abriendo WhatsApp...
                  </p>
                )}
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#0D1117]/55">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
                  <span>Plomo 99.9% certificado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
                  <span>Envío a los 32 estados</span>
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
            3. DIRECT CATALOG LEAD SHEETS (FRAMELESS GALLERY)
        =================================================================== */}
        <section className="mt-28 pt-14 border-t border-[#0D1117]/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0D1117]/40 block mb-2">
                INVENTARIO EN PLANTA · PLOMO ELECTROLÍTICO
              </span>
              <h2
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-2xl sm:text-4xl tracking-[-0.025em] text-[#0D1117] uppercase"
              >
                <span className="font-extralight text-[#0D1117]/60">Láminas por rollo </span>
                <span className="font-extrabold">en stock.</span>
              </h2>
            </div>

            <p className="text-xs text-[#0D1117]/50 max-w-sm font-light">
              Selecciona cualquier espesor del catálogo general para compra directa por placa o rollo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {catalogLeadSheets.slice(0, 3).map((sheetProd) => (
              <div
                key={sheetProd.id}
                onClick={() => onSelectProduct(sheetProd)}
                className="group cursor-pointer flex flex-col justify-between p-6 rounded-[24px] bg-white hover:shadow-[0_20px_50px_-20px_rgba(13,17,23,0.1)] transition-all"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#0D1117]/40 mb-4">
                  <span>{sheetProd.leadEquivalency}</span>
                  <span>SKU: {sheetProd.sku || 'LPE'}</span>
                </div>

                <div className="h-40 flex items-center justify-center my-2">
                  <img
                    src="/products/orbit-02-lamina.png"
                    alt={sheetProd.name}
                    className="max-h-36 object-contain drop-shadow-[0_18px_28px_rgba(13,17,23,0.14)] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="pt-4 border-t border-[#0D1117]/[0.06] flex items-end justify-between gap-3">
                  <div>
                    <h3
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="font-bold text-sm text-[#0D1117] group-hover:text-[#0052FF] transition-colors line-clamp-1"
                    >
                      {sheetProd.name}
                    </h3>
                    <span
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="text-lg font-extrabold text-[#0D1117] mt-0.5 block"
                    >
                      ${sheetProd.basePrice.toLocaleString('es-MX')} MXN
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(sheetProd);
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
