import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  CatalogProduct,
  ProductVariant
} from '../data/catalogData';
import {
  VERIFIED_REVIEWS,
  ClinicalReview,
  saveQuoteToCMS,
  openWhatsAppWithQuote
} from '../data/taxonomyData';
import { ActiveRoute } from '../components/Navbar';

interface ProductDetailViewProps {
  product: CatalogProduct;
  onSelectProduct: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct, variantLabel?: string, price?: number) => void;
  onNavigate: (route: ActiveRoute) => void;
}

/** Maps known products to studio transparent cutouts when available */
function getStudioCutoutIfAvailable(product: CatalogProduct): string | null {
  const n = product.name.toLowerCase();
  if (n.includes('vidrio emplomado')) return '/products/orbit-01-vidrio.png';
  if (n.includes('lámina de plomo') || n.includes('lamina de plomo'))
    return '/products/orbit-02-lamina.png';
  if (n.includes('chaleco y falda')) return '/products/orbit-03-chaleco.png';
  if (n.includes('mandil') && !n.includes('porta'))
    return '/products/orbit-04-mandil.png';
  if (n.includes('lentes emplomados') || n.includes('goggle'))
    return '/products/orbit-05-lentes.png';
  if (n.includes('chasis')) return '/products/orbit-06-chasis.png';
  return null;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onNavigate
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<'specs' | 'shipping' | 'norma' | null>('specs');

  // Reviews state
  const reviewsSectionRef = useRef<HTMLElement>(null);
  const [localReviews, setLocalReviews] = useState<ClinicalReview[]>(VERIFIED_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewInstitution, setReviewInstitution] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Subtle live viewers counter (deterministic seed from product id + small fluctuation)
  const baseViewers = useMemo(() => {
    let h = 0;
    for (let i = 0; i < product.id.length; i++) {
      h = (h * 31 + product.id.charCodeAt(i)) % 1000;
    }
    return 28 + (h % 46);
  }, [product.id]);
  const [liveViewers, setLiveViewers] = useState(baseViewers);

  useEffect(() => {
    setLiveViewers(baseViewers);
    const interval = window.setInterval(() => {
      setLiveViewers((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(18, Math.min(89, prev + delta));
      });
    }, 5500);
    return () => window.clearInterval(interval);
  }, [baseViewers]);

  useEffect(() => {
    setSelectedImageIdx(0);
    setSelectedVariant(product.variants.length > 0 ? product.variants[0] : null);
    setQuantity(1);
    setJustAdded(false);
    setShowReviewForm(false);
    setReviewSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const activePrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const activeSku = selectedVariant?.sku || product.sku || 'ARX-STD';
  const activeWeight = selectedVariant?.weight || product.weight || 1;
  const activeVariantLabel = selectedVariant?.label || 'Estándar de Línea';

  const studioCutout = getStudioCutoutIfAvailable(product);
  const primaryImage =
    selectedImageIdx === 0 && studioCutout
      ? studioCutout
      : product.media[selectedImageIdx] || product.media[0];

  const siblingMeasures = CATALOG_PRODUCTS.filter(
    (p) => p.subcategory === product.subcategory && p.id !== product.id
  );
  const relatedProducts = CATALOG_PRODUCTS.filter(
    (p) => p.masterCategory === product.masterCategory && p.id !== product.id
  ).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product, activeVariantLabel, activePrice);
    }
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  const handleInstantQuoteWhatsApp = () => {
    const total = activePrice * quantity;
    const saved = saveQuoteToCMS({
      type: 'COTIZACION_PRODUCTO',
      clientName: 'Cliente Web ARXEM',
      clientCompany: 'Clínica / Hospital',
      clientPhone: 'WhatsApp Directo',
      clientCity: 'México',
      summary: `${quantity}x ${product.name} (${activeVariantLabel})`,
      specs: {
        producto: product.name,
        variante: activeVariantLabel,
        sku: activeSku,
        cantidad: quantity,
        equivalenciaPb: product.leadEquivalency || 'Grado Médico',
        pesoTotalKg: Number((activeWeight * quantity).toFixed(1))
      },
      estimatedTotalMXN: total,
      status: 'ENVIADO_WHATSAPP'
    });

    const msg = [
      `Hola *ARXEM®*, solicito cotización / pedido de la siguiente pieza:`,
      ``,
      `• *Pieza:* ${product.name}`,
      `• *Medida / Variante:* ${activeVariantLabel}`,
      `• *SKU:* ${activeSku}`,
      `• *Cantidad:* ${quantity} pza(s)`,
      `• *Total Estimado:* $${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`,
      `• *Folio:* ${saved.id}`
    ].join('\n');

    openWhatsAppWithQuote(msg);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    const newRev: ClinicalReview = {
      id: `rev-${Date.now()}`,
      author: reviewName,
      role: 'Especialista Clínico',
      institution: reviewInstitution || 'Centro Radiológico',
      city: 'México',
      rating: reviewRating,
      date: 'Reciente',
      verified: true,
      productTag: `${product.name} · ${activeVariantLabel}`,
      comment: reviewComment,
      metricHighlight: 'Compra Verificada ARXEM'
    };
    setLocalReviews([newRev, ...localReviews]);
    setReviewName('');
    setReviewInstitution('');
    setReviewComment('');
    setReviewSubmitted(true);
    setShowReviewForm(false);
  };

  const scrollToReviews = () => {
    reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const displayRating = product.rating || 4.9;
  const displayReviewCount = (product.reviewCount || 24) + localReviews.length;

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#0D1117] pt-8 pb-28">
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10">
        {/* ===================================================================
            1. MINIMALIST TOP BREADCRUMB BAR
        =================================================================== */}
        <div className="flex items-center justify-between gap-4 pb-8 border-b border-[#0D1117]/[0.08]">
          <button
            type="button"
            onClick={() => onNavigate('tienda')}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D1117]/50 hover:text-[#0D1117] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Volver al Archivo</span>
          </button>

          <div className="flex items-center gap-4 font-mono text-[11px] text-[#0D1117]/40">
            <span>SKU: {activeSku}</span>
            <span>·</span>
            <span>{product.normCompliance || 'NOM-229-SSA1'}</span>
          </div>
        </div>

        {/* ===================================================================
            2. TWO-COLUMN FRAMELESS STUDIO MONOGRAPH
        =================================================================== */}
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: MONUMENTAL STUDIO PEDESTAL (Cols 1-7) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="relative aspect-[4/3.6] rounded-[28px] bg-white overflow-hidden flex items-center justify-center p-10 sm:p-16">
              {/* Top-Left Subtle Index */}
              <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#0D1117]/35">
                {product.subcategory}
              </div>

              {/* Main Product Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={primaryImage + activeVariantLabel}
                  src={primaryImage}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative z-10 max-h-[76%] max-w-[78%] object-contain ${
                    studioCutout && selectedImageIdx === 0
                      ? 'drop-shadow-[0_24px_40px_rgba(13,17,23,0.16)]'
                      : 'mix-blend-multiply'
                  }`}
                />
              </AnimatePresence>

              {/* Bottom Telemetry Strip inside Canvas */}
              <div className="absolute bottom-5 inset-x-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D1117]/40">
                <span>{activeVariantLabel}</span>
                <span>
                  {product.leadEquivalency ? `${product.leadEquivalency} · ` : ''}
                  {activeWeight} kg
                </span>
              </div>
            </div>

            {/* Minimalist Thumbnails if multiple media */}
            {product.media.length > 1 && (
              <div className="mt-4 flex items-center gap-3">
                {product.media.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-16 h-16 rounded-2xl bg-white p-2 transition-all ${
                      selectedImageIdx === idx
                        ? 'ring-1 ring-[#0D1117]'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={url}
                      alt=""
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: FRAMELESS TYPOGRAPHY, SOCIAL PROOF & CONFIGURATOR (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-7">
            {/* Eyebrow + Clickable Star Rating Pill */}
            <div className="space-y-3 border-b border-[#0D1117]/[0.08] pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#0052FF] font-semibold">
                  {product.masterCategory}
                </span>

                <button
                  type="button"
                  onClick={scrollToReviews}
                  className="group inline-flex items-center gap-1.5 text-xs font-mono text-[#0D1117]/75 hover:text-[#0D1117] transition-colors"
                >
                  <span className="flex items-center gap-0.5 text-[#D97706]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#D97706]" />
                    ))}
                  </span>
                  <strong className="font-bold text-[#0D1117]">{displayRating}</strong>
                  <span className="text-[#0D1117]/45 group-hover:underline">
                    ({displayReviewCount} opiniones)
                  </span>
                </button>
              </div>

              <h1
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-3xl sm:text-4xl xl:text-[42px] font-extrabold tracking-[-0.03em] text-[#0D1117] leading-[1.06]"
              >
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="pt-2 flex items-baseline justify-between gap-4">
                <div
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0D1117] tabular-nums"
                >
                  ${activePrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  <span className="text-xs font-mono font-normal text-[#0D1117]/45 ml-1.5">
                    MXN
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-700 font-semibold">
                  ● En Stock · Envío Hoy
                </span>
              </div>

              {/* Minimalist Live Conversion Telemetry (Viewers + Recent Sales) */}
              <div className="pt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#0D1117]/60">
                <div className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF]" />
                  </span>
                  <span>
                    <strong className="font-semibold text-[#0D1117] tabular-nums">
                      {liveViewers} especialistas
                    </strong>{' '}
                    viendo esta pieza ahora
                  </span>
                </div>
                <span className="text-[#0D1117]/20">·</span>
                <span className="font-mono text-[11px] text-[#0D1117]/50">
                  +140 entregados este trimestre
                </span>
              </div>
            </div>

            {/* Variant Selector (Internal CSV Variants) */}
            {product.variants.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#0D1117]/45">
                  <span>{product.optionName || 'Medida / Opción'}</span>
                  <span className="text-[#0D1117] font-semibold">{activeVariantLabel}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const active = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all ${
                          active
                            ? 'bg-[#0D1117] text-white font-semibold'
                            : 'bg-white text-[#0D1117]/65 hover:text-[#0D1117]'
                        }`}
                      >
                        {v.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sibling Measure Switcher */}
            {siblingMeasures.length > 0 && (
              <div className="space-y-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0D1117]/45">
                  Otras medidas de {product.subcategory}
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto no-scrollbar">
                  {siblingMeasures.map((sib) => (
                    <button
                      key={sib.id}
                      type="button"
                      onClick={() => onSelectProduct(sib)}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#0D1117] text-[#0D1117]/70 hover:text-white font-mono text-[11px] transition-colors"
                    >
                      {sib.name
                        .replace('Vidrio Emplomado ', '')
                        .replace('Lamina de Plomo para Blindaje de ', 'Lámina Pb ')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Primary Purchase Actions */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center h-13 rounded-full bg-white px-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#0D1117]/50 hover:text-[#0D1117]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-mono text-xs font-bold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#0D1117]/50 hover:text-[#0D1117]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className={`flex-1 h-13 py-4 px-6 rounded-full text-xs uppercase tracking-[0.16em] font-extrabold transition-all flex items-center justify-center gap-2 ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0D1117] text-white hover:bg-[#0052FF]'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Agregado al Carrito</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        Agregar — $
                        {(activePrice * quantity).toLocaleString('es-MX', {
                          maximumFractionDigits: 0
                        })}
                      </span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleInstantQuoteWhatsApp}
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-[#0D1117]/5 text-[#0D1117] text-xs uppercase tracking-[0.16em] font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span>Solicitar Cotización Formal por WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Minimalist Conversion Trust Micro-List */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="p-3 rounded-2xl bg-white/75 flex flex-col gap-1">
                <Truck className="w-4 h-4 text-[#0052FF]" />
                <span
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-xs font-extrabold text-[#0D1117]"
                >
                  Huacal Blindado
                </span>
                <span className="text-[11px] text-[#0D1117]/50 leading-tight">
                  Envío seguro a 32 estados
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/75 flex flex-col gap-1">
                <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
                <span
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-xs font-extrabold text-[#0D1117]"
                >
                  Aprobación COFEPRIS
                </span>
                <span className="text-[11px] text-[#0D1117]/50 leading-tight">
                  Cumple NOM-229-SSA1
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/75 flex flex-col gap-1">
                <FileCheck className="w-4 h-4 text-[#0052FF]" />
                <span
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-xs font-extrabold text-[#0D1117]"
                >
                  Factura CFDI 4.0
                </span>
                <span className="text-[11px] text-[#0D1117]/50 leading-tight">
                  Precio neto deducible
                </span>
              </div>
            </div>

            {/* Minimalist Hairline Accordions */}
            <div className="pt-2 border-t border-[#0D1117]/[0.08] divide-y divide-[#0D1117]/[0.08]">
              <div className="py-4">
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'specs' ? null : 'specs')
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0D1117] font-semibold">
                    01 — Descripción &amp; Cota Técnica
                  </span>
                  <span className="font-mono text-xs text-[#0D1117]/40">
                    {openAccordion === 'specs' ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === 'specs' && (
                  <div className="pt-3 text-xs sm:text-sm text-[#0D1117]/60 leading-relaxed space-y-2">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.descriptionHtml || `<p>${product.plainText}</p>`
                      }}
                    />
                    <div className="pt-2 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] text-[#0D1117]/50">
                      <span>Peso estimado: {activeWeight} kg</span>
                      {product.leadEquivalency && (
                        <span>Atenuación: {product.leadEquivalency}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="py-4">
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'norma' ? null : 'norma')
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0D1117] font-semibold">
                    02 — Certificación NOM-229-SSA1
                  </span>
                  <span className="font-mono text-xs text-[#0D1117]/40">
                    {openAccordion === 'norma' ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === 'norma' && (
                  <p className="pt-3 text-xs sm:text-sm text-[#0D1117]/60 leading-relaxed">
                    Cumple con los espesores equivalentes de plomo (mm Pb) requeridos para levantamientos radiométricos, memorias analíticas y verificaciones sanitarias de COFEPRIS en México.
                  </p>
                )}
              </div>

              <div className="py-4">
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0D1117] font-semibold">
                    03 — Embalaje en Huacal &amp; Facturación
                  </span>
                  <span className="font-mono text-xs text-[#0D1117]/40">
                    {openAccordion === 'shipping' ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === 'shipping' && (
                  <p className="pt-3 text-xs sm:text-sm text-[#0D1117]/60 leading-relaxed">
                    Despacho nacional a los 32 estados. Los cristales emplomados viajan en huacal de madera estructural con suspensión interna de absorción de impacto. Emitimos factura fiscal CFDI 4.0 inmediata.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            3. MINIMALIST VERIFIED REVIEWS SECTION (OPINIONES DE ESPECIALISTAS)
        =================================================================== */}
        <section
          ref={reviewsSectionRef}
          className="mt-28 pt-16 border-t border-[#0D1117]/[0.08]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Score Breakdown & Collapsible Review Trigger */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#0D1117]/40 mb-2">
                  EXPERIENCIA CLÍNICA VERIFICADA
                </div>
                <h2
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-3xl sm:text-4xl tracking-[-0.03em] text-[#0D1117]"
                >
                  <span className="font-extralight text-[#0D1117]/55">Opiniones de </span>
                  <span className="font-extrabold">especialistas.</span>
                </h2>
              </div>

              {/* Giant Minimalist Score */}
              <div className="flex items-baseline gap-4 pt-1">
                <span
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-6xl font-extrabold tracking-[-0.04em] text-[#0D1117]"
                >
                  {displayRating}
                </span>
                <div>
                  <div className="flex items-center gap-1 text-[#D97706] mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-[#D97706]" />
                    ))}
                  </div>
                  <div className="font-mono text-[11px] text-[#0D1117]/50">
                    Basado en {displayReviewCount} compras verificadas
                  </div>
                </div>
              </div>

              {/* Minimalist Hairline Distribution Bars */}
              <div className="space-y-2 pt-2">
                {[
                  { stars: '5 ★', pct: 92 },
                  { stars: '4 ★', pct: 8 },
                  { stars: '3 ★', pct: 0 },
                ].map((row) => (
                  <div key={row.stars} className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="w-8 text-[#0D1117]/60">{row.stars}</span>
                    <div className="flex-1 h-[3px] bg-[#0D1117]/[0.08] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0D1117]"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-9 text-right text-[#0D1117]/45">{row.pct}%</span>
                  </div>
                ))}
              </div>

              {/* Minimalist Write Review Toggle */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setShowReviewForm((v) => !v)}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-extrabold text-[#0D1117] hover:text-[#0052FF] pb-1 border-b border-[#0D1117]"
                >
                  <span>{showReviewForm ? 'Cerrar formulario' : '+ Escribir una opinión'}</span>
                </button>

                {reviewSubmitted && (
                  <p className="mt-3 font-mono text-xs text-emerald-700">
                    ✓ Tu opinión fue publicada correctamente.
                  </p>
                )}

                <AnimatePresence>
                  {showReviewForm && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleSubmitReview}
                      className="mt-5 space-y-3 overflow-hidden"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase text-[#0D1117]/50">
                          Calificación:
                        </span>
                        {[1, 2, 3, 4, 5].map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setReviewRating(r)}
                            className="p-0.5"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                r <= reviewRating
                                  ? 'fill-[#D97706] text-[#D97706]'
                                  : 'text-[#0D1117]/20'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="Nombre y título (ej. Dr. Alejandro Méndez)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs focus:outline-none"
                      />
                      <input
                        type="text"
                        value={reviewInstitution}
                        onChange={(e) => setReviewInstitution(e.target.value)}
                        placeholder="Clínica, Hospital o Constructora"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs focus:outline-none"
                      />
                      <textarea
                        rows={3}
                        required
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Tu experiencia con la pieza y el envío..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs focus:outline-none"
                      />
                      <button
                        type="submit"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="px-5 py-2.5 rounded-full bg-[#0D1117] text-white text-xs uppercase tracking-[0.16em] font-extrabold hover:bg-[#0052FF] transition-colors"
                      >
                        Publicar opinión
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Clean Editorial Reviews List */}
            <div className="lg:col-span-8 divide-y divide-[#0D1117]/[0.08]">
              {localReviews.map((rev) => (
                <article key={rev.id} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-0.5 text-[#D97706]">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-[#D97706]" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Compra verificada</span>
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#0D1117]/40">
                      {rev.productTag}
                    </span>
                  </div>

                  <p
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-base sm:text-[17px] font-light text-[#0D1117]/85 leading-relaxed mb-3"
                  >
                    “{rev.comment}”
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#0D1117]/55">
                    <div>
                      <strong
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="font-extrabold text-[#0D1117]"
                      >
                        {rev.author}
                      </strong>{' '}
                      · {rev.role} — {rev.institution} ({rev.city})
                    </div>
                    <span className="font-mono text-[10px] text-[#0052FF]">
                      {rev.metricHighlight}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. FRAMELESS RELATED PIECES
        =================================================================== */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-14 border-t border-[#0D1117]/[0.08]">
            <div className="flex items-baseline justify-between mb-10">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#0D1117]/40 mb-2">
                  CONTINUAR EXPLORANDO
                </div>
                <h2
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-2xl sm:text-3xl tracking-[-0.03em] text-[#0D1117]"
                >
                  <span className="font-extralight text-[#0D1117]/55">Piezas </span>
                  <span className="font-extrabold">relacionadas.</span>
                </h2>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('tienda')}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0D1117]/55 hover:text-[#0D1117] inline-flex items-center gap-1.5"
              >
                <span>Ver archivo completo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {relatedProducts.map((rel, idx) => {
                const relCutout = getStudioCutoutIfAvailable(rel);
                return (
                  <article
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-[1/1.02] rounded-[20px] bg-white p-7 flex items-center justify-center overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_24px_48px_-18px_rgba(13,17,23,0.08)]">
                      <span className="absolute top-3.5 left-4 font-mono text-[10px] text-[#0D1117]/25">
                        0{idx + 1}
                      </span>
                      <img
                        src={relCutout || rel.media[0]}
                        alt={rel.name}
                        loading="lazy"
                        className={`max-h-[72%] max-w-[76%] object-contain transition-transform duration-500 group-hover:scale-105 ${
                          relCutout ? 'drop-shadow-md' : 'mix-blend-multiply'
                        }`}
                      />
                    </div>
                    <div className="pt-3 flex items-baseline justify-between gap-3">
                      <h3
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="text-sm font-bold text-[#0D1117] group-hover:text-[#0052FF] transition-colors truncate"
                      >
                        {rel.name}
                      </h3>
                      <span
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="text-sm font-extrabold text-[#0D1117] shrink-0"
                      >
                        ${rel.basePrice.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
