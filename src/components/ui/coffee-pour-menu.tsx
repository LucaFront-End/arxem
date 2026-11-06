"use client";

/**
 * ARXEM Clinical Specialties & Live Radiological Simulation Stage.
 *
 * Minimalist 2-column architecture ('Outfit' two-weight typography):
 * - Left column: Clean interactive index of the 5 clinical environments.
 * - Right column: Dedicated 60fps SVG simulation stage where each card has a
 *   bespoke, clinically meaningful animation (no liquids or cups):
 *     01 Dentistas     → Intraoral / Panoramic dental arch scan + 0.5mm Pb thyroid shield deflecting scatter.
 *     02 Clínicas      → Rotating CT/X-Ray anode firing ionizing waves blocked by a 2.6mm Pb Lead-Glass visor.
 *     03 Veterinarias  → Overhead collimator & 14"×17" cassette with a sweeping green-phosphor skeletal scan.
 *     04 Constructoras → Isometric multi-layer bunker wall assembly (99.9% Lead sheet) stopping gamma waves (0.00 µSv/h).
 *     05 Laboratorios  → Ultrasound transducer harmonic sonar waves + live H&D sensitometry calibration curve.
 */

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type SpecialtyScene =
  | "dental-scan"
  | "clinic-visor"
  | "vet-cassette"
  | "bunker-wall"
  | "lab-sonar";

export interface CoffeeItem {
  id: string;
  name: string;
  thinTitle?: string;
  boldTitle?: string;
  shortTitle?: string;
  subtitle: string;
  description: string;
  scene: SpecialtyScene;
  specBadge: string;
  metricValue: string;
  metricLabel: string;
  stageCaption: string;
  telemetryLeft: string;
  telemetryRight: string;
  recommendedItems: string[];
  accent: string;
  ctaLabel: string;
}

export interface CoffeePourMenuProps {
  title?: string;
  eyebrow?: string;
  items?: CoffeeItem[];
  defaultIndex?: number;
  theme?: "dark" | "light";
  onSelect?: (item: CoffeeItem, index: number) => void;
  onExploreAction?: (item: CoffeeItem, index: number) => void;
  onQuoteAction?: (item: CoffeeItem, index: number) => void;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                    Default 5 ARXEM Clinical Specialties                    */
/* -------------------------------------------------------------------------- */

export const DEFAULT_COFFEE_ITEMS: CoffeeItem[] = [
  {
    id: "dentistas",
    name: "Odontología Dentistas",
    thinTitle: "Odontología",
    boldTitle: "Dentistas",
    shortTitle: "Dentistas",
    subtitle: "Radiología Intraoral & Panorámica",
    description:
      "Blindaje ligero ergonómico de 0.5mm Pb y consumibles intraorales para consultorios dentales y centros de ortodoncia.",
    scene: "dental-scan",
    specBadge: "0.5mm Pb · Película Intraoral",
    metricValue: "99.4%",
    metricLabel: "Atenuación en Tiroides",
    stageCaption: "ESCANEO INTRAORAL 70 KVP · COLLARÍN TIROIDES 0.5MM PB",
    telemetryLeft: "HAZ FOCAL: 70 kVp · 8 mA",
    telemetryRight: "DISPERSIÓN TIROIDES: 0.00 mSv",
    recommendedItems: [
      "Kit Mandil + Collarín 0.5mm Pb",
      "Película Dental HR-U Fuji 15x30",
      'Vidrio Emplomado 8"x10" 8mm',
    ],
    accent: "#9EC5FF",
    ctaLabel: "Explorar Dentistas",
  },
  {
    id: "clinicas",
    name: "Hospitales Clínicas",
    thinTitle: "Hospitales",
    boldTitle: "Clínicas",
    shortTitle: "Clínicas",
    subtitle: "Salas de Rayos X, Tomografía y Mamografía",
    description:
      "Cristales ópticos de silicato de plomo y equipamiento de protección continua para departamentos de imagenología de alto flujo.",
    scene: "clinic-visor",
    specBadge: "2.0mm – 2.6mm Pb · NOM-229-SSA1",
    metricValue: "2.6mm",
    metricLabel: "Equivalencia Pb Certificada",
    stageCaption: "VISOR DE CONSOLA 120×80CM · TRANSMISIÓN ÓPTICA >85%",
    telemetryLeft: "SALA TOMOGRAFÍA: 150 kVp",
    telemetryRight: "CONSOLA OPERADOR: 100% SEGURO",
    recommendedItems: [
      "Vidrio Emplomado 120x80cm",
      "Chaleco y Falda Emplomado",
      "Lentes Emplomados 0.75mm Pb",
    ],
    accent: "#B8C7E0",
    ctaLabel: "Explorar Clínicas",
  },
  {
    id: "veterinarias",
    name: "Radiología Veterinarias",
    thinTitle: "Radiología",
    boldTitle: "Veterinarias",
    shortTitle: "Veterinarias",
    subtitle: "Diagnóstico Veterinario Seguro",
    description:
      "Chasis radiográficos de alta sensibilidad y prendas emplomadas flexibles para sujeción clínica en hospitales veterinarios.",
    scene: "vet-cassette",
    specBadge: 'Chasis 14"x17" · Guantes 0.5mm Pb',
    metricValue: "0.5mm",
    metricLabel: "Blindaje Flexible Ligero",
    stageCaption: 'CHASIS RADIOGRÁFICO 14"×17" · COLIMACIÓN DE ALTA SENSIBILIDAD',
    telemetryLeft: "PANTALLA: FÓSFORO VERDE",
    telemetryRight: "EXPOSICIÓN: 65 kVp · 4.0 mAs",
    recommendedItems: [
      "Mandil Emplomado Ligero 0.5mm",
      "Guantes Emplomados Flexibles",
      'Chasis Radiográfico 14"x17"',
    ],
    accent: "#9ED9CC",
    ctaLabel: "Explorar Veterinarias",
  },
  {
    id: "constructoras",
    name: "Arquitectura Constructoras",
    thinTitle: "Arquitectura",
    boldTitle: "Constructoras",
    shortTitle: "Constructoras",
    subtitle: "Ingeniería y Obra Hospitalaria",
    description:
      "Lámina de plomo electrolítico al 99.9% de pureza y cristales a medida para blindaje estructural de búnkeres y quirófanos.",
    scene: "bunker-wall",
    specBadge: '1/16" a 1/8" Pb · Certificación COFEPRIS',
    metricValue: "99.9%",
    metricLabel: "Pureza de Plomo Laminado",
    stageCaption: "ENSAMBLAJE DE MURO BÚNKER · LÁMINA DE PLOMO 3.2MM (1/8\")",
    telemetryLeft: "NÚCLEO: PLOMO 11.34 g/cm³",
    telemetryRight: "DOSIMETRÍA EXTERIOR: 0.00 µSv/h",
    recommendedItems: [
      'Lámina de Plomo 1/16" (1.6mm)',
      'Lámina de Plomo 1/8" (3.2mm)',
      "Vidrio Emplomado a Medida",
    ],
    accent: "#D6C5B3",
    ctaLabel: "Explorar Constructoras",
  },
  {
    id: "laboratorios",
    name: "Imagenología Laboratorios",
    thinTitle: "Imagenología",
    boldTitle: "Laboratorios",
    shortTitle: "Laboratorios",
    subtitle: "Centros de Diagnóstico y Control",
    description:
      "Química reveladora y fijadora para cuarto oscuro, geles conductivos y accesorios de control de calidad radiográfica.",
    scene: "lab-sonar",
    specBadge: "Química Reveladora · Chasis · Gel",
    metricValue: "100%",
    metricLabel: "Trazabilidad & Certificación",
    stageCaption: "CALIBRACIÓN SENSITOMÉTRICA H&D · CONDUCCIÓN ACÚSTICA 7.5 MHZ",
    telemetryLeft: "DENSITOMETRÍA: Dmax 3.20 OD",
    telemetryRight: "IMPEDANCIA GEL: 1.54 MRayl",
    recommendedItems: [
      "Revelador y Fijador Carestream",
      "Lentes emplomados con proteccion lateral",
      "Gel Conductivo Ultrasonido 5L",
    ],
    accent: "#C8BFE7",
    ctaLabel: "Explorar Laboratorios",
  },
];

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const STAGE_W = 520;
const STAGE_H = 440;

export function CoffeePourMenu({
  title = "Diseñado para tu Entorno Clínico",
  eyebrow = "03 — ESPECIALIDADES & ENTORNOS",
  items = DEFAULT_COFFEE_ITEMS,
  defaultIndex = 0,
  theme = "light",
  onSelect,
  onExploreAction,
  onQuoteAction,
  className,
}: CoffeePourMenuProps) {
  const [activeIndex, setActiveIndex] = React.useState(() =>
    Math.max(0, Math.min(items.length - 1, defaultIndex))
  );
  // Continuous time phase (seconds) for the active scene's 60fps simulation
  const [time, setTime] = React.useState(0);
  // Progress (0 -> 1) of the initial activation sequence when switching cards
  const [introProgress, setIntroProgress] = React.useState(0);
  const [replayKey, setReplayKey] = React.useState(0);

  const startTimeRef = React.useRef<number>(performance.now());
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      setTime(elapsed);
      setIntroProgress(Math.min(1, elapsed / 1.35));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [activeIndex, replayKey]);

  const activate = React.useCallback(
    (index: number, forceReplay = false) => {
      const next = items[index];
      if (!next) return;
      if (index === activeIndex && !forceReplay) return;
      setActiveIndex(index);
      if (forceReplay) setReplayKey((k) => k + 1);
      onSelect?.(next, index);
    },
    [activeIndex, items, onSelect]
  );

  const isDark = theme === "dark";
  const stroke = isDark ? "#F3ECE0" : "#0D1117";
  const activeItem = items[activeIndex] ?? items[0];

  return (
    <section
      aria-label={title}
      style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
      className={cn(
        "relative w-full overflow-hidden transition-colors",
        isDark ? "bg-[#0D1117] text-[#F7F7F4]" : "bg-[#F7F7F4] text-[#0D1117]",
        className
      )}
    >
      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ─── LEFT COLUMN (6 cols): Minimalist Interactive Index ─── */}
          <div className="lg:col-span-6">
            <header className="mb-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#0D1117]/45 mb-3">
                {eyebrow}
              </p>
              <h2 className="text-4xl sm:text-6xl leading-[0.94] tracking-[-0.03em] uppercase text-[#0D1117]">
                <span className="font-extralight block text-[#0D1117]/70">
                  Diseñado para tu
                </span>
                <span className="font-extrabold block mt-1">
                  Entorno Clínico.
                </span>
              </h2>
            </header>

            <ul
              role="listbox"
              aria-label={title}
              className="divide-y divide-[#0D1117]/12 border-y border-[#0D1117]/12"
            >
              {items.map((item, i) => {
                const selected = i === activeIndex;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <li key={item.id}>
                    <div
                      role="option"
                      aria-selected={selected}
                      tabIndex={0}
                      onMouseEnter={() => activate(i)}
                      onFocus={() => activate(i)}
                      onClick={() => activate(i, true)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          activate(i, true);
                        }
                      }}
                      className="group py-5 sm:py-6 cursor-pointer select-none focus:outline-none"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex items-baseline gap-3 sm:gap-4 min-w-0">
                          <span
                            className={cn(
                              "font-mono text-xs tracking-[0.14em] transition-colors shrink-0",
                              selected
                                ? "text-[#0052FF] font-semibold"
                                : "text-[#0D1117]/35 group-hover:text-[#0D1117]/60"
                            )}
                          >
                            {num}
                          </span>

                          <h3
                            className={cn(
                              "text-2xl sm:text-[32px] uppercase tracking-[-0.025em] leading-none transition-transform duration-300 truncate",
                              selected
                                ? "translate-x-1"
                                : "group-hover:translate-x-1"
                            )}
                          >
                            {item.thinTitle ? (
                              <>
                                <span
                                  className={cn(
                                    "font-extralight mr-2 transition-colors",
                                    selected
                                      ? "text-[#0D1117]/75"
                                      : "text-[#0D1117]/40 group-hover:text-[#0D1117]/65"
                                  )}
                                >
                                  {item.thinTitle}
                                </span>
                                <span
                                  className={cn(
                                    "font-extrabold transition-colors",
                                    selected
                                      ? "text-[#0D1117]"
                                      : "text-[#0D1117]/55 group-hover:text-[#0D1117]"
                                  )}
                                >
                                  {item.boldTitle}
                                </span>
                              </>
                            ) : (
                              <span className="font-extrabold">{item.name}</span>
                            )}
                          </h3>
                        </div>

                        <span
                          className={cn(
                            "font-mono text-xs sm:text-sm tracking-[0.06em] transition-colors shrink-0",
                            selected
                              ? "text-[#0D1117] font-semibold"
                              : "text-[#0D1117]/35 group-hover:text-[#0D1117]/60"
                          )}
                        >
                          {item.metricValue}
                        </span>
                      </div>

                      <AnimatePresence initial={false}>
                        {selected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.34,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 pl-7 sm:pl-9 pr-2 pb-1 space-y-4">
                              <p className="text-[14.5px] text-[#0D1117]/65 leading-relaxed max-w-[52ch]">
                                {item.description}
                              </p>

                              {item.recommendedItems.length > 0 && (
                                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12.5px] text-[#0D1117]/80 font-medium pt-1">
                                  {item.recommendedItems.map((rec, idx) => (
                                    <span
                                      key={rec}
                                      className="inline-flex items-center gap-1.5"
                                    >
                                      <span className="font-mono text-[10px] text-[#0052FF]">
                                        0{idx + 1}
                                      </span>
                                      {rec}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="pt-2 flex flex-wrap items-center gap-6">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onExploreAction?.(item, i);
                                  }}
                                  className="group/btn inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.1em] font-bold text-[#0D1117] hover:text-[#0052FF] transition-colors"
                                >
                                  <span>{item.ctaLabel}</span>
                                  <span className="w-6 h-6 rounded-full bg-[#0D1117] text-white group-hover/btn:bg-[#0052FF] flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5">
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onQuoteAction?.(item, i);
                                  }}
                                  className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#0D1117]/45 hover:text-[#0D1117] underline underline-offset-4 decoration-[#0D1117]/20 hover:decoration-[#0D1117] transition-colors"
                                >
                                  Cotizar a medida
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ─── RIGHT COLUMN (6 cols): Meaningful Radiological Stage per Card ─── */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[560px] rounded-[32px] border border-[#0D1117]/10 bg-white p-7 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[0_24px_60px_-35px_rgba(13,17,23,0.08)]">
              {/* Soft Ambient Specialty Glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-all duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${activeItem.accent}35 0%, transparent 68%)`,
                }}
              />

              {/* Subtle Architectural Technical Grid */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(13,17,23,0.08) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* Top Stage Bar */}
              <div className="relative z-10 flex items-center justify-between gap-4 pb-4 border-b border-[#0D1117]/[0.07] text-[10.5px] font-mono uppercase tracking-[0.15em] text-[#0D1117]/55">
                <span className="truncate">
                  0{activeIndex + 1} / {activeItem.stageCaption}
                </span>
                <button
                  type="button"
                  onClick={() => activate(activeIndex, true)}
                  title="Reiniciar simulación"
                  className="inline-flex items-center gap-1.5 text-[#0D1117]/45 hover:text-[#0052FF] transition-colors shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reiniciar</span>
                </button>
              </div>

              {/* Animated Stage Container: Previous drops down, next springs from right */}
              <div className="relative z-10 w-full aspect-[520/420] flex items-center justify-center overflow-hidden my-2">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`${activeItem.id}-${replayKey}`}
                    initial={{ opacity: 0, x: 140, y: 0, rotate: 5, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, y: 180, rotate: -10, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 190,
                      damping: 22,
                      mass: 0.9,
                    }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <svg
                      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
                      className="w-full h-full overflow-visible select-none"
                      role="img"
                      aria-label={activeItem.stageCaption}
                    >
                      {activeItem.scene === "dental-scan" && (
                        <DentalScanScene
                          t={time}
                          intro={introProgress}
                          stroke={stroke}
                        />
                      )}
                      {activeItem.scene === "clinic-visor" && (
                        <ClinicVisorScene
                          t={time}
                          intro={introProgress}
                          stroke={stroke}
                        />
                      )}
                      {activeItem.scene === "vet-cassette" && (
                        <VetCassetteScene
                          t={time}
                          intro={introProgress}
                          stroke={stroke}
                        />
                      )}
                      {activeItem.scene === "bunker-wall" && (
                        <BunkerWallScene
                          t={time}
                          intro={introProgress}
                          stroke={stroke}
                        />
                      )}
                      {activeItem.scene === "lab-sonar" && (
                        <LabSonarScene
                          t={time}
                          intro={introProgress}
                          stroke={stroke}
                        />
                      )}
                    </svg>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Telemetry Readout Bar */}
              <div className="relative z-10 pt-4 border-t border-[#0D1117]/[0.07] flex flex-wrap items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#0D1117]/60">
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
                  {activeItem.telemetryLeft}
                </span>
                <span className="font-semibold text-[#0D1117]">
                  {activeItem.telemetryRight}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  SCENE 01: ODONTOLOGÍA / DENTISTAS                                         */
/*  Intraoral / Panoramic Dental Scan + 0.5mm Pb Thyroid Collar Shield        */
/* ========================================================================== */

function DentalScanScene({
  t,
  intro,
  stroke,
}: {
  t: number;
  intro: number;
  stroke: string;
}) {
  // Scanning angle sweeps smoothly back and forth across the 8 dental arch teeth
  const sweep = Math.sin(t * 1.9); // -1 to 1
  const beamTargetX = 260 + sweep * 115;
  const teeth = [-105, -75, -45, -15, 15, 45, 75, 105];

  return (
    <g>
      {/* Top Articulated Intraoral X-Ray Cone (Colimador) */}
      <g
        transform={`translate(260, ${54 - (1 - intro) * 40}) rotate(${(sweep * 14).toFixed(2)})`}
      >
        {/* Articulated arm stem */}
        <line
          x1={0}
          y1={-50}
          x2={0}
          y2={-22}
          stroke={stroke}
          strokeWidth={3}
          strokeLinecap="round"
        />
        {/* X-Ray Head Housing */}
        <rect
          x={-28}
          y={-22}
          width={56}
          height={24}
          rx={6}
          fill="#FFFFFF"
          stroke={stroke}
          strokeWidth={2}
        />
        {/* Collimator Cylinder */}
        <path
          d="M -16 2 L 16 2 L 22 30 L -22 30 Z"
          fill="#F7F7F4"
          stroke={stroke}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <circle cx={0} cy={-10} r={4} fill="#0052FF" />
      </g>

      {/* Focused Diagnostic X-Ray Fan Beam */}
      <polygon
        points={`260,82 ${beamTargetX - 36},205 ${beamTargetX + 36},205`}
        fill="rgba(0, 82, 255, 0.12)"
      />
      <line
        x1={260}
        y1={82}
        x2={beamTargetX}
        y2={205}
        stroke="#0052FF"
        strokeWidth={2}
        strokeDasharray="5 4"
      />

      {/* Panoramic Dental Arch Frame */}
      <g transform="translate(260, 195)">
        <rect
          x={-155}
          y={-46}
          width={310}
          height={92}
          rx={18}
          fill="#FFFFFF"
          stroke={stroke}
          strokeWidth={1.8}
          strokeOpacity={0.22}
        />
        <text
          x={-140}
          y={-28}
          fontSize="8.5"
          fontFamily="monospace"
          fill={stroke}
          opacity={0.45}
        >
          ARCO PANORÁMICO · PELÍCULA HR-U
        </text>

        {/* 8 Anatomical Teeth in the Panoramic Arch */}
        {teeth.map((tx, idx) => {
          const dist = Math.abs(260 + tx - beamTargetX);
          const lit = Math.max(0, 1 - dist / 48);
          return (
            <g key={idx} transform={`translate(${tx}, 4)`}>
              {/* Crown + Root outline */}
              <path
                d="M -10 -16 Q -11 -24 -4 -24 Q 0 -22 4 -24 Q 11 -24 10 -16 L 8 2 L 5 20 L 0 8 L -5 20 L -8 2 Z"
                fill={
                  lit > 0.25
                    ? `rgba(0, 82, 255, ${(0.15 + lit * 0.55).toFixed(2)})`
                    : "rgba(13,17,23,0.04)"
                }
                stroke={lit > 0.35 ? "#0052FF" : stroke}
                strokeWidth={lit > 0.35 ? 2 : 1.5}
                strokeOpacity={lit > 0.35 ? 1 : 0.55}
              />
              {/* Internal root canal highlight when scanned */}
              {lit > 0.3 && (
                <path
                  d="M -3 -10 L -3 12 M 3 -10 L 3 12"
                  stroke="#FFFFFF"
                  strokeWidth={1.3}
                  strokeLinecap="round"
                />
              )}
            </g>
          );
        })}
      </g>

      {/* Secondary Scatter Rays Travelling Downward & Deflecting off the Thyroid Shield */}
      {[-80, -35, 0, 35, 80].map((offset, i) => {
        const phase = (t * 2.4 + i * 0.35) % 1;
        const startX = 260 + offset * 0.7;
        const startY = 242;
        const hitX = 260 + offset;
        const hitY = 304 - Math.abs(offset) * 0.08;
        const px = startX + (hitX - startX) * phase;
        const py = startY + (hitY - startY) * phase;

        return (
          <g key={i}>
            {/* Incoming scatter trajectory */}
            <line
              x1={startX}
              y1={startY}
              x2={hitX}
              y2={hitY}
              stroke="#0052FF"
              strokeOpacity={0.22}
              strokeWidth={1.2}
              strokeDasharray="3 3"
            />
            {/* Moving photon */}
            <circle cx={px} cy={py} r={2.8} fill="#0052FF" />
            {/* Deflection ripple at thyroid shield surface */}
            {phase > 0.82 && (
              <circle
                cx={hitX}
                cy={hitY}
                r={(phase - 0.82) * 55}
                fill="none"
                stroke="#0052FF"
                strokeOpacity={1 - (phase - 0.82) * 5}
                strokeWidth={1.6}
              />
            )}
          </g>
        );
      })}

      {/* 0.5mm Pb Ergonomic Thyroid Collar & Lead Apron Barrier */}
      <g transform="translate(260, 342)">
        {/* Glowing top barrier arc */}
        <path
          d="M -135 -28 Q 0 -52 135 -28"
          fill="none"
          stroke="#0052FF"
          strokeWidth={3.5}
          strokeLinecap="round"
        />
        {/* Lead Collar & Apron Body */}
        <path
          d="M -130 -22 Q 0 -46 130 -22 L 148 54 L -148 54 Z"
          fill="#0D1117"
          stroke={stroke}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {/* Internal Lead Grid Pattern */}
        <line
          x1={-110}
          y1={14}
          x2={110}
          y2={14}
          stroke="#FFFFFF"
          strokeOpacity={0.14}
          strokeDasharray="4 4"
        />
        <text
          x={0}
          y={10}
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="#FFFFFF"
          letterSpacing="2"
        >
          ESCUDO TIROIDES 0.5MM PB · 99.4% BLOQUEO
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="#93C5FD"
          letterSpacing="1.5"
        >
          ✓ ZONA TORÁCICA LIBRE DE RADIACIÓN (0.00 mSv)
        </text>
      </g>
    </g>
  );
}

/* ========================================================================== */
/*  SCENE 02: HOSPITALES / CLÍNICAS                                           */
/*  Rotating CT/X-Ray Anode vs. 2.6mm Pb Lead-Glass Window (Visor 120×80cm)   */
/* ========================================================================== */

function ClinicVisorScene({
  t,
  intro,
  stroke,
}: {
  t: number;
  intro: number;
  stroke: string;
}) {
  const rotorAngle = (t * 140) % 360;
  const rays = [-95, -55, -15, 25, 65, 105];

  return (
    <g>
      {/* Zone Labels */}
      <text
        x={105}
        y={42}
        textAnchor="middle"
        fontSize="9.5"
        fontFamily="monospace"
        fill={stroke}
        opacity={0.5}
      >
        SALA RAYOS X (150 kVp)
      </text>
      <text
        x={415}
        y={42}
        textAnchor="middle"
        fontSize="9.5"
        fontFamily="monospace"
        fill="#0052FF"
      >
        CONSOLA OPERADOR (0.00 mSv)
      </text>

      {/* Left: Rotating X-Ray Tube Anode Emitter */}
      <g transform="translate(86, 220)">
        <circle
          cx={0}
          cy={0}
          r={46}
          fill="#FFFFFF"
          stroke={stroke}
          strokeWidth={2}
        />
        <circle
          cx={0}
          cy={0}
          r={36}
          fill="none"
          stroke="#EF4444"
          strokeOpacity={0.35}
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
        <g transform={`rotate(${rotorAngle.toFixed(1)})`}>
          <polygon
            points="0,-30 8,-8 30,0 8,8 0,30 -8,8 -30,0 -8,-8"
            fill="rgba(239, 68, 68, 0.16)"
            stroke="#EF4444"
            strokeWidth={1.8}
          />
        </g>
        <circle cx={0} cy={0} r={7} fill={stroke} />
        <text
          x={0}
          y={66}
          textAnchor="middle"
          fontSize="8.5"
          fontFamily="monospace"
          fill="#EF4444"
        >
          ÁNODO GIRATORIO RX
        </text>
      </g>

      {/* Ionizing X-Ray Waves Emitted from Left -> Stopped at Glass Center (x=242) */}
      {rays.map((ry, idx) => {
        const p = (t * 1.6 + idx * 0.18) % 1;
        const startX = 136;
        const glassLeftX = 238;
        const curX = startX + (glassLeftX - startX) * p;
        const yPos = 220 + ry;

        return (
          <g key={idx}>
            {/* Sine wave path representing high-energy X-ray */}
            <line
              x1={startX}
              y1={yPos}
              x2={glassLeftX}
              y2={yPos}
              stroke="#EF4444"
              strokeOpacity={0.28}
              strokeWidth={1.4}
              strokeDasharray="4 3"
            />
            {/* Travelling X-Ray Photon Packet */}
            <circle cx={curX} cy={yPos} r={3.5} fill="#EF4444" />
            {/* Absorption flash inside the 2.6mm Pb Lead-Glass matrix */}
            {p > 0.84 && (
              <circle
                cx={glassLeftX + 10}
                cy={yPos}
                r={(p - 0.84) * 58}
                fill="none"
                stroke="#0052FF"
                strokeOpacity={1 - (p - 0.84) * 6}
                strokeWidth={2}
              />
            )}
          </g>
        );
      })}

      {/* Center: Architectural 2.6mm Pb Lead-Glass Window (Visor Emplomado) */}
      <g
        transform={`translate(260, ${220 - (1 - intro) * 30})`}
      >
        {/* Outer Steel Clinical Frame */}
        <rect
          x={-26}
          y={-148}
          width={52}
          height={296}
          rx={8}
          fill="#0D1117"
        />
        {/* Multi-layer Lead Silicate Optical Glass Core */}
        <rect
          x={-18}
          y={-138}
          width={36}
          height={276}
          rx={4}
          fill="rgba(0, 82, 255, 0.18)"
          stroke="#60A5FA"
          strokeWidth={2}
        />
        {/* Internal PbO density planes */}
        <line
          x1={-6}
          y1={-136}
          x2={-6}
          y2={136}
          stroke="#0052FF"
          strokeOpacity={0.45}
          strokeWidth={1.5}
        />
        <line
          x1={6}
          y1={-136}
          x2={6}
          y2={136}
          stroke="#93C5FD"
          strokeOpacity={0.65}
          strokeWidth={1.5}
        />
        {/* Specular Optical Shimmer */}
        <line
          x1={-12}
          y1={-90 + Math.sin(t * 2) * 25}
          x2={12}
          y2={-110 + Math.sin(t * 2) * 25}
          stroke="#FFFFFF"
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        <text
          x={0}
          y={168}
          textAnchor="middle"
          fontSize="9.5"
          fontFamily="monospace"
          fontWeight="bold"
          fill={stroke}
        >
          VIDRIO 2.6MM PB (PbO 55%)
        </text>
      </g>

      {/* Right Side: Clean Visible Optical Light Passing Through (>85% Transmission) */}
      {[-75, -25, 25, 75].map((ry, idx) => {
        const p = (t * 1.3 + idx * 0.25) % 1;
        const startX = 286;
        const endX = 392;
        const curX = startX + (endX - startX) * p;
        const yPos = 220 + ry;

        return (
          <g key={idx}>
            <line
              x1={startX}
              y1={yPos}
              x2={endX}
              y2={yPos}
              stroke="#0052FF"
              strokeOpacity={0.35}
              strokeWidth={1.5}
            />
            <circle cx={curX} cy={yPos} r={3} fill="#0052FF" />
          </g>
        );
      })}

      {/* Right: Operator Console & Safe Visual Verification */}
      <g transform="translate(428, 220)">
        <rect
          x={-34}
          y={-64}
          width={68}
          height={128}
          rx={12}
          fill="#FFFFFF"
          stroke={stroke}
          strokeWidth={2}
        />
        {/* Eye / Optical Clarity Symbol */}
        <path
          d="M -20 -8 Q 0 -24 20 -8 Q 0 8 -20 -8 Z"
          fill="rgba(0, 82, 255, 0.12)"
          stroke="#0052FF"
          strokeWidth={1.8}
        />
        <circle cx={0} cy={-8} r={4.5} fill="#0052FF" />
        <text
          x={0}
          y={22}
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
          fill="#0D1117"
        >
          &gt;85% LUZ
        </text>
        <text
          x={0}
          y={38}
          textAnchor="middle"
          fontSize="8.5"
          fontFamily="monospace"
          fill="#10B981"
        >
          0% RAYOS X
        </text>
      </g>
    </g>
  );
}

/* ========================================================================== */
/*  SCENE 03: RADIOLOGÍA / VETERINARIAS                                       */
/*  14"×17" Radiographic Cassette + Sweeping Green-Phosphor Skeletal Scan     */
/* ========================================================================== */

function VetCassetteScene({
  t,
  stroke,
}: {
  t: number;
  intro: number;
  stroke: string;
}) {
  // Scan bar sweeps vertically across the 14x17 cassette
  const scanNorm = (Math.sin(t * 1.8) + 1) / 2; // 0 to 1
  const cassetteTop = 86;
  const cassetteH = 268;
  const scanY = cassetteTop + 20 + scanNorm * (cassetteH - 40);

  const vertebraeX = [-105, -75, -45, -15, 15, 45, 75, 105];

  return (
    <g>
      {/* 14"x17" Radiographic Cassette Outer Frame */}
      <g transform="translate(260, 220)">
        <rect
          x={-166}
          y={-138}
          width={332}
          height={276}
          rx={14}
          fill="#0D1117"
          stroke={stroke}
          strokeWidth={2.2}
        />
        {/* Corner Protective Bumpers */}
        {[
          [-166, -138],
          [142, -138],
          [-166, 114],
          [142, 114],
        ].map(([bx, by], i) => (
          <rect
            key={i}
            x={bx}
            y={by}
            width={24}
            height={24}
            rx={4}
            fill="none"
            stroke="#5EEAD4"
            strokeOpacity={0.5}
            strokeWidth={1.6}
          />
        ))}

        {/* Dark Radiographic Screen Window */}
        <rect
          x={-148}
          y={-120}
          width={296}
          height={240}
          rx={8}
          fill="#111927"
          stroke="#1E293B"
          strokeWidth={1.5}
        />

        {/* Collimator Target Crosshairs */}
        <line
          x1={-130}
          y1={0}
          x2={130}
          y2={0}
          stroke="#5EEAD4"
          strokeOpacity={0.18}
          strokeDasharray="4 4"
        />
        <line
          x1={0}
          y1={-105}
          x2={0}
          y2={105}
          stroke="#5EEAD4"
          strokeOpacity={0.18}
          strokeDasharray="4 4"
        />

        {/* Anatomical Skeletal Spine & Ribcage Revealed by Green-Phosphor Screen */}
        <g>
          {/* Central Spine Line */}
          <path
            d="M -125 -8 Q 0 -22 125 -4"
            fill="none"
            stroke="#5EEAD4"
            strokeOpacity={0.4}
            strokeWidth={3}
          />

          {/* Vertebrae + Thoracic Ribs */}
          {vertebraeX.map((vx, idx) => {
            const ribHeight = 52 - Math.abs(idx - 3.5) * 8;
            const distToScan = Math.abs(scanY - 220);
            const glow = Math.max(0.35, 1 - distToScan / 130);

            return (
              <g key={idx} transform={`translate(${vx}, -10)`}>
                {/* Vertebra block */}
                <rect
                  x={-8}
                  y={-6}
                  width={16}
                  height={12}
                  rx={3}
                  fill="#5EEAD4"
                  fillOpacity={0.25 + glow * 0.45}
                  stroke="#5EEAD4"
                  strokeWidth={1.4}
                />
                {/* Curved Pair of Ribs */}
                <path
                  d={`M -4 6 Q -10 ${ribHeight * 0.6} 0 ${ribHeight} M 4 6 Q 10 ${ribHeight * 0.6} 6 ${ribHeight - 6}`}
                  fill="none"
                  stroke="#5EEAD4"
                  strokeOpacity={0.3 + glow * 0.55}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* Live Diagnostic ECG / Vital Waveform at Bottom of Screen */}
          <path
            d="M -128 84 L -60 84 L -48 66 L -36 96 L -22 54 L -10 90 L 2 84 L 128 84"
            fill="none"
            stroke="#5EEAD4"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Left & Right 0.5mm Pb Protective Veterinary Gloves Holding Cassette */}
        <g transform="translate(-174, 0)">
          <rect
            x={-16}
            y={-42}
            width={24}
            height={84}
            rx={8}
            fill="#0052FF"
            stroke="#FFFFFF"
            strokeWidth={1.8}
          />
          <text
            x={-4}
            y={4}
            textAnchor="middle"
            fontSize="7.5"
            fontFamily="monospace"
            fill="#FFFFFF"
            transform="rotate(-90 -4 0)"
          >
            GUANTE 0.5 PB
          </text>
        </g>
        <g transform="translate(174, 0)">
          <rect
            x={-8}
            y={-42}
            width={24}
            height={84}
            rx={8}
            fill="#0052FF"
            stroke="#FFFFFF"
            strokeWidth={1.8}
          />
          <text
            x={4}
            y={4}
            textAnchor="middle"
            fontSize="7.5"
            fontFamily="monospace"
            fill="#FFFFFF"
            transform="rotate(90 4 0)"
          >
            GUANTE 0.5 PB
          </text>
        </g>
      </g>

      {/* Sweeping Green-Phosphor Laser Scan Bar */}
      <g transform={`translate(260, ${scanY.toFixed(1)})`}>
        <rect
          x={-146}
          y={-18}
          width={292}
          height={36}
          fill="rgba(20, 184, 166, 0.14)"
        />
        <line
          x1={-146}
          y1={0}
          x2={146}
          y2={0}
          stroke="#2DD4BF"
          strokeWidth={2.4}
        />
        <circle cx={-146} cy={0} r={3.5} fill="#2DD4BF" />
        <circle cx={146} cy={0} r={3.5} fill="#2DD4BF" />
      </g>

      {/* Bottom Format Caption */}
      <text
        x={260}
        y={392}
        textAnchor="middle"
        fontSize="9.5"
        fontFamily="monospace"
        fill={stroke}
        opacity={0.6}
      >
        CHASIS RADIOGRÁFICO 14&quot;×17&quot; · PANTALLA EMISIÓN VERDE
      </text>
    </g>
  );
}

/* ========================================================================== */
/*  SCENE 04: ARQUITECTURA / CONSTRUCTORAS                                    */
/*  Exploded-to-Locked Bunker Wall Assembly (Lámina de Plomo 99.9%)           */
/* ========================================================================== */

function BunkerWallScene({
  t,
  intro,
  stroke,
}: {
  t: number;
  intro: number;
  stroke: string;
}) {
  // Layers smoothly lock together on entry, with a subtle breathing inspection gap
  const spread = (1 - intro) * 58 + (Math.sin(t * 1.4) + 1) * 4;
  const leftLayerX = 250 - 38 - spread;
  const leadCoreX = 250;
  const rightLayerX = 250 + 38 + spread;

  return (
    <g>
      {/* Left: Gamma / X-Ray Source Inside Bunker Room */}
      <g transform="translate(68, 215)">
        <circle
          cx={0}
          cy={0}
          r={28}
          fill="rgba(239, 68, 68, 0.1)"
          stroke="#EF4444"
          strokeWidth={1.8}
        />
        <circle cx={0} cy={0} r={6} fill="#EF4444" />
        <text
          x={0}
          y={48}
          textAnchor="middle"
          fontSize="8.5"
          fontFamily="monospace"
          fill="#EF4444"
        >
          FUENTE BÚNKER
        </text>
      </g>

      {/* Gamma Waves Penetrating Drywall -> Blocked 100% by 99.9% Lead Sheet Core */}
      {[-75, -25, 25, 75].map((ry, i) => {
        const p = (t * 1.5 + i * 0.22) % 1;
        const startX = 102;
        const stopX = leadCoreX - 16;
        const curX = startX + (stopX - startX) * p;
        const yPos = 215 + ry;

        return (
          <g key={i}>
            <line
              x1={startX}
              y1={yPos}
              x2={stopX}
              y2={yPos}
              stroke="#EF4444"
              strokeOpacity={0.35}
              strokeWidth={1.6}
              strokeDasharray="5 3"
            />
            <circle cx={curX} cy={yPos} r={3.5} fill="#EF4444" />
            {p > 0.82 && (
              <circle
                cx={stopX}
                cy={yPos}
                r={(p - 0.82) * 48}
                fill="none"
                stroke="#EF4444"
                strokeOpacity={1 - (p - 0.82) * 5.5}
                strokeWidth={1.8}
              />
            )}
          </g>
        );
      })}

      {/* Layer 1 (Left): Interior Hospital Wall Panel */}
      <g transform={`translate(${leftLayerX.toFixed(1)}, 215)`}>
        <rect
          x={-14}
          y={-125}
          width={28}
          height={250}
          rx={4}
          fill="#FFFFFF"
          stroke={stroke}
          strokeWidth={1.8}
        />
        <text
          x={0}
          y={-136}
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill={stroke}
          opacity={0.55}
        >
          PANEL INT.
        </text>
      </g>

      {/* Layer 2 (Center Hero): 99.9% Pure Electrolytic Lead Sheet (1/16" - 1/8" / 3.2mm Pb) */}
      <g transform={`translate(${leadCoreX}, 215)`}>
        <rect
          x={-20}
          y={-138}
          width={40}
          height={276}
          rx={5}
          fill="#0D1117"
          stroke="#0052FF"
          strokeWidth={2.4}
        />
        {/* Metallic Lead Diagonal Hatching */}
        {[-100, -60, -20, 20, 60, 100].map((hy) => (
          <line
            key={hy}
            x1={-14}
            y1={hy - 12}
            x2={14}
            y2={hy + 12}
            stroke="#94A3B8"
            strokeOpacity={0.35}
            strokeWidth={1.5}
          />
        ))}
        <text
          x={0}
          y={4}
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
          fill="#FFFFFF"
          transform="rotate(-90 0 0)"
          letterSpacing="2"
        >
          LÁMINA DE PLOMO 99.9% · 3.2MM PB
        </text>
        <text
          x={0}
          y={-148}
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
          fill="#0052FF"
        >
          NÚCLEO PB 99.9%
        </text>
      </g>

      {/* Layer 3 (Right): Structural Support Frame */}
      <g transform={`translate(${rightLayerX.toFixed(1)}, 215)`}>
        <rect
          x={-14}
          y={-125}
          width={28}
          height={250}
          rx={4}
          fill="#F7F7F4"
          stroke={stroke}
          strokeWidth={1.8}
        />
        <text
          x={0}
          y={-136}
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill={stroke}
          opacity={0.55}
        >
          MURO EXT.
        </text>
      </g>

      {/* Right Exterior: Zero-Radiation Dosimeter Verification */}
      <g transform="translate(425, 215)">
        {/* Flatline Zero-Dose Line */}
        <line
          x1={-88}
          y1={0}
          x2={-42}
          y2={0}
          stroke="#10B981"
          strokeWidth={2}
          strokeDasharray="3 3"
        />
        <rect
          x={-42}
          y={-52}
          width={84}
          height={104}
          rx={12}
          fill="#FFFFFF"
          stroke={stroke}
          strokeWidth={2}
        />
        <circle cx={0} cy={-22} r={12} fill="rgba(16, 185, 129, 0.15)" />
        <path
          d="M -5 -22 L -1 -18 L 6 -26"
          fill="none"
          stroke="#10B981"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x={0}
          y={10}
          textAnchor="middle"
          fontSize="12"
          fontFamily="monospace"
          fontWeight="bold"
          fill="#0D1117"
        >
          0.00
        </text>
        <text
          x={0}
          y={24}
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill={stroke}
          opacity={0.55}
        >
          µSv/h · COFEPRIS
        </text>
      </g>
    </g>
  );
}

/* ========================================================================== */
/*  SCENE 05: IMAGENOLOGÍA / LABORATORIOS                                     */
/*  Acoustic Ultrasound Sonar Waves + Live H&D Sensitometry Calibration Curve */
/* ========================================================================== */

function LabSonarScene({
  t,
  stroke,
}: {
  t: number;
  intro: number;
  stroke: string;
}) {
  // Build dynamic sensitometric / acoustic waveform points
  const wavePoints: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const frac = i / 40;
    const x = 90 + frac * 340;
    const envelope = Math.sin(frac * Math.PI);
    const y =
      280 -
      Math.sin(frac * 12 - t * 4.2) * 28 * envelope -
      Math.cos(frac * 5 + t * 2.1) * 10 * envelope;
    wavePoints.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  const stepOpacities = [0.12, 0.28, 0.48, 0.7, 0.92];

  return (
    <g>
      {/* Top: Ultrasound Transducer Probe Emitting Harmonic Waves through Conductive Gel */}
      <g transform="translate(260, 74)">
        <path
          d="M -26 -24 L 26 -24 L 34 8 Q 0 18 -34 8 Z"
          fill="#0D1117"
          stroke={stroke}
          strokeWidth={2}
        />
        {/* Gel coupling layer */}
        <path
          d="M -36 10 Q 0 22 36 10"
          fill="none"
          stroke="#0052FF"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <text
          x={0}
          y={-32}
          textAnchor="middle"
          fontSize="8.5"
          fontFamily="monospace"
          fill={stroke}
          opacity={0.55}
        >
          TRANSDUCTOR 7.5 MHz + GEL CONDUCTIVO
        </text>

        {/* Expanding Harmonic Sonar Arcs */}
        {[0, 1, 2].map((idx) => {
          const p = (t * 0.9 + idx * 0.33) % 1;
          const r = 28 + p * 115;
          return (
            <path
              key={idx}
              d={`M ${-r * 0.85} ${16 + r * 0.55} Q 0 ${16 + r} ${r * 0.85} ${16 + r * 0.55}`}
              fill="none"
              stroke="#0052FF"
              strokeOpacity={(1 - p) * 0.65}
              strokeWidth={2}
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* Center: Live Oscilloscope & Sensitometry Calibration Graph */}
      <g>
        <rect
          x={76}
          y={205}
          width={368}
          height={145}
          rx={14}
          fill="#FFFFFF"
          stroke={stroke}
          strokeOpacity={0.18}
          strokeWidth={1.8}
        />
        {/* Reference baseline */}
        <line
          x1={90}
          y1={280}
          x2={430}
          y2={280}
          stroke={stroke}
          strokeOpacity={0.15}
          strokeDasharray="4 4"
        />

        {/* Animated Acoustic / Densitometric Wave */}
        <polyline
          fill="none"
          stroke="#0052FF"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={wavePoints.join(" ")}
        />

        {/* 5-Step Optical Densitometry Wedge (Cuña Sensitométrica Carestream) */}
        <g transform="translate(260, 382)">
          {stepOpacities.map((op, idx) => {
            const activeStep = Math.floor((t * 2) % 5) === idx;
            return (
              <g key={idx} transform={`translate(${(idx - 2) * 62}, 0)`}>
                <rect
                  x={-26}
                  y={-12}
                  width={52}
                  height={22}
                  rx={4}
                  fill="#0D1117"
                  fillOpacity={op}
                  stroke={activeStep ? "#0052FF" : stroke}
                  strokeWidth={activeStep ? 2 : 1.2}
                />
                <text
                  x={0}
                  y={22}
                  textAnchor="middle"
                  fontSize="8"
                  fontFamily="monospace"
                  fill={activeStep ? "#0052FF" : stroke}
                  opacity={activeStep ? 1 : 0.5}
                >
                  OD {(0.45 + idx * 0.65).toFixed(2)}
                </text>
              </g>
            );
          })}
        </g>
      </g>
    </g>
  );
}

export default CoffeePourMenu;
