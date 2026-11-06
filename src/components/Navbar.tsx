import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Sliders,
  ShoppingBag,
  ChevronDown,
  Sparkles,
  Database,
  Menu,
  X,
  ArrowUpRight,
  Layers,
  Maximize2,
  PhoneCall
} from 'lucide-react';
import { ArxemLogo } from './ArxemLogo';
import { StorePillar, SectorSlug } from '../data/catalogData';

export type ActiveRoute =
  | 'home'
  | 'nosotros'
  | 'tienda'
  | 'vidrio-personalizado'
  | 'blindaje-personalizado'
  | 'campana-vidrio'
  | 'contacto'
  | 'producto';

interface NavbarProps {
  activeRoute: ActiveRoute;
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
  cartCount: number;
  onOpenCart: () => void;
  cmsCount: number;
  onOpenCMSModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRoute,
  onNavigate,
  cartCount,
  onOpenCart,
  cmsCount,
  onOpenCMSModal
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [customDropdownOpen, setCustomDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCustomDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isCustomActive =
    activeRoute === 'vidrio-personalizado' || activeRoute === 'blindaje-personalizado';

  return (
    <>
      {/* Top Clinical Telemetry Bar */}
      <div className="bg-[#0D1117] text-white/80 text-[11px] font-mono border-b border-white/10 relative z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              NORMA NOM-229-SSA1-2002
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-white/70 truncate">
              +14 Años Protegiendo Clínicas, Hospitales y Constructoras en México · Sin Conmutadores
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate('campana-vidrio')}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campaña Vidrio Emplomado</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a
              href="https://wa.me/525513135860?text=Hola%20ARXEM,%20solicito%20asesor%C3%ADa%20t%C3%A9cnica%20en%20protecci%C3%B3n%20radiol%C3%B3gica"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-white hover:text-[#60A5FA] transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#60A5FA]" />
              <span>55 1313 5860</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Architectural Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F7F7F4]/90 backdrop-blur-xl border-b border-[#0D1117]/10 shadow-[0_10px_30px_-15px_rgba(13,17,23,0.08)] py-3'
            : 'bg-[#F7F7F4]/80 backdrop-blur-md border-b border-[#0D1117]/5 py-4'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="text-left focus:outline-none"
            aria-label="Ir al inicio de ARXEM"
          >
            <ArxemLogo showSubtitle />
          </button>

          {/* Primary Navigation (Exact Menu Structure Requested) */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/80 border border-[#0D1117]/10 rounded-full p-1.5 shadow-sm">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeRoute === 'home'
                  ? 'bg-[#0D1117] text-white shadow-sm'
                  : 'text-[#0D1117]/75 hover:text-[#0D1117] hover:bg-[#0D1117]/5'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('nosotros')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeRoute === 'nosotros'
                  ? 'bg-[#0D1117] text-white shadow-sm'
                  : 'text-[#0D1117]/75 hover:text-[#0D1117] hover:bg-[#0D1117]/5'
              }`}
            >
              Nosotros
            </button>

            <button
              onClick={() => onNavigate('tienda', { pillar: 'catalogo-general' })}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                activeRoute === 'tienda' || activeRoute === 'producto'
                  ? 'bg-[#0D1117] text-white shadow-sm'
                  : 'text-[#0D1117]/75 hover:text-[#0D1117] hover:bg-[#0D1117]/5'
              }`}
            >
              <span>Tienda</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#0052FF]/15 text-[#0052FF]">
                3 Líneas
              </span>
            </button>

            {/* Medidas Personalizadas Mega Dropdown with the 2 Options */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setCustomDropdownOpen(true)}
              onMouseLeave={() => setCustomDropdownOpen(false)}
            >
              <button
                onClick={() => setCustomDropdownOpen((prev) => !prev)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                  isCustomActive
                    ? 'bg-[#0052FF] text-white shadow-sm'
                    : 'text-[#0D1117]/85 hover:text-[#0052FF] hover:bg-[#0052FF]/5'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Medidas Personalizadas</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    customDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {customDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 pt-3 w-[540px] z-50">
                  <div className="bg-white rounded-3xl border border-[#0D1117]/12 shadow-[0_30px_70px_-15px_rgba(13,17,23,0.18)] p-4 grid grid-cols-2 gap-3">
                    <div className="col-span-2 px-2 pb-2 border-b border-[#0D1117]/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#0D1117]/50">
                        Calculadoras de Ingeniería · Cotización Directa
                      </span>
                      <span className="text-[10px] font-mono text-[#0052FF] font-semibold">
                        NOM-229-SSA1
                      </span>
                    </div>

                    {/* Option 1: Vidrios Emplomados Personalizados */}
                    <button
                      onClick={() => {
                        setCustomDropdownOpen(false);
                        onNavigate('vidrio-personalizado');
                      }}
                      className={`group text-left p-4 rounded-2xl border transition-all ${
                        activeRoute === 'vidrio-personalizado'
                          ? 'bg-[#0052FF]/5 border-[#0052FF]'
                          : 'bg-[#F7F7F4]/70 hover:bg-[#0D1117] hover:text-white border-[#0D1117]/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-[#0D1117] transition-colors">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">
                          OPCIÓN 01
                        </span>
                      </div>
                      <div className="font-display font-bold text-sm mb-1 flex items-center gap-1">
                        <span>Vidrios Emplomados</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <p className="text-xs opacity-70 leading-relaxed mb-3">
                        Calcula ancho × alto, espesor (8mm, 10mm, 12mm) y origen (China, Francia, Alemania).
                      </p>
                      <div className="text-[10px] font-mono text-[#0052FF] group-hover:text-amber-300">
                        1.7 a 2.9 mm Pb · Configurar a medida →
                      </div>
                    </button>

                    {/* Option 2: Blindaje Personalizado */}
                    <button
                      onClick={() => {
                        setCustomDropdownOpen(false);
                        onNavigate('blindaje-personalizado');
                      }}
                      className={`group text-left p-4 rounded-2xl border transition-all ${
                        activeRoute === 'blindaje-personalizado'
                          ? 'bg-[#0052FF]/5 border-[#0052FF]'
                          : 'bg-[#F7F7F4]/70 hover:bg-[#0D1117] hover:text-white border-[#0D1117]/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0052FF]/15 text-[#0052FF] flex items-center justify-center group-hover:bg-[#0052FF] group-hover:text-white transition-colors">
                          <Layers className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">
                          OPCIÓN 02
                        </span>
                      </div>
                      <div className="font-display font-bold text-sm mb-1 flex items-center gap-1">
                        <span>Blindaje Personalizado</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <p className="text-xs opacity-70 leading-relaxed mb-3">
                        Dimensiona muros, puertas y láminas de plomo (1mm, 1.5mm y 2mm) por tipo de sala.
                      </p>
                      <div className="text-[10px] font-mono text-[#0052FF] group-hover:text-blue-300">
                        Pureza 99.9% Pb · Dimensionar sala →
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('campana-vidrio')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                activeRoute === 'campana-vidrio'
                  ? 'bg-amber-500 text-[#0D1117] shadow-sm'
                  : 'text-amber-700 hover:bg-amber-500/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Landing Vidrio Pb</span>
            </button>

            <button
              onClick={() => onNavigate('contacto')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeRoute === 'contacto'
                  ? 'bg-[#0D1117] text-white shadow-sm'
                  : 'text-[#0D1117]/75 hover:text-[#0D1117] hover:bg-[#0D1117]/5'
              }`}
            >
              Contacto
            </button>
          </nav>

          {/* Right Action Controls (Cart/Quote Drawer) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0D1117] hover:bg-[#0052FF] text-white text-xs font-semibold transition-all shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Carrito / Cotizar</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-mono text-[11px]">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2.5 rounded-full bg-white border border-[#0D1117]/12 text-[#0D1117]"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#0D1117]/10 px-6 py-6 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('home');
                }}
                className="p-3 rounded-2xl bg-[#F7F7F4] text-left font-semibold text-sm"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('nosotros');
                }}
                className="p-3 rounded-2xl bg-[#F7F7F4] text-left font-semibold text-sm"
              >
                Nosotros
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('tienda');
                }}
                className="p-3 rounded-2xl bg-[#F7F7F4] text-left font-semibold text-sm"
              >
                Tienda (3 Líneas)
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('contacto');
                }}
                className="p-3 rounded-2xl bg-[#F7F7F4] text-left font-semibold text-sm"
              >
                Contacto
              </button>
            </div>

            <div className="pt-2 border-t border-[#0D1117]/10">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#0D1117]/50 mb-2">
                Medidas Personalizadas (Cálculo + CMS + WhatsApp)
              </div>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('vidrio-personalizado');
                  }}
                  className="p-3.5 rounded-2xl bg-[#0052FF]/10 border border-[#0052FF]/20 text-left flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-sm text-[#0D1117]">
                      1. Vidrios Emplomados Personalizados
                    </div>
                    <div className="text-xs text-[#0D1117]/65">
                      Calculadora de corte, espesor y equivalencia Pb
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#0052FF]" />
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('blindaje-personalizado');
                  }}
                  className="p-3.5 rounded-2xl bg-[#0D1117] text-white text-left flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-sm">2. Blindaje Radiológico Personalizado</div>
                    <div className="text-xs text-white/70">
                      Calculadora de láminas de plomo para muros y salas
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-amber-400" />
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('campana-vidrio');
                  }}
                  className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-left flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-sm text-[#0D1117]">
                      Campaña Especial: Vidrio Emplomado
                    </div>
                    <div className="text-xs text-[#0D1117]/70">
                      Landing dedicada de venta inmediata
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-amber-600" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

