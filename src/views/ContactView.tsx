import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Database,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { saveQuoteToCMS, openWhatsAppWithQuote } from '../data/taxonomyData';

interface ContactViewProps {
  onOpenCMSModal: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenCMSModal }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [topic, setTopic] = useState('Cotización de Vidrio Emplomado / Blindaje');
  const [message, setMessage] = useState('');
  const [savedFolio, setSavedFolio] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const record = saveQuoteToCMS({
      type: 'COTIZACION_PRODUCTO',
      clientName: name,
      clientCompany: company || 'Particular / Clínica',
      clientPhone: phone,
      clientCity: city,
      summary: `Contacto Directo (${topic}): ${message.slice(0, 80)}`,
      specs: {
        tema: topic,
        mensaje: message
      },
      estimatedTotalMXN: 0,
      status: 'ENVIADO_WHATSAPP'
    });

    setSavedFolio(record.id);

    const waText = [
      `Hola *ARXEM®*, me pongo en contacto desde su sitio web (Folio CMS: *${record.id}*):`,
      ``,
      `• *Nombre:* ${name}`,
      `• *Empresa / Clínica:* ${company || 'N/A'}`,
      `• *Ciudad:* ${city}`,
      `• *Teléfono:* ${phone}`,
      `• *Motivo:* ${topic}`,
      `• *Mensaje:* ${message}`
    ].join('\n');

    openWhatsAppWithQuote(waText);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F4] pb-24">
      <section className="bg-white border-b border-[#0D1117]/10 pt-12 pb-16 bg-clinical-grid">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#0052FF] font-bold mb-2">
            CONTACTO DIRECTO // SIN CONMUTADORES
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0D1117] mb-3">
            Atención personalizada para tu clínica u obra hospitalaria.
          </h1>
          <p className="text-sm sm:text-base text-[#0D1117]/70 max-w-2xl">
            Comunícate directamente con nuestros especialistas en blindaje radiológico y equipamiento médico. Respondemos cotizaciones el mismo día.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl bg-[#0D1117] text-white p-8 space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  CANALES OFICIALES ARXEM®
                </div>
                <h2 className="font-display text-2xl font-bold mt-1">
                  Distribuidora ARXEM México
                </h2>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-xs text-white/50">TELÉFONOS Y WHATSAPP DIRECTO</div>
                    <div className="font-mono font-bold text-base">55 1313 5860 · 55 1125 0518</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-xs text-white/50">CORREOS ELECTRÓNICOS</div>
                    <div className="font-mono">ventas@distribuidoraarxem.com</div>
                    <div className="font-mono text-white/75">rayosx07@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-xs text-white/50">CENTRO LOGÍSTICO Y OPERACIONES</div>
                    <div>Tecámac, Estado de México (Envíos asegurados a toda la República)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-xs text-white/50">HORARIO DE ATENCIÓN</div>
                    <div>Lunes a Viernes: 9:00 am – 6:00 pm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Quote Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-[32px] bg-white border border-[#0D1117]/12 p-8 sm:p-10 shadow-sm space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#0D1117]/10 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-[#0052FF] font-bold">
                    SOLICITUD TÉCNICA O COMERCIAL
                  </span>
                  <h2 className="font-display text-2xl font-extrabold text-[#0D1117]">
                    Envíanos tu requerimiento (Se guarda en CMS y abre WhatsApp)
                  </h2>
                </div>
                <Database className="w-6 h-6 text-[#0052FF]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre completo *"
                  className="px-4 py-3 rounded-xl bg-[#F7F7F4] border border-[#0D1117]/15 text-sm"
                />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Clínica, Hospital, Laboratorio o Constructora"
                  className="px-4 py-3 rounded-xl bg-[#F7F7F4] border border-[#0D1117]/15 text-sm"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Teléfono / WhatsApp *"
                  className="px-4 py-3 rounded-xl bg-[#F7F7F4] border border-[#0D1117]/15 text-sm"
                />
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ciudad y Estado *"
                  className="px-4 py-3 rounded-xl bg-[#F7F7F4] border border-[#0D1117]/15 text-sm"
                />
              </div>

              <div>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F7F4] border border-[#0D1117]/15 text-sm font-semibold"
                >
                  <option value="Cotización de Vidrio Emplomado / Blindaje">
                    Cotización de Vidrio Emplomado / Blindaje
                  </option>
                  <option value="Compra de Mandiles y Protección Radiológica">
                    Compra de Mandiles y Protección Radiológica
                  </option>
                  <option value="Consumibles (Películas Fuji, Chasis, Reveladores)">
                    Consumibles (Películas Fuji, Chasis, Reveladores)
                  </option>
                  <option value="Equipamiento Médico (Densitómetro, Colposcopio, Oxígeno)">
                    Equipamiento Médico (Densitómetro, Colposcopio, Oxígeno)
                  </option>
                  <option value="Precios Especiales para Distribuidor / Constructora">
                    Precios Especiales para Distribuidor / Constructora
                  </option>
                </select>
              </div>

              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe los productos, medidas de vidrio emplomado o cantidad de láminas de plomo que necesitas..."
                className="w-full px-4 py-3 rounded-xl bg-[#F7F7F4] border border-[#0D1117]/15 text-sm"
              />

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#0D1117] hover:bg-[#0052FF] text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Guardar Solicitud y Enviar por WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {savedFolio && (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-950 text-xs font-mono flex items-center justify-between">
                  <span>✓ Registrado en Wix Headless CMS con Folio: {savedFolio}</span>
                  <button
                    type="button"
                    onClick={onOpenCMSModal}
                    className="underline font-bold text-[#0052FF]"
                  >
                    Ver en CMS →
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

