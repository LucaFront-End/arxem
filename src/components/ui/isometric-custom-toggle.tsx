"use client";

/**
 * ARXEM Minimalist Custom Engineering Toggle & 3D Isometric Hotspot Stage.
 *
 * Light-theme (#F7F7F4) architectural stage with:
 * - 3 simulation modes: "Ciclo Vivo" (auto), "Despiece" (exploded), "Prueba RX" (assembled test)
 * - Real-time 3D-projected interactive Hotspot Dots pinned directly to the 3D layers.
 *   By default, only subtle numbered dots appear on the 3D model (zero clutter).
 *   Hovering or clicking a dot highlights that exact 3D layer and reveals its minimalist tooltip.
 */

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Layers, Maximize2, Play, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type CustomToggleMode = "vidrio" | "blindaje";
export type StageViewMode = "auto" | "exploded" | "assembled";

interface PresetOption {
  id: string;
  label: string;
  sublabel: string;
  pbEquiv: string;
  dimensions: string;
  weightSpec: string;
  thicknessFactor: number;
}

const VIDRIO_PRESETS: PresetOption[] = [
  {
    id: "8mm",
    label: "8 mm",
    sublabel: "Consultorio Dental / Periapical",
    pbEquiv: "1.9 mm Pb",
    dimensions: "80 × 60 cm (Personalizable)",
    weightSpec: "38 kg/m² · Transmisión >87%",
    thicknessFactor: 0.72,
  },
  {
    id: "10mm",
    label: "10 mm",
    sublabel: "Sala Rayos X General",
    pbEquiv: "2.1 mm Pb",
    dimensions: "100 × 80 cm (Personalizable)",
    weightSpec: "48 kg/m² · Silicato PbO",
    thicknessFactor: 1.0,
  },
  {
    id: "12mm",
    label: "12 mm",
    sublabel: "Tomografía CT / Hemodinamia",
    pbEquiv: "2.6 mm Pb",
    dimensions: "120 × 80 cm (Personalizable)",
    weightSpec: "58 kg/m² · NOM-229-SSA1",
    thicknessFactor: 1.38,
  },
];

const BLINDAJE_PRESETS: PresetOption[] = [
  {
    id: "1.6mm",
    label: '1/16" (1.6 mm)',
    sublabel: "Sala Rayos X / Mastografía",
    pbEquiv: "1.6 mm Pb · 99.9% Pureza",
    dimensions: "Rollo 1.00 × 2.00 m",
    weightSpec: "18.1 kg/m² · Plomo Electrolítico",
    thicknessFactor: 0.78,
  },
  {
    id: "2.4mm",
    label: '3/32" (2.4 mm)',
    sublabel: "Tomografía Axial (CT)",
    pbEquiv: "2.4 mm Pb · 99.9% Pureza",
    dimensions: "Muros + Puerta Blindada",
    weightSpec: "27.2 kg/m² · Certificación COFEPRIS",
    thicknessFactor: 1.1,
  },
  {
    id: "3.2mm",
    label: '1/8" (3.2 mm)',
    sublabel: "Búnker / Quirófano Híbrido",
    pbEquiv: "3.2 mm Pb · 99.9% Pureza",
    dimensions: "Blindaje Integral 360°",
    weightSpec: "36.3 kg/m² · Grado Hospitalario",
    thicknessFactor: 1.48,
  },
];

interface HotspotMeta {
  layerId: number;
  code: string;
  title: string;
  detail: string;
  metric: string;
}

const VIDRIO_HOTSPOTS: HotspotMeta[] = [
  {
    layerId: 0,
    code: "01",
    title: "Sub-marco Telescópico",
    detail: "Acero estructural anclado al vano del muro divisorio.",
    metric: "Acero Cal. 14",
  },
  {
    layerId: 1,
    code: "02",
    title: "Sello Perimetral Pb",
    detail: "Empaque emplomado continuo que evita fugas en el borde.",
    metric: "Solape 100% Hermético",
  },
  {
    layerId: 2,
    code: "03",
    title: "Cristal Silicato PbO",
    detail: "Núcleo óptico de alta densidad (55% PbO) que frena los Rayos X.",
    metric: ">85% Luz · 0% RX",
  },
  {
    layerId: 3,
    code: "04",
    title: "Contramarco Inox 304",
    detail: "Bisel sanitario en acero inoxidable cepillado grado hospitalario.",
    metric: "Inox 304 Quirúrgico",
  },
];

const BLINDAJE_HOTSPOTS: HotspotMeta[] = [
  {
    layerId: 0,
    code: "01",
    title: "Muro & Bastidor Base",
    detail: "Estructura portante perimetral de la sala radiológica.",
    metric: "Soporte Estructural",
  },
  {
    layerId: 1,
    code: "02",
    title: "Lámina de Plomo 99.9%",
    detail: "Revestimiento continuo de plomo electrolítico de alta pureza.",
    metric: "Densidad 11.34 g/cm³",
  },
  {
    layerId: 2,
    code: "03",
    title: "Traslape Anti-Fuga 5 cm",
    detail: "Solape sellado entre rollos y esquineros para cero filtración.",
    metric: "Norma NOM-229-SSA1",
  },
  {
    layerId: 3,
    code: "04",
    title: "Puerta & Visor Blindado",
    detail: "Cerramiento corredizo emplomado con mirilla de control.",
    metric: "Exterior 0.00 µSv/h",
  },
];

interface IsometricCustomToggleProps {
  onNavigate: (
    route: "vidrio-personalizado" | "blindaje-personalizado"
  ) => void;
  onOpenWhatsApp?: (summary: string) => void;
}

export function IsometricCustomToggle({
  onNavigate,
  onOpenWhatsApp,
}: IsometricCustomToggleProps) {
  const [mode, setMode] = useState<CustomToggleMode>("vidrio");
  const [viewMode, setViewMode] = useState<StageViewMode>("auto");
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [vidrioPresetIdx, setVidrioPresetIdx] = useState<number>(2);
  const [blindajePresetIdx, setBlindajePresetIdx] = useState<number>(1);

  const presets = mode === "vidrio" ? VIDRIO_PRESETS : BLINDAJE_PRESETS;
  const activePresetIdx =
    mode === "vidrio" ? vidrioPresetIdx : blindajePresetIdx;
  const activePreset = presets[activePresetIdx] ?? presets[0];
  const hotspotsMeta = mode === "vidrio" ? VIDRIO_HOTSPOTS : BLINDAJE_HOTSPOTS;

  return (
    <section
      style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
      className="relative py-24 lg:py-32 bg-white border-b border-[#0D1117]/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
        {/* ─── Top Minimalist Editorial Header + Mode Toggle Switcher ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#0D1117]/45 mb-3">
              05 — INGENIERÍA A MEDIDA
            </p>
            <h2 className="text-4xl sm:text-6xl leading-[0.94] tracking-[-0.03em] uppercase text-[#0D1117]">
              <span className="font-extralight block text-[#0D1117]/70">
                Configuración
              </span>
              <span className="font-extrabold block mt-1">
                Personalizada.
              </span>
            </h2>
          </div>

          {/* Minimalist Segmented Toggle Pill */}
          <div
            role="tablist"
            aria-label="Seleccionar calculadora a medida"
            className="relative inline-flex p-1.5 rounded-full bg-[#F7F7F4] border border-[#0D1117]/10 self-start lg:self-auto"
          >
            {(
              [
                {
                  id: "vidrio" as CustomToggleMode,
                  num: "01",
                  label: "Vidrio Emplomado",
                },
                {
                  id: "blindaje" as CustomToggleMode,
                  num: "02",
                  label: "Blindaje de Sala",
                },
              ] as const
            ).map((tab) => {
              const active = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setMode(tab.id);
                    setActiveHotspot(null);
                  }}
                  className={cn(
                    "relative z-10 px-5 sm:px-7 py-3 rounded-full text-xs uppercase tracking-[0.1em] transition-colors duration-300 flex items-center gap-2",
                    active
                      ? "text-white font-bold"
                      : "text-[#0D1117]/60 hover:text-[#0D1117] font-medium"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="arxem-iso-toggle-pill"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 28,
                      }}
                      className="absolute inset-0 rounded-full bg-[#0D1117] -z-10 shadow-sm"
                    />
                  )}
                  <span
                    className={cn(
                      "font-mono text-[10px]",
                      active ? "text-[#60A5FA]" : "opacity-45"
                    )}
                  >
                    {tab.num}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Main 12-Column Split: Light 3D Isometric Hotspot Stage + Minimalist Details ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ─── LEFT (7 cols): Light-Theme 3D Isometric Stage with Interactive Hotspots ─── */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[32px] border border-[#0D1117]/10 bg-[#F7F7F4] p-6 sm:p-8 overflow-hidden shadow-[0_24px_60px_-35px_rgba(13,17,23,0.07)]">
              {/* Top Minimalist Bar: Caption + 3-Mode Switcher (Ciclo Vivo / Despiece / Prueba RX) */}
              <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#0D1117]/[0.07]">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-[#0D1117]/50">
                  {mode === "vidrio"
                    ? `01 / VISOR DE CONSOLA · ${activePreset.pbEquiv}`
                    : `02 / BÚNKER RADIOLÓGICO · ${activePreset.pbEquiv}`}
                </span>

                <div className="inline-flex items-center rounded-full bg-white p-1 border border-[#0D1117]/10">
                  {(
                    [
                      { id: "auto" as StageViewMode, label: "Ciclo Vivo", icon: Play },
                      { id: "exploded" as StageViewMode, label: "Capas", icon: Maximize2 },
                      { id: "assembled" as StageViewMode, label: "Prueba RX", icon: ShieldCheck },
                    ] as const
                  ).map((vm) => {
                    const Icon = vm.icon;
                    const active = viewMode === vm.id;
                    return (
                      <button
                        key={vm.id}
                        type="button"
                        onClick={() => setViewMode(vm.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.1em] transition-all",
                          active
                            ? "bg-[#0D1117] text-white font-semibold"
                            : "text-[#0D1117]/55 hover:text-[#0D1117]"
                        )}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{vm.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 60FPS Light-Theme 3D Isometric Canvas + Minimalist Floating Hotspot Dots */}
              <div className="relative w-full h-[390px] sm:h-[440px] flex items-center justify-center">
                <IsometricHotspotStage
                  mode={mode}
                  viewMode={viewMode}
                  preset={activePreset}
                  hotspotsMeta={hotspotsMeta}
                  activeHotspot={activeHotspot}
                  onSelectHotspot={setActiveHotspot}
                />
              </div>

              {/* Bottom Minimalist Bar: Hint + Calibre Pills */}
              <div className="relative z-20 pt-4 border-t border-[#0D1117]/[0.07] flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0D1117]/45">
                  <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-pulse" />
                  Explora los puntos para inspeccionar cada capa
                </span>

                <div className="flex items-center gap-1.5">
                  {presets.map((p, idx) => {
                    const isSelected = idx === activePresetIdx;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() =>
                          mode === "vidrio"
                            ? setVidrioPresetIdx(idx)
                            : setBlindajePresetIdx(idx)
                        }
                        className={cn(
                          "px-3.5 py-1.5 rounded-full font-mono text-[11px] transition-all",
                          isSelected
                            ? "bg-[#0D1117] text-white font-semibold shadow-sm"
                            : "bg-white/80 hover:bg-white text-[#0D1117]/60 border border-[#0D1117]/8"
                        )}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ─── RIGHT (5 cols): Minimalist Editorial Details & Direct Calculator CTA ─── */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-7"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#0052FF] mb-3">
                    {mode === "vidrio"
                      ? "01 / SILICATO DE PLOMO ÓPTICO"
                      : "02 / PROTECCIÓN ESTRUCTURAL NOM-229"}
                  </p>

                  <h3 className="text-3xl sm:text-5xl uppercase leading-[0.94] tracking-[-0.03em] text-[#0D1117]">
                    {mode === "vidrio" ? (
                      <>
                        <span className="font-extralight block text-[#0D1117]/70">
                          Vidrio Emplomado
                        </span>
                        <span className="font-extrabold block mt-1">
                          A Medida.
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-extralight block text-[#0D1117]/70">
                          Blindaje de Sala
                        </span>
                        <span className="font-extrabold block mt-1">
                          Estructural.
                        </span>
                      </>
                    )}
                  </h3>
                </div>

                <p className="text-[15px] text-[#0D1117]/65 leading-relaxed">
                  {mode === "vidrio"
                    ? "Configura el ancho y alto exacto para mirillas y ventanas de consola. Nuestro cristal de óxido de plomo (PbO 55%) bloquea la radiación dispersa manteniendo más del 85% de transmisión visual."
                    : "Dimensiona muros, puertas y cabinas de Rayos X o Tomografía. Calculamos m² totales, traslape anti-fuga de 5 cm y cantidad exacta de rollos de plomo electrolítico al 99.9%."}
                </p>

                {/* Minimalist 3-Row Hairline Spec */}
                <div className="border-y border-[#0D1117]/12 divide-y divide-[#0D1117]/10">
                  <div className="py-3.5 flex items-center justify-between text-sm">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#0D1117]/45">
                      Equivalencia Pb
                    </span>
                    <span className="font-mono font-semibold text-[#0D1117]">
                      {activePreset.pbEquiv}
                    </span>
                  </div>

                  <div className="py-3.5 flex items-center justify-between text-sm">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#0D1117]/45">
                      Aplicación
                    </span>
                    <span className="font-medium text-[#0D1117]">
                      {activePreset.sublabel}
                    </span>
                  </div>

                  <div className="py-3.5 flex items-center justify-between text-sm">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#0D1117]/45">
                      Especificación
                    </span>
                    <span className="font-mono text-xs text-[#0D1117]/80">
                      {activePreset.weightSpec}
                    </span>
                  </div>
                </div>

                {/* Primary & Secondary Actions */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate(
                        mode === "vidrio"
                          ? "vidrio-personalizado"
                          : "blindaje-personalizado"
                      )
                    }
                    className="group inline-flex items-center justify-between sm:justify-center gap-4 px-7 py-4 rounded-full bg-[#0D1117] hover:bg-[#0052FF] text-white text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 shadow-sm"
                  >
                    <span>
                      {mode === "vidrio"
                        ? "Abrir Calculadora de Vidrio"
                        : "Abrir Calculadora de Blindaje"}
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  {onOpenWhatsApp && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenWhatsApp(
                          mode === "vidrio"
                            ? `Cotización de Vidrio Emplomado a medida (${activePreset.label} · ${activePreset.pbEquiv})`
                            : `Cotización de Blindaje Estructural (${activePreset.label} · ${activePreset.pbEquiv})`
                        )
                      }
                      className="px-5 py-3.5 rounded-full border border-[#0D1117]/15 hover:border-[#0D1117] text-xs font-mono uppercase tracking-[0.1em] text-[#0D1117]/75 hover:text-[#0D1117] transition-colors text-center"
                    >
                      WhatsApp Directo
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  3D ISOMETRIC LIGHT STAGE WITH REAL-TIME PROJECTED HOTSPOT DOTS            */
/* ========================================================================== */

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface PolyFace {
  verts: Vec3[];
  fill: string;
  stroke: string;
  strokeWidth?: number;
  alpha?: number;
  depthBias?: number;
  layerId?: number;
}

function IsometricHotspotStage({
  mode,
  viewMode,
  preset,
  hotspotsMeta,
  activeHotspot,
  onSelectHotspot,
}: {
  mode: CustomToggleMode;
  viewMode: StageViewMode;
  preset: PresetOption;
  hotspotsMeta: HotspotMeta[];
  activeHotspot: number | null;
  onSelectHotspot: (id: number | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 });
  const animRef = useRef({
    explode: 0.75,
    thick: preset.thicknessFactor,
    simTime: 0,
    lastNow: performance.now(),
  });

  // Store reactive props in refs so the 60fps loop never restarts or jumps on hover
  const stateRefs = useRef({
    mode,
    viewMode,
    preset,
    activeHotspot,
  });
  stateRefs.current = { mode, viewMode, preset, activeHotspot };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
        layerId?: number;
      }
    ): PolyFace[] => {
      const alpha = opts.alpha ?? 1;
      const bias = opts.depthBias ?? 0;
      const sw = opts.strokeWidth ?? 1.1;
      const lid = opts.layerId;
      return [
        {
          verts: [
            { x: x0, y: y0, z: z0 },
            { x: x1, y: y0, z: z0 },
            { x: x1, y: y0, z: z1 },
            { x: x0, y: y0, z: z1 },
          ],
          fill: opts.left,
          stroke: opts.stroke,
          strokeWidth: sw,
          alpha: alpha * 0.75,
          depthBias: bias - 4,
          layerId: lid,
        },
        {
          verts: [
            { x: x0, y: y0, z: z0 },
            { x: x1, y: y0, z: z0 },
            { x: x1, y: y1, z: z0 },
            { x: x0, y: y1, z: z0 },
          ],
          fill: opts.left,
          stroke: opts.stroke,
          strokeWidth: sw,
          alpha: alpha * 0.9,
          depthBias: bias - 2,
          layerId: lid,
        },
        {
          verts: [
            { x: x0, y: y0, z: z0 },
            { x: x0, y: y0, z: z1 },
            { x: x0, y: y1, z: z1 },
            { x: x0, y: y1, z: z0 },
          ],
          fill: opts.right,
          stroke: opts.stroke,
          strokeWidth: sw,
          alpha: alpha * 0.9,
          depthBias: bias - 2,
          layerId: lid,
        },
        {
          verts: [
            { x: x1, y: y0, z: z0 },
            { x: x1, y: y0, z: z1 },
            { x: x1, y: y1, z: z1 },
            { x: x1, y: y1, z: z0 },
          ],
          fill: opts.right,
          stroke: opts.stroke,
          strokeWidth: sw,
          alpha,
          depthBias: bias,
          layerId: lid,
        },
        {
          verts: [
            { x: x0, y: y0, z: z1 },
            { x: x1, y: y0, z: z1 },
            { x: x1, y: y1, z: z1 },
            { x: x0, y: y1, z: z1 },
          ],
          fill: opts.left,
          stroke: opts.stroke,
          strokeWidth: sw,
          alpha,
          depthBias: bias,
          layerId: lid,
        },
        {
          verts: [
            { x: x0, y: y1, z: z0 },
            { x: x1, y: y1, z: z0 },
            { x: x1, y: y1, z: z1 },
            { x: x0, y: y1, z: z1 },
          ],
          fill: opts.top,
          stroke: opts.stroke,
          strokeWidth: sw,
          alpha,
          depthBias: bias + 2,
          layerId: lid,
        },
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
        layerId?: number;
      }
    ): PolyFace[] => [
      ...makeBox(x0, x1, y0, y0 + barW, z0, z1, opts),
      ...makeBox(x0, x1, y1 - barW, y1, z0, z1, opts),
      ...makeBox(x0, x1, y0 + barW, y1 - barW, z0, z0 + barW, opts),
      ...makeBox(x0, x1, y0 + barW, y1 - barW, z1 - barW, z1, opts),
    ];

    const render = (now: number) => {
      const st = animRef.current;
      const dt = Math.min(0.05, (now - st.lastNow) / 1000);
      st.lastNow = now;

      const {
        mode: curMode,
        viewMode: curViewMode,
        preset: curPreset,
        activeHotspot: curHotspot,
      } = stateRefs.current;

      // Freeze simulation clock & camera sway while user hovers a hotspot so the dot never moves under the cursor
      const isInspecting = curHotspot !== null;
      if (!isInspecting) {
        st.simTime += dt;
      }
      const t = st.simTime;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const W = rect.width;
      const H = rect.height;
      if (
        canvas.width !== Math.round(W * dpr) ||
        canvas.height !== Math.round(H * dpr)
      ) {
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      // Compute target explode based on viewMode; freeze in place while inspecting a hotspot
      if (!isInspecting) {
        let targetExplode = 0;
        if (curViewMode === "exploded") {
          targetExplode = 1;
        } else if (curViewMode === "assembled") {
          targetExplode = 0;
        } else {
          const cycle = (Math.sin(t * 0.9 - 0.4) + 1) * 0.5;
          targetExplode = Math.max(0, Math.min(1, (cycle - 0.25) * 1.75));
        }
        st.explode += (targetExplode - st.explode) * 0.08;
      }
      st.thick += (curPreset.thicknessFactor - st.thick) * 0.1;

      const m = mouseRef.current;
      if (!isInspecting) {
        m.cx += (m.tx - m.cx) * 0.08;
        m.cy += (m.ty - m.cy) * 0.08;
      }

      const yaw = Math.PI / 4 + Math.sin(t * 0.4) * 0.03 + m.cx * 0.22;
      const pitch = 0.54 + Math.cos(t * 0.35) * 0.015 + m.cy * 0.12;
      const scale = Math.min(W, H) * 0.00285;
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
          depth,
        };
      };

      // Subtle architectural floor grid on the light background
      const floorY = -72;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(13, 17, 23, 0.055)";
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

      const faces: PolyFace[] = [];
      const hotspotAnchors: Vec3[] = [];
      const exp = st.explode;

      if (curMode === "vidrio") {
        /* ------------------------------------------------------------------ */
        /*  MODE 01: ARCHITECTURAL CONTROL ROOM WINDOW + 4 HOTSPOT LAYERS     */
        /* ------------------------------------------------------------------ */
        const glassHalfT = 7.5 * st.thick;
        const spread = exp * 46;

        // Partition Wall Cutaway (Alabaster)
        faces.push(
          ...makeBox(-14, 14, -72, -38, -104, 104, {
            top: "#FFFFFF",
            left: "#E2E8F0",
            right: "#CBD5E1",
            stroke: "#94A3B8",
            depthBias: -24,
            layerId: 0,
          }),
          ...makeBox(-14, 14, -38, 62, -104, -76, {
            top: "#FFFFFF",
            left: "#E2E8F0",
            right: "#CBD5E1",
            stroke: "#94A3B8",
            depthBias: -20,
            layerId: 0,
          }),
          ...makeBox(-14, 14, -38, 8, 76, 104, {
            top: "#FFFFFF",
            left: "#E2E8F0",
            right: "#CBD5E1",
            stroke: "#94A3B8",
            depthBias: 16,
            layerId: 0,
          })
        );

        // Layer 0: Rear Telescopic Steel Subframe
        const f1X = -16 - spread * 1.1;
        faces.push(
          ...makeHollowFrame(f1X - 7, f1X, -38, 56, -76, 76, 9, {
            top: "#475569",
            left: "#1E293B",
            right: "#0F172A",
            stroke: "#0D1117",
            depthBias: -10,
            layerId: 0,
          })
        );

        // Layer 1: Perimeter Lead Gasket (Sello Emplomado)
        const f2X = -7 - spread * 0.5;
        faces.push(
          ...makeHollowFrame(f2X - 4, f2X, -35, 53, -73, 73, 6, {
            top: "#60A5FA",
            left: "#2563EB",
            right: "#1D4ED8",
            stroke: "#1E40AF",
            depthBias: -4,
            layerId: 1,
          })
        );

        // Layer 2: Lead-Silicate Optical Crystal (PbO 55%)
        faces.push(
          ...makeBox(-glassHalfT, glassHalfT, -32, 50, -70, 70, {
            top: "rgba(96, 165, 250, 0.72)",
            left: "rgba(37, 99, 235, 0.48)",
            right: "rgba(0, 82, 255, 0.62)",
            stroke: "#2563EB",
            strokeWidth: 1.5,
            alpha: 0.9,
            depthBias: 4,
            layerId: 2,
          })
        );

        // Internal Warm Amber PbO Density Plane inside Crystal
        faces.push({
          verts: [
            { x: 0, y: -28, z: -65 },
            { x: 0, y: 46, z: -65 },
            { x: 0, y: 46, z: 65 },
            { x: 0, y: -28, z: 65 },
          ],
          fill: "rgba(245, 158, 11, 0.24)",
          stroke: "rgba(217, 119, 6, 0.55)",
          alpha: 0.85,
          depthBias: 6,
          layerId: 2,
        });

        // Specular Light Shimmer Across Crystal
        const specZ = ((t * 42) % 110) - 55;
        faces.push({
          verts: [
            { x: glassHalfT + 0.4, y: -28, z: specZ - 12 },
            { x: glassHalfT + 0.4, y: 46, z: specZ + 6 },
            { x: glassHalfT + 0.4, y: 46, z: specZ + 18 },
            { x: glassHalfT + 0.4, y: -28, z: specZ },
          ],
          fill: "rgba(255, 255, 255, 0.7)",
          stroke: "transparent",
          alpha: 0.9,
          depthBias: 9,
          layerId: 2,
        });

        // Layer 3: Front Brushed 304 Stainless Steel Retainer Frame
        const f4X = 14 + spread * 0.95;
        faces.push(
          ...makeHollowFrame(f4X, f4X + 7, -38, 56, -76, 76, 9, {
            top: "#FFFFFF",
            left: "#E2E8F0",
            right: "#CBD5E1",
            stroke: "#0D1117",
            depthBias: 18,
            layerId: 3,
          })
        );

        // 4 3D Coordinates for the Interactive Hotspot Dots
        hotspotAnchors.push(
          { x: f1X - 4, y: 48, z: -48 }, // 01 Sub-marco
          { x: f2X - 2, y: -15, z: -68 }, // 02 Sello Pb
          { x: 0, y: 36, z: 12 }, // 03 Cristal PbO
          { x: f4X + 4, y: 20, z: 64 } // 04 Contramarco Inox
        );
      } else {
        /* ------------------------------------------------------------------ */
        /*  MODE 02: ARCHITECTURAL BUNKER ROOM + 4 HOTSPOT LAYERS             */
        /* ------------------------------------------------------------------ */
        const leadT = 6 * st.thick;
        const wallLift = exp * 26;
        const doorSlide = exp * 46;

        // Layer 0: Bunker Floor Slab & Outer Structural Walls
        faces.push(
          ...makeBox(-110, 100, -72, -62, -110, 100, {
            top: "#FFFFFF",
            left: "#E2E8F0",
            right: "#CBD5E1",
            stroke: "#94A3B8",
            depthBias: -45,
            layerId: 0,
          }),
          ...makeBox(-110, 96, -62, 52, -110, -96, {
            top: "#FFFFFF",
            left: "#E2E8F0",
            right: "#CBD5E1",
            stroke: "#94A3B8",
            depthBias: -30,
            layerId: 0,
          }),
          ...makeBox(-110, -96, -62, 52, -96, 96, {
            top: "#FFFFFF",
            left: "#CBD5E1",
            right: "#E2E8F0",
            stroke: "#94A3B8",
            depthBias: -30,
            layerId: 0,
          })
        );

        // Layer 1: 99.9% Electrolytic Lead Sheet Core
        faces.push(
          ...makeBox(
            -95,
            92,
            -58 + wallLift,
            50 + wallLift,
            -96,
            -96 + leadT,
            {
              top: "#334155",
              left: "#1E293B",
              right: "#0F172A",
              stroke: "#0052FF",
              strokeWidth: 1.4,
              depthBias: -16,
              layerId: 1,
            }
          ),
          ...makeBox(
            -96,
            -96 + leadT,
            -58 + wallLift,
            50 + wallLift,
            -95,
            92,
            {
              top: "#334155",
              left: "#0F172A",
              right: "#1E293B",
              stroke: "#0052FF",
              strokeWidth: 1.4,
              depthBias: -16,
              layerId: 1,
            }
          )
        );

        // Layer 2: 5cm Anti-Leak Overlap Strips & Corner Seam (Traslape)
        faces.push(
          ...makeBox(
            -96,
            -84,
            -56 + wallLift * 1.25,
            54 + wallLift * 1.25,
            -96,
            -84,
            {
              top: "#60A5FA",
              left: "#0052FF",
              right: "#1D4ED8",
              stroke: "#FFFFFF",
              depthBias: -10,
              layerId: 2,
            }
          ),
          ...makeBox(
            -22,
            -12,
            -56 + wallLift * 1.25,
            52 + wallLift * 1.25,
            -96 + leadT,
            -92 + leadT,
            {
              top: "#60A5FA",
              left: "#0052FF",
              right: "#1D4ED8",
              stroke: "#FFFFFF",
              depthBias: -10,
              layerId: 2,
            }
          )
        );

        // Layer 3: Front Sliding Lead-Lined Door (Puerta Corrediza Blindada)
        faces.push(
          ...makeBox(-12 + doorSlide, 48 + doorSlide, -60, 40, 88, 98, {
            top: "#334155",
            left: "#1E293B",
            right: "#0F172A",
            stroke: "#0052FF",
            strokeWidth: 1.4,
            depthBias: 25,
            layerId: 3,
          })
        );

        // Center CT / X-Ray Scanner Gantry Inside Bunker
        faces.push(
          ...makeBox(-22, 22, -62, -44, -22, 22, {
            top: "#E2E8F0",
            left: "#CBD5E1",
            right: "#94A3B8",
            stroke: "#64748B",
            depthBias: 2,
          }),
          ...makeHollowFrame(-12, 10, -44, 24, -34, 34, 12, {
            top: "#FFFFFF",
            left: "#E2E8F0",
            right: "#CBD5E1",
            stroke: "#0D1117",
            depthBias: 6,
          }),
          ...makeBox(
            -38 + Math.sin(t * 1.4) * 12,
            48 + Math.sin(t * 1.4) * 12,
            -22,
            -15,
            -10,
            10,
            {
              top: "#60A5FA",
              left: "#2563EB",
              right: "#1D4ED8",
              stroke: "#FFFFFF",
              depthBias: 10,
            }
          )
        );

        // 4 3D Coordinates for the Interactive Hotspot Dots
        hotspotAnchors.push(
          { x: -105, y: 20, z: 45 }, // 01 Muro Base
          { x: 35, y: 45 + wallLift, z: -92 }, // 02 Lámina Plomo 99.9%
          { x: -90, y: 48 + wallLift * 1.25, z: -90 }, // 03 Traslape 5cm
          { x: 18 + doorSlide, y: 25, z: 93 } // 04 Puerta Blindada
        );
      }

      // Painter's Algorithm Depth Sort + Active Hotspot Layer Isolation
      const projected = faces.map((f) => {
        const pts = f.verts.map(project);
        const avgDepth =
          pts.reduce((acc, p) => acc + p.depth, 0) / pts.length +
          (f.depthBias ?? 0);
        let finalAlpha = f.alpha ?? 1;
        if (curHotspot !== null && f.layerId !== undefined) {
          finalAlpha = f.layerId === curHotspot ? 1 : 0.22;
        }
        return { f, pts, avgDepth, finalAlpha };
      });

      projected.sort((a, b) => a.avgDepth - b.avgDepth);

      for (const { f, pts, finalAlpha } of projected) {
        ctx.save();
        ctx.globalAlpha = finalAlpha;
        ctx.beginPath();
        ctx.moveTo(pts[0].sx, pts[0].sy);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].sx, pts[i].sy);
        }
        ctx.closePath();
        ctx.fillStyle = f.fill;
        ctx.fill();
        if (f.stroke !== "transparent") {
          ctx.lineWidth =
            curHotspot !== null && f.layerId === curHotspot
              ? (f.strokeWidth ?? 1.2) + 0.8
              : (f.strokeWidth ?? 1.1);
          ctx.strokeStyle = f.stroke;
          ctx.lineJoin = "round";
          ctx.stroke();
        }
        ctx.restore();
      }

      // Minimalist Ray / Wave Physics Overlay
      if (curMode === "vidrio") {
        const src = project({ x: -125, y: 10, z: 0 });
        const hit = project({ x: 0, y: 10, z: 0 });
        const out = project({ x: 125, y: 10, z: 0 });

        ctx.save();
        ctx.strokeStyle = "#EF4444";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(src.sx, src.sy);
        ctx.lineTo(hit.sx, hit.sy);
        ctx.stroke();

        const p = (t * 1.35) % 1;
        const px = src.sx + (hit.sx - src.sx) * p;
        const py = src.sy + (hit.sy - src.sy) * p;
        ctx.setLineDash([]);
        ctx.fillStyle = "#EF4444";
        ctx.beginPath();
        ctx.arc(px, py, 3.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#0052FF";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(hit.sx, hit.sy);
        ctx.lineTo(out.sx, out.sy);
        ctx.stroke();
        ctx.restore();
      } else {
        const p = (t * 0.8) % 1;
        const rad = 18 + p * 68;
        ctx.save();
        ctx.strokeStyle = `rgba(0, 82, 255, ${(1 - p) * 0.65})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let a = 0; a <= 36; a++) {
          const ang = (a / 36) * Math.PI * 2;
          const wx = Math.max(-88, Math.min(84, Math.cos(ang) * rad));
          const wz = Math.max(-88, Math.min(84, Math.sin(ang) * rad));
          const pt = project({ x: wx, y: -24, z: wz });
          if (a === 0) ctx.moveTo(pt.sx, pt.sy);
          else ctx.lineTo(pt.sx, pt.sy);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }

      // Update Real-Time DOM Hotspot Dot Positions directly from 3D Projection
      hotspotAnchors.forEach((anchor, idx) => {
        const el = dotRefs.current[idx];
        if (!el) return;
        const pt = project(anchor);
        el.style.transform = `translate3d(${pt.sx.toFixed(1)}px, ${pt.sy.toFixed(1)}px, 0)`;
      });

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseRef.current.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const handlePointerLeave = () => {
    mouseRef.current.tx = 0;
    mouseRef.current.ty = 0;
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-full select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* ─── Real-Time 3D-Projected Minimalist Hotspot Dots ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {hotspotsMeta.map((h, idx) => {
          const isOpen = activeHotspot === h.layerId;
          return (
            <div
              key={`${mode}-${h.code}`}
              ref={(el) => {
                dotRefs.current[idx] = el;
              }}
              onMouseEnter={() => onSelectHotspot(h.layerId)}
              onMouseLeave={() => onSelectHotspot(null)}
              className="pointer-events-auto absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 p-3 z-30"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHotspot(isOpen ? null : h.layerId);
                }}
                aria-label={h.title}
                className={cn(
                  "group relative w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-colors duration-200 shadow-md",
                  isOpen
                    ? "bg-[#0052FF] text-white ring-4 ring-[#0052FF]/25"
                    : "bg-[#0D1117]/90 hover:bg-[#0052FF] text-white ring-4 ring-white/80"
                )}
              >
                {/* Subtle pulse halo */}
                {!isOpen && (
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-[#0052FF]/35 animate-ping" />
                )}
                <span className="relative z-10">{h.code}</span>
              </button>

              {/* Minimalist Popover Card — Appears ONLY when this dot is active */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.94 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute left-1/2 bottom-9 -translate-x-1/2 w-56 rounded-2xl bg-white/95 backdrop-blur-md border border-[#0D1117]/12 p-3.5 shadow-[0_18px_40px_-12px_rgba(13,17,23,0.22)] text-left"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#0052FF] font-bold">
                        CAPA {h.code}
                      </span>
                      <span className="font-mono text-[9.5px] text-[#0D1117]/50">
                        {h.metric}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#0D1117]">
                      {h.title}
                    </div>
                    <p className="text-[11px] text-[#0D1117]/65 leading-snug mt-1">
                      {h.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IsometricCustomToggle;
