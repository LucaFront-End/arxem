import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  Maximize2,
  Eye,
  ShoppingBag,
  Star,
  Award,
  Truck,
  FileCheck,
  PhoneCall,
  Zap,
  RotateCcw,
  Sun,
  Moon,
  Shield
} from 'lucide-react';
import {
  GlassPrismHero,
  type GlassPrismHeroHandle,
  type GlassThicknessPreset,
  type GlassShapeMode,
  type BeamSpectrumMode
} from '@/components/ui/glass-prism-hero';
import {
  DishOrbitCarousel,
  type Dish
} from '@/components/ui/dish-orbit-carousel';
import {
  CoffeePourMenu
} from '@/components/ui/coffee-pour-menu';
import {
  CategoriesBentoGrid
} from '@/components/ui/categories-bento-grid';
import {
  IsometricCustomToggle
} from '@/components/ui/isometric-custom-toggle';
import {
  MinimalProductShowcase
} from '@/components/ui/minimal-product-showcase';
import {
  AboutStickyScroll
} from '@/components/ui/about-sticky-scroll';
import {
  TestimonialGlobe,
  ARXEM_GLOBE_TESTIMONIALS
} from '@/components/ui/testimonial-globe';
import {
  CATALOG_PRODUCTS,
  CatalogProduct,
  SectorSlug,
  StorePillar
} from '../data/catalogData';
import {
  MASTER_CATEGORIES,
  INDUSTRY_SECTORS,
  VERIFIED_REVIEWS,
  openWhatsAppWithQuote
} from '../data/taxonomyData';
import { ActiveRoute } from '../components/Navbar';

interface HomeViewProps {
  onNavigate: (
    route: ActiveRoute,
    options?: {
      pillar?: StorePillar;
      category?: string;
      subcategory?: string;
      sector?: SectorSlug;
      productId?: string;
    }
  ) => void;
  onSelectProduct: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct, variantLabel?: string, price?: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart
}) => {
  // 1. WebGL Glass Prism / Lead Glass Hero State
  const prismHeroRef = useRef<GlassPrismHeroHandle>(null);
  const [glassPreset, setGlassPreset] = useState<GlassThicknessPreset>('10mm-francia');
  const [shapeMode, setShapeMode] = useState<GlassShapeMode>('slab');
  const [beamMode, setBeamMode] = useState<BeamSpectrumMode>('xray');
  const [stageTheme, setStageTheme] = useState<'light' | 'dark'>('light');

  // 2. Sticky Scroll Storytelling Chapter state
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState<number>(0);

  // 3. Sector Accordion state (Dentistas, Clínicas, Veterinarias, Constructoras, Laboratorios)
  const [activeSectorSlug, setActiveSectorSlug] = useState<SectorSlug>('clinicas');

  // 4. Master Category Explorer state (6 Categories)
  const [selectedMasterCatId, setSelectedMasterCatId] = useState<string>('proteccion-radiologica');
  const [selectedSubcatFilter, setSelectedSubcatFilter] = useState<string | null>(null);

  // 5. Home Curated Store Pillar Tab
  const [showcasePillar, setShowcasePillar] = useState<StorePillar>('catalogo-general');

  // Scroll listener for the Sticky 4-Chapter "Anatomía de la Protección" section
  useEffect(() => {
    const handleScroll = () => {
      if (!stickyContainerRef.current) return;
      const rect = stickyContainerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const ratio = Math.max(0, Math.min(1, scrolled / totalScrollable));

      if (ratio < 0.25) setActiveChapter(0);
      else if (ratio < 0.52) setActiveChapter(1);
      else if (ratio < 0.78) setActiveChapter(2);
      else setActiveChapter(3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentMasterCat =
    MASTER_CATEGORIES.find((c) => c.id === selectedMasterCatId) || MASTER_CATEGORIES[0];

  const masterCatProducts = CATALOG_PRODUCTS.filter((p) => {
    const matchCat = p.masterCategory === currentMasterCat.name;
    const matchSub = selectedSubcatFilter ? p.subcategory === selectedSubcatFilter : true;
    return matchCat && matchSub;
  }).slice(0, 4);

  const showcaseProducts = CATALOG_PRODUCTS.filter((p) => p.storePillar === showcasePillar).slice(
    0,
    8
  );

  const stickyChapters = [
    {
      index: '01',
      code: 'ÓPTICA DE ALTA DENSIDAD // VIDRIO EMPLOMADO',
      title: 'Ver al paciente con claridad absoluta. Detener el 99.8% del haz secundario.',
      subtitle: 'Cristales de silicato de plomo y bario importados de Francia, Alemania y China.',
      description:
        'Un vidrio emplomado ARXEM no es un cristal ordinario: su matriz molecular incorpora más del 55% de óxido de plomo (PbO) de grado óptico, logrando una equivalencia de hasta 2.9 mm Pb sin sacrificar transmisión luminosa en salas de Tomografía, Rayos X y Hemodinamia.',
      metrics: [
        { label: 'Equivalencia en Plomo', value: '1.7 a 2.9 mm Pb' },
        { label: 'Transmisión Óptica Visible', value: '> 85.4% Luz' },
        { label: 'Espesores en Stock', value: '8mm · 10mm · 12mm' }
      ],
      ctaText: 'Configurar Vidrio a Medida',
      ctaAction: () => onNavigate('vidrio-personalizado'),
      productPreview: CATALOG_PRODUCTS.find((p) => p.id.includes('1d10b4f7')) || CATALOG_PRODUCTS[0]
    },
    {
      index: '02',
      code: 'ARQUITECTURA BLINDADA // LÁMINA DE PLOMO 99.9%',
      title: 'Muros, puertas y marcos herméticos ante el levantamiento radiométrico.',
      subtitle: 'Lámina de plomo electrolítico de densidad uniforme sin porosidad.',
      description:
        'Para constructoras hospitalarias y clínicas en remodelación: nuestras láminas de 1.0 mm, 1.5 mm y 2.0 mm garantizan maleabilidad estructural en muros de tablaroca o mampostería, cumpliendo al 100% la Memoria Analítica ante COFEPRIS.',
      metrics: [
        { label: 'Pureza Metalúrgica', value: '99.94% Plomo' },
        { label: 'Densidad Certificada', value: '11.34 g/cm³' },
        { label: 'Formatos Disponibles', value: '1x1m · 1x2m · 1.10x2.10m' }
      ],
      ctaText: 'Calcular Blindaje de Sala',
      ctaAction: () => onNavigate('blindaje-personalizado'),
      productPreview:
        CATALOG_PRODUCTS.find((p) => p.subcategory === 'Láminas de Plomo') || CATALOG_PRODUCTS[0]
    },
    {
      index: '03',
      code: 'DOSIMETRÍA PERSONAL // MANDILES, LENTES & GUANTES PB',
      title: 'Biomecánica clínica que protege órganos vitales sin fatigar al especialista.',
      subtitle: 'Núcleo flexible de 0.50 mm y 0.75 mm Pb con redistribución lumbar.',
      description:
        'Desde conjuntos de chaleco y faldón para intervencionismo prolongado hasta kits dentales con collarín tiroideo y lentes emplomados con protección lateral. Manufactura estadounidense y nacional diseñada para resistir miles de ciclos clínicos.',
      metrics: [
        { label: 'Atenuación Corporal', value: '0.50 mm Pb Frontal' },
        { label: 'Protección Ocular', value: '0.75 mm Pb + Lateral' },
        { label: 'Ergonomía Clínica', value: 'Soporte Lumbar / Velcro' }
      ],
      ctaText: 'Explorar Protección Personal',
      ctaAction: () =>
        onNavigate('tienda', {
          pillar: 'catalogo-general',
          category: 'Protección Radiológica'
        }),
      productPreview:
        CATALOG_PRODUCTS.find((p) => p.name.toLowerCase().includes('chaleco')) ||
        CATALOG_PRODUCTS[0]
    },
    {
      index: '04',
      code: 'ECOSISTEMA CLÍNICO // DIAGNÓSTICO, CHASIS & CONSUMIBLES',
      title: 'Desde la película radiográfica Fuji hasta densitometría ósea DXA de cuerpo completo.',
      subtitle: 'Abasto continuo para laboratorios, gabinetes, clínicas y hospitales.',
      description:
        'Completamos el ciclo radiológico con chasis alemanes velocidad 600 con ventana identificadora, películas verdes y térmicas Fuji, reveladores Norkim, cánulas de histerosalpingografía y concentradores de oxígeno grado médico.',
      metrics: [
        { label: 'Chasis Radiográficos', value: 'Manuf. Alemana Vel. 600' },
        { label: 'Película Dental & Gral.', value: 'Fuji HR-U & DI-HT' },
        { label: 'Alta Especialidad', value: 'DXA Osteosys · Handy O₂' }
      ],
      ctaText: 'Ver Catálogo Completo',
      ctaAction: () => onNavigate('tienda', { pillar: 'catalogo-general' }),
      productPreview:
        CATALOG_PRODUCTS.find((p) => p.name.toLowerCase().includes('chasis')) ||
        CATALOG_PRODUCTS[0]
    }
  ];

  const heroGlassOptions = [
    {
      id: '8mm-china' as const,
      label: 'China · 8 mm',
      pb: '1.9 mm Pb',
      product:
        CATALOG_PRODUCTS.find((p) => p.id.includes('b2c5150a')) || CATALOG_PRODUCTS[0]
    },
    {
      id: '8mm-alemania' as const,
      label: 'Alemania · 8 mm',
      pb: '2.1 mm Pb',
      product:
        CATALOG_PRODUCTS.find((p) => p.id.includes('d7a9dd49')) || CATALOG_PRODUCTS[0]
    },
    {
      id: '10mm-francia' as const,
      label: 'Francia · 10 mm',
      pb: '2.6 mm Pb',
      product:
        CATALOG_PRODUCTS.find((p) => p.id.includes('1d10b4f7')) || CATALOG_PRODUCTS[0]
    }
  ];

  const activeHeroGlass =
    heroGlassOptions.find((g) => g.id === glassPreset) || heroGlassOptions[2];

  const orbitProducts: Dish[] = [
    {
      title: 'Vidrio Emplomado',
      subtitle: 'Francés 10mm',
      eyebrow: '01 · Blindaje Óptico Salas RX y CT',
      label: 'Vidrio Francés 10mm',
      image: '/products/orbit-01-vidrio.png',
      rating: 5.0,
      chef: '2.6 mm Pb Cert.',
      kitchen: 'Desde $8,944 MXN · NOM-229-SSA1',
      description:
        'Cristal óptico de silicato de plomo importado de Francia con transmisión luminosa superior al 85% para consolas de Tomografía y Rayos X.',
      likes: 184,
      ingredients: ['10 mm espesor', '2.6 mm Pb', 'Francia', 'Corte a medida', 'COFEPRIS'],
      accent: '#93C5FD',
      productId: 'Product_1d10b4f7-9b46-4689-9295-c8defe561fcf',
      customRoute: 'vidrio-personalizado'
    },
    {
      title: 'Lámina de Plomo',
      subtitle: 'Pureza 99.9%',
      eyebrow: '02 · Blindaje Estructural Hospitalario',
      label: 'Lámina Plomo 99.9%',
      image: '/products/orbit-02-lamina.png',
      rating: 4.9,
      chef: '1.0 a 2.0 mm Pb',
      kitchen: 'Desde $2,316 MXN · Rollos 1x1m a 1.10x2.10m',
      description:
        'Plomo electrolítico al 99.94% libre de porosidad para muros de tablaroca, puertas blindadas y marcos radiológicos con memoria analítica.',
      likes: 219,
      ingredients: ['99.94% Pureza', '11.34 g/cm³', '1mm / 1.5mm / 2mm', 'Muros y puertas'],
      accent: '#FCD34D',
      productId: 'Product_7c435ae1-4c42-4b9f-ae26-92b15f0dcf0e',
      customRoute: 'blindaje-personalizado'
    },
    {
      title: 'Chaleco y Faldón',
      subtitle: 'Ergonómico Pb',
      eyebrow: '03 · Dosimetría Intervencionismo',
      label: 'Chaleco y Faldón Pb',
      image: '/products/orbit-03-chaleco.png',
      rating: 4.9,
      chef: '0.50 mm Pb',
      kitchen: '$14,384 MXN · Redistribución Lumbar',
      description:
        'Conjunto de dos piezas con núcleo flexible emplomado y cierre de velcro en nylon clínico que elimina la fatiga vertebral en quirófano.',
      likes: 142,
      ingredients: ['0.5 mm Pb frontal', '0.25 mm espalda', 'Nylon lavable', '2 piezas'],
      accent: '#A7F3D0',
      productId: 'Product_9753d4a5-e0f7-4966-a8da-3c6881f50cf8'
    },
    {
      title: 'Mandil Clínico',
      subtitle: 'Protección 0.5 Pb',
      eyebrow: '04 · Radiología General & Dental',
      label: 'Mandil Emplomado',
      image: '/products/orbit-04-mandil.png',
      rating: 4.8,
      chef: '0.50 mm Pb',
      kitchen: '$5,311 MXN · Mod. SV Cierre Velcro',
      description:
        'Mandil emplomado estándar con soporte en hombros, acabado impermeable de alta resistencia y atenuación certificada para diagnóstico.',
      likes: 268,
      ingredients: ['0.5 mm Pb', '69x95 cm', 'Cierre velcro', 'Colores clínicos'],
      accent: '#BAE6FD',
      productId: 'Product_e008539c-89e6-4e3a-acdf-aab5434b9549'
    },
    {
      title: 'Lentes Emplomados',
      subtitle: 'Cristal 0.75 Pb',
      eyebrow: '05 · Protección Ocular Radiológica',
      label: 'Lentes 0.75 mm Pb',
      image: '/products/orbit-05-lentes.png',
      rating: 4.9,
      chef: '0.75 mm Pb',
      kitchen: '$2,555 MXN · Incluye Estuche Rígido',
      description:
        'Lentes de cristal emplomado de alta transparencia con blindaje lateral integrado para proteger el cristalino ante radiación dispersa.',
      likes: 156,
      ingredients: ['0.75 mm Pb', 'Blindaje lateral', 'Antirreflejante', 'Con estuche'],
      accent: '#DDD6FE',
      productId: 'Product_f8aceaa0-7bb8-4bcd-9ac1-02ce25b8d5b0'
    },
    {
      title: 'Chasis Radiográfico',
      subtitle: 'Manuf. Alemana',
      eyebrow: '06 · Imagenología & Rayos X',
      label: 'Chasis Vel. 600',
      image: '/products/orbit-06-chasis.png',
      rating: 4.9,
      chef: 'Pantalla Vel. 600',
      kitchen: '$4,004 MXN · Con Ventana Identificadora',
      description:
        'Chasis radiográfico de manufactura alemana con pantalla intensificadora verde velocidad 600 y contacto película-pantalla uniforme.',
      likes: 131,
      ingredients: ['Vel. 600 Verde', 'Manuf. Alemana', 'Con ventana', 'Varios formatos'],
      accent: '#FDE68A',
      productId: 'Product_ec33a435-ac02-4ed5-bd14-00abd2f46135'
    }
  ];

  return (
    <div className="relative">
      {/* =====================================================================
          SECTION 01: MINIMALIST 21ST.DEV WEBGL LEAD-GLASS HERO
      ===================================================================== */}
      <GlassPrismHero
        ref={prismHeroRef}
        headline="Claridad que detiene la radiación."
        accent="#0052FF"
        glassPreset={glassPreset}
        shapeMode={shapeMode}
        beamMode={beamMode}
        stageTheme={stageTheme}
        scrollHint={false}
        telemetryBar={
          <div className="flex flex-col items-center gap-4">
            {/* Minimalist Typographic Glass Switcher */}
            <div className="flex items-center gap-6 sm:gap-8 border-b border-black/10 pb-2.5">
              {heroGlassOptions.map((option) => {
                const isActive = glassPreset === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setGlassPreset(option.id)}
                    className={`relative font-mono text-xs sm:text-[13px] tracking-[0.08em] uppercase transition-colors ${
                      isActive
                        ? 'text-[#0D1117] font-semibold'
                        : 'text-[#0D1117]/40 hover:text-[#0D1117]/75'
                    }`}
                  >
                    {option.label}
                    {isActive && (
                      <span className="absolute -bottom-[11px] left-0 right-0 h-[1.5px] bg-[#0D1117]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Minimalist Direct Product Connection */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[14px] text-[#0D1117]/70">
              <span>
                <strong className="font-medium text-[#0D1117]">
                  {activeHeroGlass.product.name}
                </strong>{' '}
                · {activeHeroGlass.pb} · Desde{' '}
                <span className="font-mono text-[#0D1117]">
                  ${activeHeroGlass.product.basePrice.toLocaleString('es-MX')} MXN
                </span>
              </span>
              <span className="text-black/20 hidden sm:inline">—</span>
              <button
                type="button"
                onClick={() => onSelectProduct(activeHeroGlass.product)}
                className="inline-flex items-center gap-1 font-medium text-[#0D1117] underline underline-offset-4 decoration-black/30 hover:decoration-[#0052FF] hover:text-[#0052FF] transition-colors"
              >
                <span>Ver vidrio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('vidrio-personalizado')}
                className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#0D1117]/55 hover:text-[#0D1117] transition-colors"
              >
                <span>Cotizar a medida</span>
              </button>
            </div>
          </div>
        }
      />

      {/* =====================================================================
          SECTION 02: 21ST.DEV ORBIT CAROUSEL SHOWCASE (SCROLL-PINNED)
      ===================================================================== */}
      <section className="border-y border-[#0D1117]/10">
        <DishOrbitCarousel
          dishes={orbitProducts}
          loop={false}
          playLabel="Ver ficha técnica"
          orderLabel="Cotizar / Comprar"
          onPlay={(dish) => {
            const found =
              CATALOG_PRODUCTS.find((p) => p.id === dish.productId) || CATALOG_PRODUCTS[0];
            onSelectProduct(found);
          }}
          onOrder={(dish) => {
            if (dish.customRoute) {
              onNavigate(dish.customRoute);
              return;
            }
            const found =
              CATALOG_PRODUCTS.find((p) => p.id === dish.productId) || CATALOG_PRODUCTS[0];
            onAddToCart(found);
          }}
        />
      </section>

      {/* =====================================================================
          SECTION 03: ESPECIALIDADES & SÍNTESIS RADIOLÓGICA (COFFEE POUR MENU ADAPTATION)
      ===================================================================== */}
      <CoffeePourMenu
        title="Diseñado para tu Entorno Clínico"
        eyebrow="03 — ESPECIALIDADES & ENTORNOS"
        theme="light"
        className="border-b border-[#0D1117]/10"
        onExploreAction={(item) => {
          onNavigate('tienda', { sector: item.id as SectorSlug });
        }}
        onQuoteAction={(item) => {
          if (item.id === 'constructoras') {
            onNavigate('blindaje-personalizado');
          } else if (item.id === 'clinicas') {
            onNavigate('vidrio-personalizado');
          } else {
            onNavigate('contacto');
          }
        }}
      />

      {/* =====================================================================
          SECTION 04: ARQUITECTURA DE LAS 6 CATEGORÍAS (ASYMMETRIC BENTO GRID)
      ===================================================================== */}
      <CategoriesBentoGrid
        products={CATALOG_PRODUCTS}
        onNavigateStore={(opts) => onNavigate('tienda', opts)}
        onNavigateCustom={(route) => onNavigate(route)}
        onSelectProduct={onSelectProduct}
      />

      {/* =====================================================================
          SECTION 05: MEDIDAS PERSONALIZADAS — 3D ISOMETRIC POLYGON TOGGLE
      ===================================================================== */}
      <IsometricCustomToggle
        onNavigate={(route) => onNavigate(route)}
        onOpenWhatsApp={(summary) =>
          openWhatsAppWithQuote({
            title: 'COTIZACIÓN INGENIERÍA A MEDIDA ARXEM',
            lines: [summary]
          })
        }
      />

      {/* =====================================================================
          SECTION 06: MINIMALIST STUDIO PRODUCT SHOWCASE (3 STORE PILLARS)
      ===================================================================== */}
      <MinimalProductShowcase
        products={CATALOG_PRODUCTS}
        activePillar={showcasePillar}
        onChangePillar={setShowcasePillar}
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
        onOpenStore={(pillar) => onNavigate('tienda', { pillar })}
      />

      {/* =====================================================================
          SECTION 07: SOBRE NOSOTROS (STICKY SCROLL + MORPHING BACKGROUND SVGs)
      ===================================================================== */}
      <AboutStickyScroll
        onContactSpecialist={() =>
          openWhatsAppWithQuote(
            'Hola ARXEM, busco asesoría directa para cotizar insumos de protección radiológica / blindaje.'
          )
        }
        onExploreCatalog={() => onNavigate('tienda')}
      />

      {/* =====================================================================
          SECTION 08: TESTIMONIOS VERIFICADOS (3D WEBGL GLOBE)
      ===================================================================== */}
      <TestimonialGlobe
        items={ARXEM_GLOBE_TESTIMONIALS}
        eyebrow="08 — CONFIANZA CLÍNICA E INGENIERÍA"
        headingLight="Especialistas que confían"
        heading="en nuestra precisión radiológica."
        caption="Médicos radiólogos, físicos médicos, dentistas y arquitectos hospitalarios que equipan sus salas con certeza certificada."
        autoplay={true}
        interval={4200}
        action={
          <button
            type="button"
            onClick={() =>
              openWhatsAppWithQuote(
                'Hola ARXEM, quiero cotizar equipamiento / blindaje radiológico para mi clínica.'
              )
            }
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-[#0D1117] px-4 text-xs font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#0052FF]"
          >
            <span>Cotizar proyecto</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        }
      />
    </div>
  );
};
