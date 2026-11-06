"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Sparkles, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CatalogProduct, StorePillar } from "../../data/catalogData";

export interface BentoCategoryConfig {
  id: string;
  number: string;
  name: string;
  thinTitle: string;
  boldTitle: string;
  specCode: string;
  tagline: string;
  metricValue: string;
  metricLabel: string;
  image: string;
  secondaryImage?: string;
  accent: string;
  spanClass: string;
  layout: "wide-hero" | "tall-accent" | "standard" | "panoramic";
  subcategories: string[];
  pillar: StorePillar;
  customRoute?: "vidrio-personalizado" | "blindaje-personalizado";
}

export const BENTO_CATEGORIES: BentoCategoryConfig[] = [
  {
    id: "proteccion-radiologica",
    number: "01",
    name: "Protección Radiológica",
    thinTitle: "Protección",
    boldTitle: "Radiológica",
    specCode: "0.50 – 0.75 MM PB · NOM-229",
    tagline:
      "Barreras corporales ergonómicas con núcleo de plomo homogeneizado para quirófano, hemodinamia y diagnóstico.",
    metricValue: "99.4%",
    metricLabel: "Atenuación Certificada",
    image: "/products/orbit-04-mandil.png",
    secondaryImage: "/products/orbit-05-lentes.png",
    accent: "#9EC5FF",
    spanClass: "lg:col-span-7",
    layout: "wide-hero",
    subcategories: [
      "Mandiles Emplomados",
      "Collarines de Tiroides",
      "Guantes Emplomados",
      "Lentes Emplomados",
      "Protectores Gonadales",
      "Kits de Protección",
    ],
    pillar: "catalogo-general",
  },
  {
    id: "blindaje-radiologico",
    number: "02",
    name: "Blindaje Radiológico",
    thinTitle: "Blindaje",
    boldTitle: "Estructural",
    specCode: "2.0 – 2.6 MM PB · 99.9% PUREZA",
    tagline:
      "Cristales ópticos de silicato de plomo y láminas electrolíticas para muros, puertas y visores de consola.",
    metricValue: "2.6mm Pb",
    metricLabel: "Equivalencia Óptica",
    image: "/products/orbit-01-vidrio.png",
    secondaryImage: "/products/orbit-02-lamina.png",
    accent: "#B8C7E0",
    spanClass: "lg:col-span-5",
    layout: "tall-accent",
    subcategories: ["Vidrios Emplomados", "Láminas de Plomo"],
    pillar: "vidrios-emplomados",
    customRoute: "vidrio-personalizado",
  },
  {
    id: "rayos-x-y-radiologia",
    number: "03",
    name: "Rayos X y Radiología",
    thinTitle: "Rayos X &",
    boldTitle: "Radiología",
    specCode: "ISO 13485 · VELOCIDAD 400/600",
    tagline:
      "Películas ortocromáticas Fuji, chasis con pantalla emisora verde y química reveladora de alto contraste.",
    metricValue: '14"×17"',
    metricLabel: "Formatos Estándar",
    image: "/products/orbit-06-chasis.png",
    accent: "#9ED9CC",
    spanClass: "lg:col-span-4",
    layout: "standard",
    subcategories: [
      "Películas Radiográficas",
      "Chasis Radiográficos",
      "Reveladores y Fijadores",
      "Accesorios para Rayos X",
    ],
    pillar: "catalogo-general",
  },
  {
    id: "equipos-medicos",
    number: "04",
    name: "Equipos Médicos",
    thinTitle: "Equipos",
    boldTitle: "Médicos",
    specCode: "REGISTRO COFEPRIS · CE MEDICAL",
    tagline:
      "Densitómetros óseos DXA, colposcopios pantográficos y concentradores clínicos de oxígeno estacionarios.",
    metricValue: "DXA / O₂",
    metricLabel: "Alta Especialidad",
    image: "/products/bento-04-equipos.png",
    accent: "#BAE6FD",
    spanClass: "lg:col-span-4",
    layout: "standard",
    subcategories: [
      "Equipos de Diagnóstico",
      "Equipos de Ginecología",
      "Equipos de Oxigenoterapia",
      "Equipos de Rehabilitación",
    ],
    pillar: "catalogo-general",
  },
  {
    id: "insumos-medicos",
    number: "05",
    name: "Insumos Médicos",
    thinTitle: "Insumos",
    boldTitle: "Clínicos",
    specCode: "ACERO ALEMÁN · GRADO MÉDICO",
    tagline:
      "Cánulas Jarcho en acero inoxidable quirúrgico, catéteres de histerosonografía y geles acústicos conductores.",
    metricValue: "100%",
    metricLabel: "Grado Quirúrgico",
    image: "/products/bento-05-insumos.png",
    accent: "#C8BFE7",
    spanClass: "lg:col-span-4",
    layout: "standard",
    subcategories: [
      "Cánulas y Catéteres",
      "Gel para Ultrasonido",
      "Insumos de Diagnóstico",
    ],
    pillar: "catalogo-general",
  },
  {
    id: "accesorios-de-proteccion",
    number: "06",
    name: "Accesorios de Protección",
    thinTitle: "Soportes &",
    boldTitle: "Almacenamiento",
    specCode: "ACERO INOXIDABLE 304 · GRADO HOSPITALARIO",
    tagline:
      "Colgadores murales y racks móviles de 5 y 10 ganchos diseñados para preservar la integridad interna del plomo.",
    metricValue: "INOX 304",
    metricLabel: "Cero Fracturas de Plomo",
    image: "/products/bento-06-accesorios.png",
    accent: "#D6C5B3",
    spanClass: "lg:col-span-12",
    layout: "panoramic",
    subcategories: ["Colgadores para Mandiles", "Soportes y Almacenamiento"],
    pillar: "catalogo-general",
  },
];

interface CategoriesBentoGridProps {
  products: CatalogProduct[];
  onNavigateStore: (options: {
    pillar?: StorePillar;
    category?: string;
    subcategory?: string;
  }) => void;
  onNavigateCustom: (
    route: "vidrio-personalizado" | "blindaje-personalizado"
  ) => void;
  onSelectProduct: (product: CatalogProduct) => void;
}

export function CategoriesBentoGrid({
  products,
  onNavigateStore,
  onNavigateCustom,
  onSelectProduct,
}: CategoriesBentoGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [previewCatId, setPreviewCatId] = useState<string | null>(null);
  const [previewSubcat, setPreviewSubcat] = useState<string | null>(null);

  const activePreviewCat = BENTO_CATEGORIES.find(
    (c) => c.id === previewCatId
  );

  const previewProducts = React.useMemo(() => {
    if (!activePreviewCat) return [];
    return products
      .filter((p) => {
        const matchCat = p.masterCategory === activePreviewCat.name;
        const matchSub =
          !previewSubcat || p.subcategory === previewSubcat;
        return matchCat && matchSub;
      })
      .slice(0, 4);
  }, [activePreviewCat, previewSubcat, products]);

  return (
    <section
      style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
      className="relative py-24 lg:py-32 bg-[#F7F7F4] border-b border-[#0D1117]/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
        {/* ─── Minimalist Two-Weight Editorial Header ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#0D1117]/45 mb-3">
              04 — ECOSISTEMA &amp; CATÁLOGO MAESTRO
            </p>
            <h2 className="text-4xl sm:text-6xl leading-[0.94] tracking-[-0.03em] uppercase text-[#0D1117]">
              <span className="font-extralight block text-[#0D1117]/70">
                Arquitectura de
              </span>
              <span className="font-extrabold block mt-1">
                6 Categorías.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigateStore({})}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0D1117] hover:bg-[#0052FF] text-white text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 shadow-sm"
            >
              <span>Explorar Tienda Completa</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* ─── Asymmetric 12-Column Architectural Bento Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
          {BENTO_CATEGORIES.map((cat) => (
            <BentoCard
              key={cat.id}
              cat={cat}
              isHovered={hoveredId === cat.id}
              isDimmed={hoveredId !== null && hoveredId !== cat.id}
              isPreviewOpen={previewCatId === cat.id}
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
              onOpenCategory={() =>
                onNavigateStore({
                  pillar: cat.pillar,
                  category: cat.name,
                })
              }
              onSelectSubcategory={(sub) =>
                onNavigateStore({
                  pillar: cat.pillar,
                  category: cat.name,
                  subcategory: sub,
                })
              }
              onTogglePreview={(sub) => {
                if (previewCatId === cat.id && !sub) {
                  setPreviewCatId(null);
                  setPreviewSubcat(null);
                } else {
                  setPreviewCatId(cat.id);
                  setPreviewSubcat(sub ?? null);
                }
              }}
              onNavigateCustom={onNavigateCustom}
            />
          ))}
        </div>

        {/* ─── Sleek Expandable Quick-Preview Drawer (Appears on demand) ─── */}
        <AnimatePresence>
          {activePreviewCat && (
            <motion.div
              key={activePreviewCat.id}
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 12, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-[28px] bg-white border border-[#0D1117]/12 p-6 sm:p-8 shadow-[0_24px_60px_-30px_rgba(13,17,23,0.1)]">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#0D1117]/10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-[#0052FF]">
                      {activePreviewCat.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl uppercase tracking-[-0.02em] text-[#0D1117]">
                      <span className="font-extralight mr-1.5 text-[#0D1117]/70">
                        {activePreviewCat.thinTitle}
                      </span>
                      <span className="font-extrabold">
                        {activePreviewCat.boldTitle}
                      </span>
                    </h3>
                    {previewSubcat && (
                      <span className="px-3 py-1 rounded-full bg-[#F7F7F4] font-mono text-[11px] text-[#0D1117]/70">
                        {previewSubcat}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {previewSubcat && (
                      <button
                        type="button"
                        onClick={() => setPreviewSubcat(null)}
                        className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#0D1117]/55 hover:text-[#0D1117]"
                      >
                        Ver todas
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        onNavigateStore({
                          pillar: activePreviewCat.pillar,
                          category: activePreviewCat.name,
                          subcategory: previewSubcat || undefined,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0D1117] hover:bg-[#0052FF] text-white text-[11px] font-bold uppercase tracking-[0.1em] transition-colors"
                    >
                      <span>Abrir en Tienda</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewCatId(null);
                        setPreviewSubcat(null);
                      }}
                      className="w-8 h-8 rounded-full border border-[#0D1117]/12 flex items-center justify-center text-[#0D1117]/50 hover:text-[#0D1117] hover:border-[#0D1117]/30 transition-colors"
                      aria-label="Cerrar vista rápida"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {previewProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => onSelectProduct(prod)}
                      className="group cursor-pointer rounded-2xl bg-[#F7F7F4]/65 hover:bg-white border border-[#0D1117]/8 hover:border-[#0D1117]/25 p-4 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-40 rounded-xl bg-white p-4 mb-3 flex items-center justify-center overflow-hidden">
                          <img
                            src={prod.media[0]}
                            alt={prod.name}
                            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#0D1117]/45 mb-1">
                          {prod.subcategory}
                        </p>
                        <h4 className="font-semibold text-sm text-[#0D1117] line-clamp-2 group-hover:text-[#0052FF] transition-colors">
                          {prod.name}
                        </h4>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#0D1117]/8 flex items-center justify-between">
                        <span className="font-mono font-bold text-sm text-[#0D1117]">
                          $
                          {prod.basePrice.toLocaleString("es-MX", {
                            minimumFractionDigits: 2,
                          })}{" "}
                          <span className="text-[10px] font-normal text-[#0D1117]/45">
                            MXN
                          </span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#0D1117]/40 group-hover:text-[#0052FF] transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                        Individual Bento Card Tile                          */
/* -------------------------------------------------------------------------- */

interface BentoCardProps {
  cat: BentoCategoryConfig;
  isHovered: boolean;
  isDimmed: boolean;
  isPreviewOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onOpenCategory: () => void;
  onSelectSubcategory: (sub: string) => void;
  onTogglePreview: (sub?: string) => void;
  onNavigateCustom: (
    route: "vidrio-personalizado" | "blindaje-personalizado"
  ) => void;
}

function BentoCard({
  cat,
  isHovered,
  isDimmed,
  isPreviewOpen,
  onMouseEnter,
  onMouseLeave,
  onOpenCategory,
  onSelectSubcategory,
  onTogglePreview,
  onNavigateCustom,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    // Subtle magnetic parallax tilt for the product cutout
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -ny * 8, ry: nx * 10 });
  };

  const handleMouseLeaveCard = () => {
    setTilt({ rx: 0, ry: 0 });
    onMouseLeave();
  };

  const isWide = cat.layout === "wide-hero";
  const isPanoramic = cat.layout === "panoramic";
  const isTallAccent = cat.layout === "tall-accent";

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveCard}
      onClick={onOpenCategory}
      className={cn(
        "group relative rounded-[28px] border bg-white overflow-hidden cursor-pointer select-none transition-all duration-500 flex flex-col justify-between",
        cat.spanClass,
        isPanoramic
          ? "p-7 sm:p-10 min-h-[290px]"
          : isWide || isTallAccent
            ? "p-7 sm:p-10 min-h-[420px]"
            : "p-7 sm:p-8 min-h-[390px]",
        isPreviewOpen
          ? "border-[#0052FF] ring-1 ring-[#0052FF]"
          : "border-[#0D1117]/10 hover:border-[#0D1117]/25",
        isDimmed ? "opacity-80 scale-[0.995]" : "opacity-100 scale-100",
        "shadow-[0_20px_50px_-32px_rgba(13,17,23,0.08)] hover:shadow-[0_28px_65px_-28px_rgba(13,17,23,0.14)]"
      )}
    >
      {/* ─── Cursor-Tracking Radial Spotlight Glow ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 0.65 : 0.25,
          background: `radial-gradient(420px circle at ${mousePos.x}% ${mousePos.y}%, ${cat.accent}38, transparent 70%)`,
        }}
      />

      {/* ─── Subtle Technical Crosshair Grid on Hover ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-35 transition-opacity duration-500"
        style={{
          backgroundImage:
            "radial-gradient(rgba(13,17,23,0.09) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* ─── Top Bar: Number + Spec Code + Quick Preview Button ─── */}
      <div className="relative z-20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-semibold text-[#0D1117]">
            {cat.number}
          </span>
          <span className="text-[#0D1117]/20">/</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#0D1117]/50">
            {cat.specCode}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePreview();
            }}
            className={cn(
              "px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.1em] transition-all border",
              isPreviewOpen
                ? "bg-[#0052FF] text-white border-[#0052FF]"
                : "bg-[#F7F7F4]/90 hover:bg-[#0D1117] text-[#0D1117]/65 hover:text-white border-[#0D1117]/10"
            )}
          >
            Vista rápida
          </button>

          <span className="w-8 h-8 rounded-full border border-[#0D1117]/12 bg-white/80 group-hover:bg-[#0D1117] group-hover:border-[#0D1117] group-hover:text-white flex items-center justify-center transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>

      {/* ─── Center Body: Adaptive per Bento Tile Layout ─── */}
      <div
        className={cn(
          "relative z-10 my-auto py-4",
          isPanoramic
            ? "grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            : isWide
              ? "grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
              : "flex flex-col justify-between gap-4"
        )}
      >
        {/* Editorial Title & Description */}
        <div
          className={cn(
            isPanoramic
              ? "lg:col-span-5"
              : isWide
                ? "sm:col-span-6"
                : "w-full"
          )}
        >
          <h3 className="uppercase leading-[0.94] tracking-[-0.03em] text-[#0D1117]">
            <span
              className={cn(
                "block font-extralight text-[#0D1117]/70",
                isWide || isPanoramic
                  ? "text-3xl sm:text-4xl"
                  : "text-2xl sm:text-3xl"
              )}
            >
              {cat.thinTitle}
            </span>
            <span
              className={cn(
                "block font-extrabold mt-0.5",
                isWide || isPanoramic
                  ? "text-3xl sm:text-4xl"
                  : "text-2xl sm:text-3xl"
              )}
            >
              {cat.boldTitle}
            </span>
          </h3>

          <p className="mt-3 text-[13.5px] text-[#0D1117]/60 leading-relaxed max-w-[44ch]">
            {cat.tagline}
          </p>

          {cat.customRoute && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigateCustom(cat.customRoute!);
              }}
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] font-semibold text-[#0052FF] hover:underline underline-offset-4"
            >
              <Sparkles className="w-3 h-3" />
              <span>Abrir Calculadora a Medida</span>
            </button>
          )}
        </div>

        {/* Studio Cutout Image Stage with Magnetic Levitation & Orbital Ring */}
        <div
          className={cn(
            "relative flex items-center justify-center",
            isPanoramic
              ? "lg:col-span-4 h-44 sm:h-48"
              : isWide
                ? "sm:col-span-6 h-52 sm:h-60"
                : "w-full h-44 sm:h-48"
          )}
        >
          {/* Subtle Architectural Ring Behind Cutout */}
          <div
            aria-hidden
            className="pointer-events-none absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-dashed border-[#0D1117]/12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"
            style={{
              background: `radial-gradient(circle, ${cat.accent}45 0%, transparent 72%)`,
            }}
          />

          {/* Giant Subtle Metric Watermark Behind Product */}
          <span
            aria-hidden
            className="pointer-events-none select-none absolute font-extralight text-[64px] sm:text-[76px] leading-none tracking-[-0.05em] text-[#0D1117]/[0.045] transition-transform duration-500 group-hover:scale-105"
          >
            {cat.metricValue}
          </span>

          {/* Primary Product Studio Cutout */}
          <div
            style={{
              transform: `perspective(600px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg)`,
              transition: "transform 180ms ease-out",
            }}
            className="relative z-10 w-full h-full flex items-center justify-center"
          >
            <img
              src={cat.image}
              alt={cat.name}
              draggable={false}
              className="max-h-full max-w-[78%] object-contain drop-shadow-[0_18px_24px_rgba(13,17,23,0.16)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:-translate-y-1.5"
            />

            {/* Optional Secondary Floating Cutout for Hero / Accent Tiles */}
            {cat.secondaryImage && (
              <img
                src={cat.secondaryImage}
                alt=""
                draggable={false}
                className="hidden sm:block absolute -right-2 bottom-0 w-24 h-24 object-contain drop-shadow-[0_12px_18px_rgba(13,17,23,0.18)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-6"
              />
            )}
          </div>
        </div>

        {/* For Panoramic Tile: Right Column Subcategories List */}
        {isPanoramic && (
          <div className="lg:col-span-3 flex flex-col justify-center gap-2 border-t lg:border-t-0 lg:border-l border-[#0D1117]/10 pt-4 lg:pt-0 lg:pl-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#0D1117]/40">
              SUBCATEGORÍAS DIRECTAS
            </span>
            {cat.subcategories.map((sub, idx) => (
              <button
                key={sub}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSubcategory(sub);
                }}
                className="group/sub flex items-center justify-between py-1.5 text-left text-xs font-medium text-[#0D1117]/75 hover:text-[#0052FF] border-b border-[#0D1117]/[0.06] last:border-b-0 transition-colors"
              >
                <span>{sub}</span>
                <span className="font-mono text-[10px] text-[#0D1117]/35 group-hover/sub:text-[#0052FF]">
                  0{idx + 1} ↗
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─── Bottom Minimalist Subcategory Strip (Non-panoramic tiles) ─── */}
      {!isPanoramic && (
        <div className="relative z-20 pt-4 border-t border-[#0D1117]/[0.08] flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {cat.subcategories.map((sub, idx) => (
              <button
                key={sub}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSubcategory(sub);
                }}
                className="inline-flex items-center gap-1 text-[11.5px] text-[#0D1117]/60 hover:text-[#0052FF] font-medium transition-colors"
              >
                <span className="font-mono text-[9.5px] text-[#0D1117]/30">
                  0{idx + 1}
                </span>
                <span className="hover:underline underline-offset-4">
                  {sub}
                </span>
              </button>
            ))}
          </div>

          <span className="font-mono text-[10.5px] font-semibold text-[#0D1117]/45 group-hover:text-[#0D1117] transition-colors shrink-0">
            {cat.metricValue}
          </span>
        </div>
      )}
    </div>
  );
}

export default CategoriesBentoGrid;

