import React from 'react';
import {
  ShieldCheck,
  Award,
  Truck,
  FileCheck,
  Globe,
  ArrowUpRight,
  PhoneCall,
  Layers,
  Maximize2
} from 'lucide-react';
import { ActiveRoute } from '../components/Navbar';
import { openWhatsAppWithQuote } from '../data/taxonomyData';

interface AboutViewProps {
  onNavigate: (route: ActiveRoute) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F7F7F4] pb-24">
      <section className="bg-white border-b border-[#0D1117]/10 pt-14 pb-20 bg-clinical-grid">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#0052FF] font-bold mb-3">
            NOSOTROS // DISTRIBUIDORA ARXEM® MÉXICO
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0D1117] max-w-4xl leading-[1.05] mb-6">
            Más de 14 años protegiendo la vida detrás de cada diagnóstico radiológico.
          </h1>
          <p className="text-base sm:text-lg text-[#0D1117]/70 leading-relaxed max-w-3xl">
            Somos una empresa mexicana establecida en el Estado de México con alcance nacional. Nuestro objetivo es cubrir integralmente las necesidades de <strong className="text-[#0D1117]">protección radiológica, blindaje estructural y equipo médico</strong> con más de 200 soluciones certificadas para hospitales, clínicas, dentistas, veterinarias, laboratorios y constructoras.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { value: '+14 Años', label: 'De trayectoria en el sector médico mexicano' },
              { value: 'NOM-229', label: 'Cumplimiento estricto ante COFEPRIS / SSA' },
              { value: '4 Países', label: 'Importación de Francia, Alemania, EE.UU. y China' },
              { value: '0 Conmutadores', label: 'Atención directa de especialista a cliente' }
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl bg-[#F7F7F4] p-6 border border-[#0D1117]/10"
              >
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#0052FF]">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-[#0D1117]/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
              NUESTRA FILOSOFÍA OPERATIVA
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0D1117]">
              ¿Por qué hospitales y constructoras confían en ARXEM?
            </h2>
            <p className="text-sm sm:text-base text-[#0D1117]/70 leading-relaxed">
              En el sector de la radiología, un milímetro de plomo hace la diferencia entre aprobar o detener la licencia sanitaria de un hospital. En ARXEM eliminamos los procesos burocráticos y los conmutadores telefónicos para brindarte certeza técnica inmediata.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: 'Trazabilidad Metalúrgica y Óptica',
                  desc: 'Nuestras láminas de plomo de 1mm, 1.5mm y 2mm cuentan con 99.9% de pureza uniforme, y nuestros vidrios emplomados ofrecen desde 1.7 hasta 2.9 mm Pb.'
                },
                {
                  title: 'Logística Blindada Nacional',
                  desc: 'Enviamos vidrios emplomados de hasta 36"×72" y 1.10×1.20m en huacales de madera fabricados a medida para garantizar que lleguen intactos a tu obra.'
                },
                {
                  title: 'Facturación Fiscal y Precios para Distribuidores',
                  desc: 'Empresa formalmente establecida. Emitimos CFDI 4.0 de inmediato y contamos con esquemas para arquitectos hospitalarios y distribuidores médicos.'
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-white border border-[#0D1117]/10"
                >
                  <h3 className="font-display font-bold text-base text-[#0D1117] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0D1117]/65 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-[32px] bg-[#0D1117] text-white p-8 sm:p-10 space-y-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#60A5FA]">
                HERRAMIENTAS DIGITALES ARXEM 2.0
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold">
                Explora nuestro catálogo o dimensiona tu sala ahora mismo
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Hemos digitalizado nuestros 14 años de experiencia técnica en calculadoras interactivas para que obtengas presupuestos inmediatos de vidrio emplomado y lámina de plomo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onNavigate('vidrio-personalizado')}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-amber-400 hover:text-[#0D1117] transition-all text-left"
                >
                  <Maximize2 className="w-5 h-5 text-amber-400 mb-2" />
                  <div className="font-display font-bold text-sm">Calculadora de Vidrio Pb</div>
                  <div className="text-xs opacity-70">Medidas personalizadas</div>
                </button>
                <button
                  onClick={() => onNavigate('blindaje-personalizado')}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-[#0052FF] transition-all text-left"
                >
                  <Layers className="w-5 h-5 text-[#60A5FA] mb-2" />
                  <div className="font-display font-bold text-sm">Calculadora de Blindaje</div>
                  <div className="text-xs opacity-70">Lámina de plomo por m²</div>
                </button>
              </div>
              <button
                onClick={() => onNavigate('tienda')}
                className="w-full py-4 rounded-2xl bg-white text-[#0D1117] font-display font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
              >
                <span>Ir a la Tienda Oficial ARXEM</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

