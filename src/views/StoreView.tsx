import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Search,
  ArrowUpRight,
  Plus,
  Check,
  X
} from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  CatalogProduct,
  StorePillar,
  SectorSlug
} from '../data/catalogData';
import { INDUSTRY_SECTORS } from '../data/taxonomyData';
import { ActiveRoute } from '../components/Navbar';

interface StoreViewProps {
  initialPillar?: StorePillar;
  initialCategory?: string;
  initialSubcategory?: string;
  initialSector?: SectorSlug;
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

type CollectionFilter =
  | 'all'
  | 'vidrios-emplomados'
  | 'blindaje'
  | 'proteccion'
  | 'peliculas'
  | 'equipos';

const COLLECTIONS: {
  id: CollectionFilter;
  number: string;
  label: string;
  match: (p: CatalogProduct) => boolean;
}[] = [
  {
    id: 'all',
    number: '00',
    label: 'Archivo Completo',
    match: () => true
  },
  {
    id: 'vidrios-emplomados',
    number: '01',
    label: 'Vidrios Emplomados',
    match: (p) => p.storePillar === 'vidrios-emplomados'
  },
  {
    id: 'blindaje',
    number: '02',
    label: 'Lámina de Plomo',
    match: (p) => p.storePillar === 'blindaje'
  },
  {
    id: 'proteccion',
    number: '03',
    label: 'Protección Personal',
    match: (p) => p.masterCategory === 'Protección Radiológica'
  },
  {
    id: 'peliculas',
    number: '04',
    label: 'Películas & Químicos',
    match: (p) =>
      p.masterCategory === 'Rayos X y Radiología' ||
      p.masterCategory === 'Cuarto Oscuro y Revelado'
  },
  {
    id: 'equipos',
    number: '05',
    label: 'Equipos & Accesorios',
    match: (p) =>
      p.masterCategory === 'Equipos Médicos' ||
      p.masterCategory === 'Accesorios y Mobiliario Clínico'
  }
];

/* -------------------------------------------------------------------------- */
/*                   Frameless Minimalist Gallery Item                        */
/* -------------------------------------------------------------------------- */

const MinimalGalleryItem: React.FC<{
  product: CatalogProduct;
  index: number;
  onSelectProduct: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct, variantLabel?: string, price?: number) => void;
}> = ({ product, index, onSelectProduct, onAddToCart }) => {
  const [variantIdx, setVariantIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const hasVariants = product.variants && product.variants.length > 0;
  const activeVariant = hasVariants ? product.variants[variantIdx] : null;
  const price = activeVariant ? activeVariant.price : product.basePrice;
  const variantLabel = activeVariant ? activeVariant.label : 'Estándar de Línea';

  const cutout = getStudioCutoutIfAvailable(product);
  const imgSrc = cutout || product.media[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, variantLabel, price);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer flex flex-col"
    >
      {/* Pure Uncluttered Canvas */}
      <div className="relative aspect-[1/1.04] rounded-[20px] bg-white overflow-hidden flex items-center justify-center p-8 transition-shadow duration-500 group-hover:shadow-[0_24px_48px_-18px_rgba(13,17,23,0.08)]">
        {/* Whisper-quiet index & lead equivalency */}
        <span className="absolute top-4 left-4 font-mono text-[10px] text-[#0D1117]/25">
          {String(index + 1).padStart(2, '0')}
        </span>

        {product.leadEquivalency && (
          <span className="absolute top-4 right-4 font-mono text-[10px] text-[#0D1117]/40">
            {product.leadEquivalency}
          </span>
        )}

        {/* Product Image */}
        <img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          className={`max-h-[72%] max-w-[78%] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.05] ${
            cutout ? 'drop-shadow-[0_14px_24px_rgba(13,17,23,0.12)]' : 'mix-blend-multiply'
          }`}
        />

        {/* Minimalist Hover Bar at Bottom of Canvas */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          {hasVariants ? (
            <div className="flex items-center gap-1 bg-[#F7F7F4]/95 backdrop-blur-md px-2 py-1 rounded-full border border-[#0D1117]/[0.06] overflow-x-auto no-scrollbar max-w-[72%]">
              {product.variants.slice(0, 3).map((v, idx) => (
                <button
                  key={v.id || v.label}
                  type="button"
                  onClick={() => setVariantIdx(idx)}
                  className={`px-2 py-0.5 rounded-full font-mono text-[9px] shrink-0 transition-colors ${
                    idx === variantIdx
                      ? 'bg-[#0D1117] text-white font-semibold'
                      : 'text-[#0D1117]/55 hover:text-[#0D1117]'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Agregar ${product.name}`}
            className={`ml-auto h-8 px-3.5 rounded-full font-mono text-[10px] uppercase tracking-[0.12em] font-semibold inline-flex items-center gap-1 transition-colors shadow-sm ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0D1117] text-white hover:bg-[#0052FF]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3 h-3" />
                <span>Listo</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Frameless Caption Below Canvas */}
      <div className="pt-3.5 px-0.5 flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h3
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="text-[15px] font-bold text-[#0D1117] group-hover:text-[#0052FF] transition-colors truncate"
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#0D1117]/45 truncate mt-0.5">
            {hasVariants
              ? `${variantLabel} · ${product.variants.length} medidas`
              : product.subcategory}
          </p>
        </div>

        <span
          style={{ fontFamily: "'Outfit', sans-serif" }}
          className="shrink-0 text-[15px] font-extrabold text-[#0D1117] tabular-nums"
        >
          ${price.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
        </span>
      </div>
    </motion.article>
  );
};

/* -------------------------------------------------------------------------- */
/*                           Main StoreView Component                         */
/* -------------------------------------------------------------------------- */

export const StoreView: React.FC<StoreViewProps> = ({
  initialPillar = 'catalogo-general',
  initialCategory,
  initialSector,
  onSelectProduct,
  onAddToCart,
  onNavigate
}) => {
  const [collection, setCollection] = useState<CollectionFilter>('all');
  const [selectedSector, setSelectedSector] = useState<SectorSlug | null>(
    initialSector || null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  useEffect(() => {
    if (initialCategory === 'Blindaje Radiológico' || initialPillar === 'vidrios-emplomados') {
      setCollection('vidrios-emplomados');
    } else if (initialPillar === 'blindaje') {
      setCollection('blindaje');
    } else if (initialCategory === 'Protección Radiológica') {
      setCollection('proteccion');
    } else if (
      initialCategory === 'Rayos X y Radiología' ||
      initialCategory === 'Cuarto Oscuro y Revelado'
    ) {
      setCollection('peliculas');
    } else if (
      initialCategory === 'Equipos Médicos' ||
      initialCategory === 'Accesorios y Mobiliario Clínico'
    ) {
      setCollection('equipos');
    } else {
      setCollection('all');
    }
    setSelectedSector(initialSector || null);
  }, [initialPillar, initialCategory, initialSector]);

  const activeCollectionObj =
    COLLECTIONS.find((c) => c.id === collection) || COLLECTIONS[0];

  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((p) => {
      if (!activeCollectionObj.match(p)) return false;
      if (selectedSector && !p.sectors.includes(selectedSector)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchSub = p.subcategory.toLowerCase().includes(q);
        const matchVariant = p.variants.some((v) => v.label.toLowerCase().includes(q));
        return matchName || matchSku || matchSub || matchVariant;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      return 0;
    });
  }, [activeCollectionObj, selectedSector, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#0D1117] pt-10 pb-28">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        {/* ===================================================================
            MINIMALIST EDITORIAL HEADER
        =================================================================== */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#0D1117]/[0.08]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#0D1117]/40 mb-3">
              ARCHIVO &amp; TIENDA OFICIAL · NOM-229-SSA1
            </div>
            <h1
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-4xl sm:text-5xl tracking-[-0.035em] text-[#0D1117] leading-none"
            >
              <span className="font-extralight text-[#0D1117]/55">Catálogo </span>
              <span className="font-extrabold">Clínico.</span>
            </h1>
          </div>

          {/* Minimalist Search & Sort Line */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="relative w-64 sm:w-72 border-b border-[#0D1117]/20 focus-within:border-[#0D1117] transition-colors pb-1.5">
              <Search className="w-3.5 h-3.5 text-[#0D1117]/40 absolute left-0 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar pieza, medida o SKU..."
                className="w-full pl-6 pr-6 bg-transparent text-xs sm:text-sm text-[#0D1117] placeholder:text-[#0D1117]/35 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0D1117]/40 hover:text-[#0D1117]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-b border-[#0D1117]/20 pb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#0D1117]/65 focus:outline-none cursor-pointer"
            >
              <option value="featured">Orden: Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </header>

        {/* ===================================================================
            SPLIT SHOWROOM: LEFT STICKY INDEX + RIGHT FRAMELESS GALLERY
        =================================================================== */}
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN: STICKY ARCHITECTURAL INDEX (Cols 1-3) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-10">
            {/* Collections List */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#0D1117]/35 mb-4">
                Colecciones
              </div>
              <nav className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
                {COLLECTIONS.map((col) => {
                  const active = collection === col.id;
                  const count = CATALOG_PRODUCTS.filter(col.match).length;
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setCollection(col.id)}
                      className={`group flex items-baseline justify-between gap-3 py-2 text-left transition-colors shrink-0 border-b border-transparent lg:border-[#0D1117]/[0.05] ${
                        active ? 'text-[#0D1117]' : 'text-[#0D1117]/40 hover:text-[#0D1117]/75'
                      }`}
                    >
                      <div className="flex items-baseline gap-2.5">
                        <span
                          className={`font-mono text-[10px] ${
                            active ? 'text-[#0052FF] font-bold' : 'text-[#0D1117]/30'
                          }`}
                        >
                          {col.number}
                        </span>
                        <span
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                          className={`text-sm tracking-tight ${
                            active ? 'font-extrabold' : 'font-normal'
                          }`}
                        >
                          {col.label}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] opacity-50">{count}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sector Filter */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#0D1117]/35 mb-3">
                Especialidad
              </div>
              <div className="flex flex-wrap lg:flex-col gap-1.5">
                {INDUSTRY_SECTORS.map((sec) => {
                  const active = selectedSector === sec.slug;
                  return (
                    <button
                      key={sec.slug}
                      type="button"
                      onClick={() =>
                        setSelectedSector(active ? null : sec.slug)
                      }
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className={`text-left text-xs py-1 transition-colors flex items-center justify-between ${
                        active
                          ? 'font-extrabold text-[#0052FF]'
                          : 'font-normal text-[#0D1117]/50 hover:text-[#0D1117]'
                      }`}
                    >
                      <span>{sec.shortTitle}</span>
                      {active && <span className="font-mono text-[10px]">✕</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minimalist Custom Engineering Links */}
            <div className="pt-6 border-t border-[#0D1117]/[0.08] space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#0D1117]/35">
                Corte a Medida
              </div>
              <button
                type="button"
                onClick={() => onNavigate('vidrio-personalizado')}
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="group w-full flex items-center justify-between text-xs font-bold text-[#0D1117] hover:text-[#0052FF] transition-colors py-1"
              >
                <span>Cotizador de Vidrio PbO</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('blindaje-personalizado')}
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="group w-full flex items-center justify-between text-xs font-bold text-[#0D1117] hover:text-[#0052FF] transition-colors py-1"
              >
                <span>Calculadora de Blindaje</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </aside>

          {/* RIGHT COLUMN: FRAMELESS 3-COLUMN GALLERY (Cols 4-12) */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0D1117]/40">
              <span>
                {activeCollectionObj.number} — {activeCollectionObj.label}
              </span>
              <span>{filteredProducts.length} piezas</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center">
                <p
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-xl font-light text-[#0D1117]/50 mb-4"
                >
                  No encontramos piezas con ese filtro.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCollection('all');
                    setSelectedSector(null);
                    setSearchQuery('');
                  }}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-[#0D1117] border-b border-[#0D1117] pb-1"
                >
                  Ver todo el archivo
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-7 gap-y-11"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, idx) => (
                    <MinimalGalleryItem
                      key={product.id}
                      product={product}
                      index={idx}
                      onSelectProduct={onSelectProduct}
                      onAddToCart={onAddToCart}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
