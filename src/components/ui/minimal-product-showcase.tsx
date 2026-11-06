"use client";

/**
 * ARXEM Minimalist Studio Product Showcase (Section 06).
 *
 * A breathable, industrial-design-inspired product gallery ('Outfit' two-weight typography):
 * - Smooth sliding 3-pillar filter (01 Equipamiento & Insumos · 02 Vidrios Emplomados · 03 Blindaje de Plomo)
 * - Studio transparent product cutouts on interactive pedestals with cursor-tracking radial spotlight
 *   and 3D magnetic levitation.
 * - Live inline variant/measure scrubber on each card (clicking a measure updates the price & SKU live).
 * - Instant "+ Agregar" feedback and one-click product inspection.
 */

import React, { useState, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Plus, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { CatalogProduct, StorePillar } from "../../data/catalogData";

interface MinimalProductShowcaseProps {
  products: CatalogProduct[];
  activePillar: StorePillar;
  onChangePillar: (pillar: StorePillar) => void;
  onSelectProduct: (product: CatalogProduct) => void;
  onAddToCart: (
    product: CatalogProduct,
    variantLabel?: string,
    price?: number
  ) => void;
  onOpenStore: (pillar: StorePillar) => void;
}

const PILLAR_TABS: {
  id: StorePillar;
  num: string;
  label: string;
  accent: string;
}[] = [
  {
    id: "catalogo-general",
    num: "01",
    label: "Equipamiento & Insumos",
    accent: "#9EC5FF",
  },
  {
    id: "vidrios-emplomados",
    num: "02",
    label: "Vidrios Emplomados",
    accent: "#B8C7E0",
  },
  {
    id: "blindaje",
    num: "03",
    label: "Blindaje (Lámina Pb)",
    accent: "#D6C5B3",
  },
];

/**
 * Maps each product to its matching high-resolution studio transparent cutout PNG
 * so the showcase maintains a 100% cohesive, background-free industrial aesthetic.
 */
function getStudioCutout(product: CatalogProduct): string {
  const sub = product.subcategory.toLowerCase();
  const cat = product.masterCategory.toLowerCase();
  const name = product.name.toLowerCase();

  if (
    product.storePillar === "vidrios-emplomados" ||
    sub.includes("vidrio") ||
    name.includes("vidrio")
  ) {
    return "/products/orbit-01-vidrio.png";
  }
  if (
    product.storePillar === "blindaje" ||
    sub.includes("lámina") ||
    sub.includes("lamina") ||
    name.includes("plomo")
  ) {
    return "/products/orbit-02-lamina.png";
  }
  if (sub.includes("lente") || name.includes("lente") || name.includes("gafa")) {
    return "/products/orbit-05-lentes.png";
  }
  if (
    sub.includes("guante") ||
    name.includes("chaleco") ||
    name.includes("fald")
  ) {
    return "/products/orbit-03-chaleco.png";
  }
  if (
    sub.includes("mandil") ||
    sub.includes("collar") ||
    sub.includes("kit") ||
     sub.includes("gonadal")
  ) {
    return "/products/orbit-04-mandil.png";
  }
  if (
    sub.includes("colgador") ||
    sub.includes("soporte") ||
    cat.includes("accesorios de protección")
  ) {
    return "/products/bento-06-accesorios.png";
  }
  if (cat.includes("equipos médicos") || sub.includes("equipo")) {
    return "/products/bento-04-equipos.png";
  }
  if (
    cat.includes("insumos médicos") ||
    sub.includes("cánula") ||
    sub.includes("gel")
  ) {
    return "/products/bento-05-insumos.png";
  }
  if (
    sub.includes("chasis") ||
    sub.includes("película") ||
    sub.includes("revelador") ||
    cat.includes("rayos x")
  ) {
    return "/products/orbit-06-chasis.png";
  }
  return "/products/orbit-04-mandil.png";
}

export function MinimalProductShowcase({
  products,
  activePillar,
  onChangePillar,
  onSelectProduct,
  onAddToCart,
  onOpenStore,
}: MinimalProductShowcaseProps) {
  // Curate 6 diverse flagship products for the active pillar
  const curatedProducts = useMemo(() => {
    const filtered = products.filter((p) => p.storePillar === activePillar);
    if (activePillar !== "catalogo-general") {
      return filtered.slice(0, 6);
    }
    // For general catalog, pick a balanced mix across subcategories so every card is distinct
    const picked: CatalogProduct[] = [];
    const seenSubcats = new Set<string>();
    for (const p of filtered) {
      if (!seenSubcats.has(p.subcategory) && picked.length < 6) {
        seenSubcats.add(p.subcategory);
        picked.push(p);
      }
    }
    for (const p of filtered) {
      if (picked.length >= 6) break;
      if (!picked.some((x) => x.id === p.id)) {
        picked.push(p);
      }
    }
    return picked;
  }, [products, activePillar]);

  const activeTabMeta =
    PILLAR_TABS.find((t) => t.id === activePillar) ?? PILLAR_TABS[0];

  return (
    <section
      style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
      className="relative py-24 lg:py-32 bg-[#F7F7F4] border-b border-[#0D1117]/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
        {/* ─── Top Minimalist Editorial Header + 3-Pillar Sliding Switcher ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#0D1117]/45 mb-3">
              06 — SELECCIÓN DE CATÁLOGO &amp; TIENDA DIRECTA
            </p>
            <h2 className="text-4xl sm:text-6xl leading-[0.94] tracking-[-0.03em] uppercase text-[#0D1117]">
              <span className="font-extralight block text-[#0D1117]/70">
                Ingeniería de
              </span>
              <span className="font-extrabold block mt-1">
                Catálogo.
              </span>
            </h2>
          </div>

          {/* Minimalist Sliding 3-Pillar Pill Switcher */}
          <div
            role="tablist"
            aria-label="Filtrar línea de productos"
            className="relative inline-flex flex-wrap p-1.5 rounded-full bg-white border border-[#0D1117]/10 self-start lg:self-auto shadow-sm"
          >
            {PILLAR_TABS.map((tab) => {
              const active = activePillar === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onChangePillar(tab.id)}
                  className={cn(
                    "relative z-10 px-4 sm:px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.08em] transition-colors duration-300 flex items-center gap-2",
                    active
                      ? "text-white font-bold"
                      : "text-[#0D1117]/60 hover:text-[#0D1117] font-medium"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="arxem-showcase-pillar-pill"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 28,
                      }}
                      className="absolute inset-0 rounded-full bg-[#0D1117] -z-10"
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

        {/* ─── Minimalist 3-Column Studio Pedestal Grid ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {curatedProducts.map((product, idx) => (
              <StudioProductCard
                key={product.id}
                product={product}
                index={idx}
                accent={activeTabMeta.accent}
                onSelectProduct={() => onSelectProduct(product)}
                onAddToCart={onAddToCart}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ─── Minimalist Bottom Catalog Footer Bar ─── */}
        <div className="mt-14 pt-8 border-t border-[#0D1117]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#0D1117]/45 uppercase tracking-[0.14em]">
              84 PRODUCTOS &amp; VARIANTES CERTIFICADAS EN STOCK
            </span>
          </div>

          <button
            type="button"
            onClick={() => onOpenStore(activePillar)}
            className="group inline-flex items-center gap-3.5 px-7 py-4 rounded-full bg-[#0D1117] hover:bg-[#0052FF] text-white text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 shadow-sm"
          >
            <span>Explorar Catálogo Completo</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                      Minimalist Studio Pedestal Card                       */
/* -------------------------------------------------------------------------- */

interface StudioProductCardProps {
  product: CatalogProduct;
  index: number;
  accent: string;
  onSelectProduct: () => void;
  onAddToCart: (
    product: CatalogProduct,
    variantLabel?: string,
    price?: number
  ) => void;
}

function StudioProductCard({
  product,
  index,
  accent,
  onSelectProduct,
  onAddToCart,
}: StudioProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const hasVariants = product.variants && product.variants.length > 0;
  const activeVariant = hasVariants
    ? product.variants[selectedVariantIdx] ?? product.variants[0]
    : null;
  const displayPrice = activeVariant ? activeVariant.price : product.basePrice;
  const studioImg = getStudioCutout(product);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -ny * 7, ry: nx * 9 });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(
      product,
      activeVariant ? activeVariant.label : undefined,
      displayPrice
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const num = String(index + 1).padStart(2, "0");
  const specLabel =
    product.leadEquivalency || product.normCompliance.split("/")[0].trim();

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelectProduct}
      className="group relative rounded-[28px] bg-white border border-[#0D1117]/10 hover:border-[#0D1117]/25 p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none overflow-hidden transition-all duration-500 shadow-[0_20px_50px_-34px_rgba(13,17,23,0.08)] hover:shadow-[0_28px_65px_-28px_rgba(13,17,23,0.15)]"
    >
      {/* Cursor-Tracking Radial Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-65 transition-opacity duration-500"
        style={{
          background: `radial-gradient(380px circle at ${mousePos.x}% ${mousePos.y}%, ${accent}38, transparent 70%)`,
        }}
      />

      {/* ─── Top Minimalist Index & Spec Hairline ─── */}
      <div className="relative z-10 flex items-center justify-between gap-2 pb-3 border-b border-[#0D1117]/[0.07]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-xs font-semibold text-[#0D1117]">
            {num}
          </span>
          <span className="text-[#0D1117]/20">/</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#0D1117]/50 truncate">
            {product.subcategory}
          </span>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#0052FF] font-semibold shrink-0">
          {specLabel}
        </span>
      </div>

      {/* ─── Center Studio Cutout Pedestal ─── */}
      <div className="relative z-10 h-56 sm:h-60 my-3 flex items-center justify-center">
        {/* Subtle Orbital Calibration Ring */}
        <div
          aria-hidden
          className="pointer-events-none absolute w-40 h-40 rounded-full border border-dashed border-[#0D1117]/10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"
          style={{
            background: `radial-gradient(circle, ${accent}35 0%, transparent 72%)`,
          }}
        />

        {/* Quick-Inspect Button on Hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct();
          }}
          title="Ver ficha técnica y variantes"
          className="absolute top-2 right-0 z-20 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F7F7F4] hover:bg-[#0D1117] text-[#0D1117]/70 hover:text-white font-mono text-[10px] uppercase tracking-[0.1em]"
        >
          <Eye className="w-3 h-3" />
          <span>Ficha</span>
        </button>

        {/* 3D Magnetic Product Cutout */}
        <div
          style={{
            transform: `perspective(600px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg)`,
            transition: "transform 180ms ease-out",
          }}
          className="relative z-10 w-full h-full flex items-center justify-center p-2"
        >
          <img
            src={studioImg}
            alt={product.name}
            draggable={false}
            className="max-h-full max-w-[82%] object-contain drop-shadow-[0_18px_24px_rgba(13,17,23,0.16)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-hover:-translate-y-1"
          />
        </div>
      </div>

      {/* ─── Bottom Info, Inline Variant Scrubber & Price Bar ─── */}
      <div className="relative z-10 space-y-3.5">
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-[-0.02em] text-[#0D1117] group-hover:text-[#0052FF] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#0D1117]/50 line-clamp-1 mt-0.5">
            {product.normCompliance}
          </p>
        </div>

        {/* Interactive Inline Variant / Measure Scrubber (Up to 4 quick chips) */}
        {hasVariants ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5"
          >
            {product.variants.slice(0, 4).map((v, vIdx) => {
              const isSel = vIdx === selectedVariantIdx;
              return (
                <button
                  key={v.id}
                  type="button"
                  onMouseEnter={() => setSelectedVariantIdx(vIdx)}
                  onClick={() => setSelectedVariantIdx(vIdx)}
                  className={cn(
                    "px-2.5 py-1 rounded-full font-mono text-[10px] transition-all shrink-0 border",
                    isSel
                      ? "bg-[#0D1117] text-white border-[#0D1117] font-semibold"
                      : "bg-[#F7F7F4] hover:bg-[#0D1117]/10 text-[#0D1117]/65 border-transparent"
                  )}
                >
                  {v.label}
                </button>
              );
            })}
            {product.variants.length > 4 && (
              <span className="font-mono text-[10px] text-[#0D1117]/40 pl-1 shrink-0">
                +{product.variants.length - 4}
              </span>
            )}
          </div>
        ) : (
          <div className="h-[26px] flex items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#0D1117]/40">
              ENTREGA INMEDIATA · CFDI 4.0
            </span>
          </div>
        )}

        {/* Minimalist Price & 1-Click Add Footer */}
        <div className="pt-3.5 border-t border-[#0D1117]/[0.08] flex items-center justify-between gap-3">
          <div>
            <span className="block font-mono text-[9.5px] uppercase tracking-[0.12em] text-[#0D1117]/40">
              {activeVariant ? `Medida ${activeVariant.label}` : "Precio Neto"}
            </span>
            <div className="font-mono text-lg font-extrabold text-[#0D1117] tracking-tight">
              $
              {displayPrice.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
              })}{" "}
              <span className="text-[10px] font-normal text-[#0D1117]/45">
                MXN
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.08em] transition-all duration-300",
              justAdded
                ? "bg-emerald-600 text-white"
                : "bg-[#0D1117] hover:bg-[#0052FF] text-white"
            )}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Listo</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MinimalProductShowcase;

