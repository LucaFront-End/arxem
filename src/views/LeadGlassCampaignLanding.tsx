import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  PhoneCall,
  ArrowUpRight,
  Truck,
  FileCheck,
  Star,
  CheckCircle2,
  Maximize2,
  Eye
} from 'lucide-react';
import { CATALOG_PRODUCTS, CatalogProduct } from '../data/catalogData';
import {
  VERIFIED_REVIEWS,
  saveQuoteToCMS,
  openWhatsAppWithQuote
} from '../data/taxonomyData';
import { ActiveRoute } from '../components/Navbar';

interface LeadGlassCampaignLandingProps {
  onSelectProduct: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct, variantLabel?: string, price?: number) => void;
  onNavigate: (route: ActiveRoute) => void;
}

export const LeadGlassCampaignLanding: React.FC<LeadGlassCampaignLandingProps> = ({
  onSelectProduct,
  onAddToCart,
  onNavigate
}) => {
  const [originFilter, setOriginFilter] = useState<'all' | 'china' | 'francia' | 'alemania'>('all');
  const [thicknessFilter, setThicknessFilter] = useState<'all' | '8mm' | '10mm' | '12mm'>('all');

  const allLeadGlassProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((p) => p.storePillar === 'vidrios-emplomados').filter((p) => {
      const n = p.name.toLowerCase();
      if (originFilter !== 'all' && !n.includes(originFilter)) return false;
      if (thicknessFilter !== 'all' && !n.includes(thicknessFilter)) return false;
      return true;
    });
  }, [originFilter, thicknessFilter]);

  const [selectedCampaignGlass, setSelectedCampaignGlass] = useState<CatalogProduct>(
    CATALOG_PRODUCTS.find((p) => p.sku === 'VE8C24') ||
      CATALOG_PRODUCTS.find((p) => p.storePillar === 'vidrios-emplomados') ||
      CATALOG_PRODUCTS[0]
  );

  const handleExpressWhatsAppQuote = (glass: CatalogProduct) => {
    const record = saveQuoteToCMS({
      type: 'CAMPANA_VIDRIO',
      clientName: 'Lead Campaña Vidrio Emplomado',
      clientCompany: 'Clínica / Constructora',
      clientPhone: 'WhatsApp Campaña',
      clientCity: 'México',
      summary: `Campaña Vidrio Emplomado: ${glass.name} (SKU: ${glass.sku || 'VAR'})`,
      specs: {
        producto: glass.name,
        sku: glass.sku || 'MULTI',
        equivalenciaPb: glass.leadEquivalency,
        pesoKg: glass.weight,
        precioMXN: glass.basePrice
      },
      estimatedTotalMXN: glass.basePrice,
      status: 'ENVIADO_WHATSAPP'
    });

    const msg = [
      `Hola *ARXEM®*, vengo de la *Campaña de Vidrio Emplomado* y me interesa comprar / cotizar:`,
      ``,
      `• *Cristal:* ${glass.name}`,
      `• *Protección:* ${glass.leadEquivalency}`,
      `• *SKU:* ${glass.sku || 'Estándar'}`,
      `• *Precio Publicado:* $${glass.basePrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`,
      `• *Folio Campaña CMS:* ${record.id}`,
      ``,
      `¿Tienen entrega inmediata para envío en huacal de madera?`
    ].join('\n');

    openWhatsAppWithQuote(msg);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F4] pb-24">
      {/* CAMPAIGN CONVERSION HERO — 100% FOCUSED ON VIDRIO EMPLOMADO */}
      <section className="bg-[#0D1117] text-white pt-10 pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-xray-grid opacity-30 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
          {/* Campaign Top Trust Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-[#0D1117] font-mono text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAMPAÑA OFICIAL DE VENTA DIRECTA // VIDRIO EMPLOMADO CERTIFICADO</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-white/75">
              <span className="text-emerald-400 font-bold">✓ Cumple NOM-229-SSA1 COFEPRIS</span>
              <span>·</span>
              <span>✓ Envío en Huacal de Madera Asegurado</span>
              <span>·</span>
              <span>✓ Facturación CFDI 4.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Conversion Pitch */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.03]">
                Vidrio Emplomado para Salas de Rayos X, Tomografía y Mastografía.{' '}
                <span className="text-amber-400 font-serif italic font-normal">
                  En stock hoy.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl">
                Importadores directos de cristal de óxido de plomo de <strong className="text-white">Francia (2.6 mm Pb)</strong>, <strong className="text-white">Alemania (2.1 mm Pb)</strong> y <strong className="text-white">China (8mm, 10mm y 12mm · 1.7 a 2.9 mm Pb)</strong>. Más de 21 medidas listas para envío nacional o corte a medida para tu obra hospitalaria.
              </p>

              {/* Key Conversion Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Densidad óptica > 4.2 a 4.8 g/cm³ sin distorsión visual',
                  'Aprobación garantizada en pruebas de levantamiento COFEPRIS',
                  'Desde mirillas dentales 8"×10" hasta ventanales 36"×72" y 42"×60"',
                  'Embalaje blindado anti-impacto a cualquier estado de México'
                ].map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white/90"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Dual Conversion CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="#matriz-vidrios"
                  className="px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-[#0D1117] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_15px_35px_-5px_rgba(251,191,36,0.4)] inline-flex items-center gap-2.5"
                >
                  <span>Seleccionar Medida en Stock</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onNavigate('vidrio-personalizado')}
                  className="px-7 py-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#0D1117] border border-white/20 font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all inline-flex items-center gap-2.5"
                >
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span>Cotizar Medida Personalizada</span>
                </button>
              </div>
            </div>

            {/* Right Quick-Buy Featured Glass Selector Card */}
            <div className="lg:col-span-5">
              <div className="rounded-[32px] bg-white text-[#0D1117] p-6 sm:p-8 shadow-2xl border-2 border-amber-400 space-y-5">
                <div className="flex items-center justify-between border-b border-[#0D1117]/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold">
                      COMPRA RÁPIDA DE CAMPAÑA
                    </span>
                    <h2 className="font-display font-extrabold text-xl">
                      Elige tu medida de Vidrio Emplomado
                    </h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-800 font-mono text-xs font-bold">
                    En Stock
                  </span>
                </div>

                {/* Quick Dropdown of all Lead Glass SKUs */}
                <div>
                  <label className="block font-mono text-xs uppercase font-bold text-[#0D1117]/60 mb-1.5">
                    Medida, Espesor y País de Origen:
                  </label>
                  <select
                    value={selectedCampaignGlass.id}
                    onChange={(e) => {
                      const found = CATALOG_PRODUCTS.find((p) => p.id === e.target.value);
                      if (found) setSelectedCampaignGlass(found);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F7F4] border border-[#0D1117]/15 font-display font-bold text-xs sm:text-sm text-[#0D1117]"
                  >
                    {CATALOG_PRODUCTS.filter((p) => p.storePillar === 'vidrios-emplomados').map(
                      (g) => (
                        <option key={g.id} value={g.id}>
                          {g.name} — ${g.basePrice.toLocaleString('es-MX')} MXN
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Image & Specs Preview */}
                <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-2xl bg-[#F7F7F4] border border-[#0D1117]/10">
                  <div className="col-span-4 flex justify-center">
                    <img
                      src={selectedCampaignGlass.media[0]}
                      alt={selectedCampaignGlass.name}
                      className="h-24 object-contain"
                    />
                  </div>
                  <div className="col-span-8 space-y-1">
                    <div className="font-display font-bold text-sm line-clamp-2">
                      {selectedCampaignGlass.name}
                    </div>
                    <div className="font-mono text-xs text-[#0052FF] font-bold">
                      {selectedCampaignGlass.leadEquivalency}
                    </div>
                    <div className="font-mono text-[11px] text-[#0D1117]/60">
                      SKU: {selectedCampaignGlass.sku || 'VAR'} · Peso aprox: {selectedCampaignGlass.weight} kg
                    </div>
                  </div>
                </div>

                {/* Price & Instant Conversion Buttons */}
                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#0D1117]/50 block">
                      Precio Neto de Campaña
                    </span>
                    <span className="font-mono text-3xl font-extrabold text-[#0D1117]">
                      ${selectedCampaignGlass.basePrice.toLocaleString('es-MX', {
                        minimumFractionDigits: 2
                      })}{' '}
                      <span className="text-xs font-normal">MXN</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => onAddToCart(selectedCampaignGlass)}
                    className="py-4 px-4 rounded-2xl bg-[#0D1117] hover:bg-[#0052FF] text-white font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Comprar Ahora</span>
                  </button>

                  <button
                    onClick={() => handleExpressWhatsAppQuote(selectedCampaignGlass)}
                    className="py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Cotizar en WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARATOR: CHINA VS ALEMANIA VS FRANCIA */}
      <section className="py-16 bg-white border-b border-[#0D1117]/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#0052FF] font-bold mb-2">
              GUÍA TÉCNICA DE COMPRA
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0D1117]">
              ¿Qué espesor y origen de Vidrio Emplomado necesita tu sala?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                badge: '8 MM · 10 MM · 12 MM',
                title: 'Importado de China',
                pb: '1.70 a 2.90 mm Pb',
                desc: 'La mayor variedad de medidas en pulgadas (desde 8"×10" hasta 36"×72" y 42"×60"). Excelente relación costo-beneficio cumpliendo estrictamente NOM-229-SSA1.',
                price: 'Desde $3,320 MXN',
                filter: 'china' as const
              },
              {
                badge: '8 MM ALTA TRANSMISIÓN',
                title: 'Importado de Alemania',
                pb: '2.10 mm Pb Certificados',
                desc: 'Cristal europeo de alta densidad que logra 2.1 mm de equivalencia en plomo en tan solo 8 mm de espesor. Disponible en formatos arquitectónicos de 60×110 cm y 110×120 cm.',
                price: 'Desde $74,443 MXN',
                filter: 'alemania' as const
              },
              {
                badge: '10 MM GRADO QUIRÚRGICO',
                title: 'Importado de Francia',
                pb: '2.60 mm Pb Certificados',
                desc: 'Máxima equivalencia en plomo en 10 mm de espesor (2.6 mm Pb). Claridad óptica cristalina para salas de Tomografía, Hemodinamia y Hospitales de Alta Especialidad.',
                price: 'Desde $8,944 MXN',
                filter: 'francia' as const
              }
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-3xl bg-[#F7F7F4] p-7 border border-[#0D1117]/10 flex flex-col justify-between"
              >
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#0D1117] text-amber-300 font-mono text-[11px] font-bold">
                    {card.badge}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-[#0D1117] mt-4 mb-1">
                    {card.title}
                  </h3>
                  <div className="font-mono text-sm font-bold text-[#0052FF] mb-3">
                    Protección: {card.pb}
                  </div>
                  <p className="text-xs sm:text-sm text-[#0D1117]/70 leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#0D1117]/10 flex items-center justify-between">
                  <span className="font-mono font-extrabold text-sm text-[#0D1117]">
                    {card.price}
                  </span>
                  <a
                    href="#matriz-vidrios"
                    onClick={() => setOriginFilter(card.filter)}
                    className="text-xs font-display font-bold uppercase text-[#0052FF] hover:underline"
                  >
                    Filtrar medidas →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL INTERACTIVE CATALOG MATRIX OF ALL VIDRIOS EMPLOMADOS */}
      <section id="matriz-vidrios" className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold mb-1">
              INVENTARIO COMPLETO DE VIDRIO EMPLOMADO
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0D1117]">
              Selecciona tu medida exacta ({allLeadGlassProducts.length} opciones)
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex bg-white p-1 rounded-full border border-[#0D1117]/10">
              {(['all', 'china', 'francia', 'alemania'] as const).map((orig) => (
                <button
                  key={orig}
                  onClick={() => setOriginFilter(orig)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase transition-all ${
                    originFilter === orig
                      ? 'bg-[#0D1117] text-white font-bold'
                      : 'text-[#0D1117]/65 hover:text-[#0D1117]'
                  }`}
                >
                  {orig === 'all' ? 'Todos los países' : orig}
                </button>
              ))}
            </div>

            <div className="inline-flex bg-white p-1 rounded-full border border-[#0D1117]/10">
              {(['all', '8mm', '10mm', '12mm'] as const).map((th) => (
                <button
                  key={th}
                  onClick={() => setThicknessFilter(th)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase transition-all ${
                    thicknessFilter === th
                      ? 'bg-[#0052FF] text-white font-bold'
                      : 'text-[#0D1117]/65 hover:text-[#0D1117]'
                  }`}
                >
                  {th === 'all' ? 'Todos espesores' : th}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {allLeadGlassProducts.map((glass) => (
            <div
              key={glass.id}
              className="rounded-3xl bg-white border border-[#0D1117]/10 hover:border-amber-500 p-5 flex flex-col justify-between transition-all hover:shadow-xl"
            >
              <div>
                <div
                  onClick={() => onSelectProduct(glass)}
                  className="cursor-pointer relative h-44 rounded-2xl bg-[#F7F7F4] p-4 mb-4 flex items-center justify-center"
                >
                  <img
                    src={glass.media[0]}
                    alt={glass.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#0D1117] text-amber-300 font-mono text-[10px] font-bold">
                    {glass.leadEquivalency}
                  </span>
                  {glass.sku && (
                    <span className="absolute bottom-2 right-2.5 font-mono text-[10px] text-[#0D1117]/60">
                      SKU: {glass.sku}
                    </span>
                  )}
                </div>

                <h3
                  onClick={() => onSelectProduct(glass)}
                  className="cursor-pointer font-display font-bold text-base text-[#0D1117] hover:text-[#0052FF] mb-2"
                >
                  {glass.name}
                </h3>
              </div>

              <div className="pt-3 border-t border-[#0D1117]/10 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#0D1117]/50 block">
                      Peso aprox: {glass.weight} kg
                    </span>
                    <span className="font-mono text-xl font-extrabold text-[#0D1117]">
                      ${glass.basePrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectProduct(glass)}
                    className="text-xs font-mono text-[#0052FF] hover:underline font-bold"
                  >
                    Ver ficha →
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onAddToCart(glass)}
                    className="py-2.5 px-3 rounded-xl bg-[#0D1117] hover:bg-[#0052FF] text-white font-display font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Comprar</span>
                  </button>
                  <button
                    onClick={() => handleExpressWhatsAppQuote(glass)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

