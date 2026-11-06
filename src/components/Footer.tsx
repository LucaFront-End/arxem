import React from 'react';
import StickerSlapFooter from '@/components/ui/sticker-slap-footer';
import { ActiveRoute } from './Navbar';
import { StorePillar, SectorSlug } from '../data/catalogData';
import { openWhatsAppWithQuote } from '../data/taxonomyData';

interface FooterProps {
  onNavigate: (
    route: ActiveRoute,
    options?: {
      pillar?: StorePillar;
      category?: string;
      subcategory?: string;
      sector?: SectorSlug;
    }
  ) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <StickerSlapFooter
      wordmark="arxem"
      navLabel="Catálogo Clínico"
      onNavClick={() => onNavigate('tienda', { pillar: 'catalogo-general' })}
      onHomeClick={() => onNavigate('home')}
      chatLabel="WhatsApp Ingeniería Directa"
      onChatClick={() =>
        openWhatsAppWithQuote(
          'Hola ARXEM, busco atención directa para cotizar vidrio emplomado / blindaje radiológico.'
        )
      }
      jobsLabel="01 // SOLUCIONES & TIENDA"
      jobs={[
        {
          title: 'Vidrios Emplomados a Medida',
          onClick: () => onNavigate('vidrio-personalizado'),
        },
        {
          title: 'Blindaje en Lámina de Plomo',
          onClick: () => onNavigate('blindaje-personalizado'),
        },
        {
          title: 'Catálogo General & Equipos',
          onClick: () => onNavigate('tienda', { pillar: 'catalogo-general' }),
        },
        {
          title: 'Nosotros (+14 Años en México)',
          onClick: () => onNavigate('nosotros'),
        },
      ]}
      officeLabel="02 // PLANTA & LOGÍSTICA"
      address={[
        'Tecámac, Estado de México',
        'Envíos en Huacal a 32 Estados',
        'Lun – Vie · 9:00 a 18:00 hrs',
      ]}
      mapLabel="Cobertura Nacional Garantizada"
      onMapClick={() => onNavigate('contacto')}
      contactLabel="03 // CONTACTO DIRECTO"
      email="ventas@distribuidoraarxem.com"
      copiedLabel="¡Correo copiado al portapapeles! ✓"
      note="*Atención directa sin conmutador: 55 1313 5860 · 55 1125 0518 · Facturación CFDI 4.0 inmediata."
      stickers={['nom', 'pb', 'glass', 'logistics']}
      credits={[
        { role: 'Normativa Oficial', name: 'NOM-229-SSA1-2002 · COFEPRIS' },
        { role: 'Facturación Fiscal', name: 'CFDI 4.0 · Distribuidora ARXEM® México' },
        { role: 'Embalaje Nacional', name: 'Huacal de Madera Estructural · 32 Estados' },
        { role: 'Teléfonos Directos', name: '55 1313 5860 · 55 1125 0518' },
      ]}
    />
  );
};
