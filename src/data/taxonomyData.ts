import { SectorSlug, StorePillar } from './catalogData';

export interface MasterCategoryItem {
  id: string;
  name: string;
  code: string;
  tagline: string;
  description: string;
  norm: string;
  accentColor: string;
  subcategories: string[];
  heroImage: string;
}

export const MASTER_CATEGORIES: MasterCategoryItem[] = [
  {
    id: 'proteccion-radiologica',
    name: 'Protección Radiológica',
    code: 'CAT-01 // DOSIMETRÍA PERSONAL',
    tagline: 'Atenuación ergonómica certificada para operadores clínicos.',
    description: 'Barreras corporales con núcleo de plomo homogeneizado de 0.50 mm y 0.75 mm Pb. Diseñadas para largas jornadas en quirófano, hemodinamia y diagnóstico dental.',
    norm: 'NOM-229-SSA1-2002 · IEC 61331-3',
    accentColor: '#0052FF',
    subcategories: [
      'Mandiles Emplomados',
      'Collarines de Tiroides',
      'Guantes Emplomados',
      'Lentes Emplomados',
      'Protectores Gonadales',
      'Kits de Protección'
    ],
    heroImage: 'https://static.wixstatic.com/media/45119e_f3ce7d6ffcef4004a81407243b9922ec~mv2.png'
  },
  {
    id: 'blindaje-radiologico',
    name: 'Blindaje Radiológico',
    code: 'CAT-02 // ARQUITECTURA BLINDADA',
    tagline: 'Ingeniería estructural para salas de Rayos X, CT y Mastografía.',
    description: 'Cristales ópticos de alto óxido de plomo (importados de Francia, Alemania y China) y láminas de plomo electrolítico al 99.9% de pureza para muros, puertas y cabinas de control.',
    norm: 'NOM-229-SSA1 · Memoria Analítica COFEPRIS',
    accentColor: '#D97706',
    subcategories: [
      'Vidrios Emplomados',
      'Láminas de Plomo'
    ],
    heroImage: 'https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png'
  },
  {
    id: 'rayos-x-y-radiologia',
    name: 'Rayos X y Radiología',
    code: 'CAT-03 // IMAGENOLOGÍA CLÍNICA',
    tagline: 'Resolución diagnóstica y revelado de contraste superior.',
    description: 'Películas ortocromáticas y térmicas Fuji, chasis alemanes con pantalla verde velocidad 400/600 y química reveladora/fijadora de grado hospitalario.',
    norm: 'ISO 13485 · Manufactura Alemana & Japonesa',
    accentColor: '#059669',
    subcategories: [
      'Películas Radiográficas',
      'Chasis Radiográficos',
      'Reveladores y Fijadores',
      'Accesorios para Rayos X'
    ],
    heroImage: 'https://static.wixstatic.com/media/56b43b_ec3154811bdb44ffa7ce32f3bfd7c115~mv2.png'
  },
  {
    id: 'equipos-medicos',
    name: 'Equipos Médicos',
    code: 'CAT-04 // ALTA ESPECIALIDAD',
    tagline: 'Tecnología biomédica para diagnóstico, oxigenoterapia y rehabilitación.',
    description: 'Desde densitómetros óseos DXA de cuerpo completo y colposcopios pantográficos hasta concentradores de oxígeno estacionarios de 5 y 10 L/min.',
    norm: 'Registro Sanitario COFEPRIS · CE Medical',
    accentColor: '#0284C7',
    subcategories: [
      'Equipos de Diagnóstico',
      'Equipos de Ginecología',
      'Equipos de Oxigenoterapia',
      'Equipos de Rehabilitación'
    ],
    heroImage: 'https://static.wixstatic.com/media/56b43b_28f4376543134818bd65fd51eafcc49d~mv2.jpg'
  },
  {
    id: 'insumos-medicos',
    name: 'Insumos Médicos',
    code: 'CAT-05 // CONSUMIBLES DE PRECISIÓN',
    tagline: 'Instrumental especializado para histerosalpingografía y ultrasonido.',
    description: 'Cánulas Jarcho en acero inoxidable alemán, catéteres con balón para histerosonografía y geles conductores acústicos de alta densidad.',
    norm: 'Acero Quirúrgico Alemán · Libre de Látex',
    accentColor: '#4F46E5',
    subcategories: [
      'Cánulas y Catéteres',
      'Gel para Ultrasonido',
      'Insumos de Diagnóstico'
    ],
    heroImage: 'https://static.wixstatic.com/media/56b43b_3bc1f2780be54d898e09957d1a930e52~mv2.png'
  },
  {
    id: 'accesorios-de-proteccion',
    name: 'Accesorios de Protección',
    code: 'CAT-06 // PRESERVACIÓN & SOPORTE',
    tagline: 'Sistemas de suspensión en acero inoxidable para prolongar la vida útil del plomo.',
    description: 'Colgadores murales y racks móviles de 5 y 10 ganchos en acero inoxidable 304 que evitan fracturas internas en las láminas de los mandiles emplomados.',
    norm: 'Acero Inoxidable 304 · Grado Quirúrgico',
    accentColor: '#334155',
    subcategories: [
      'Colgadores para Mandiles',
      'Soportes y Almacenamiento'
    ],
    heroImage: 'https://static.wixstatic.com/media/45119e_49f9658adb55414d8b106914296dc158~mv2.png'
  }
];

export interface IndustrySector {
  slug: SectorSlug;
  number: string;
  title: string;
  thinTitle: string;
  boldTitle: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  typicalSpec: string;
  recommendedItems: string[];
  metricLabel: string;
  metricValue: string;
  accent: string;
  image: string;
}

export const INDUSTRY_SECTORS: IndustrySector[] = [
  {
    slug: 'dentistas',
    number: '01',
    title: 'Insumos para Dentistas',
    thinTitle: 'Odontología &',
    boldTitle: 'Dentistas',
    shortTitle: 'Dentistas',
    subtitle: 'Radiología Periapical, Panorámica y Tomografía Cone Beam (CBCT)',
    description: 'Kits de mandil con collarín tiroideo de 0.5 mm Pb, película dental verde HR-U Fuji 15x30 cm y visores de vidrio emplomado compacto (8"x10" y 10"x12") para cabinas odontológicas.',
    typicalSpec: '0.5 mm Pb Corporal · Vidrio 8mm (1.7–1.92 mm Pb)',
    recommendedItems: ['Kit Mandil + Collarín 0.5mm Pb', 'Película Dental HR-U Fuji 15x30', 'Vidrio Emplomado 8"x10" 8mm'],
    metricLabel: 'Atenuación Rayos X Dental (70 kVp)',
    metricValue: '99.4%',
    accent: '#BAE6FD',
    image: '/products/orbit-04-mandil.png'
  },
  {
    slug: 'clinicas',
    number: '02',
    title: 'Clínicas y Hospitales',
    thinTitle: 'Clínicas y',
    boldTitle: 'Hospitales',
    shortTitle: 'Clínicas',
    subtitle: 'Salas de Rayos X, Tomografía, Mastografía, Hemodinamia y Quirófano',
    description: 'Equipamiento integral para departamentos de imagenología: mandiles ergonómicos con soporte lumbar, chaleco-faldón para fluoroscopía, lentes emplomados 0.75 mm Pb y vidrios de gran formato.',
    typicalSpec: 'NOM-229-SSA1-2002 · Blindaje 2.0 a 2.9 mm Pb',
    recommendedItems: ['Conjunto Chaleco y Faldón Pb', 'Vidrio Emplomado 36"x72" 12mm', 'Densitómetro Óseo DXA Osteosys'],
    metricLabel: 'Cumplimiento Normativo COFEPRIS',
    metricValue: '100%',
    accent: '#93C5FD',
    image: '/products/orbit-03-chaleco.png'
  },
  {
    slug: 'veterinarias',
    number: '03',
    title: 'Veterinarias',
    thinTitle: 'Diagnóstico en',
    boldTitle: 'Veterinarias',
    shortTitle: 'Veterinarias',
    subtitle: 'Protección Radiológica Directa para Operadores en Sala',
    description: 'En radiología veterinaria el operador permanece junto al paciente para posicionarlo. Nuestros guantes emplomados, lentes con blindaje lateral de 0.75 mm Pb y mandiles SV ofrecen máxima movilidad.',
    typicalSpec: 'Guantes 0.5 mm Pb · Lentes 0.75 mm Pb · Mandil Nylon',
    recommendedItems: ['Guantes Emplomados Grandes 39cm', 'Mandil Mod. SV Nylon 0.5mm Pb', 'Lentes Emplomados 0.75mm Pb'],
    metricLabel: 'Protección en Sujeción Directa',
    metricValue: '0.75 Pb',
    accent: '#DDD6FE',
    image: '/products/orbit-05-lentes.png'
  },
  {
    slug: 'constructoras',
    number: '04',
    title: 'Constructoras',
    thinTitle: 'Ingeniería &',
    boldTitle: 'Constructoras',
    shortTitle: 'Constructoras',
    subtitle: 'Obra Civil Hospitalaria, Arquitectos y Blindaje Llave en Mano',
    description: 'Suministro directo de rollos y láminas de plomo electrolítico al 99.9% (1mm, 1.5mm y 2mm) y vidrios emplomados de gran formato con embalaje de madera blindado y envío nacional.',
    typicalSpec: 'Lámina Pb 99.9% Pureza · Vidrio Francés / Alemán / Chino',
    recommendedItems: ['Lámina de Plomo 1.10x2.10m 2mm', 'Vidrio Emplomado Alemán 1.10x1.20m', 'Vidrio Francés 36"x36" 2.6 Pb'],
    metricLabel: 'Densidad del Plomo Estructural',
    metricValue: '11.34 g/cm³',
    accent: '#FCD34D',
    image: '/products/orbit-02-lamina.png'
  },
  {
    slug: 'laboratorios',
    number: '05',
    title: 'Laboratorios',
    thinTitle: 'Gabinetes y',
    boldTitle: 'Laboratorios',
    shortTitle: 'Laboratorios',
    subtitle: 'Centros de Diagnóstico, Imagenología e Investigación',
    description: 'Abastecimiento continuo de consumibles radiográficos (películas térmicas DI-HT y verdes HR-U Fuji, reveladores Norkim 19L/38L), chasis alemanes velocidad 600 y cánulas especializadas.',
    typicalSpec: 'Abasto Continuo · Facturación Inmediata · Precios B2B',
    recommendedItems: ['Chasis Alemán Vel. 600 con Ventana', 'Película DI-HT Térmica Fuji 100H', 'Kit Revelador y Fijador Norkim 38L'],
    metricLabel: 'Despacho Nacional Garantizado',
    metricValue: '24–72h',
    accent: '#A7F3D0',
    image: '/products/orbit-06-chasis.png'
  }
];

export const STORE_PILLARS: {
  id: StorePillar;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
}[] = [
  {
    id: 'catalogo-general',
    title: 'Catálogo Clínico & Protección',
    badge: 'PROTECCIÓN · RAYOS X · EQUIPOS',
    subtitle: 'Mandiles, collarines, lentes, guantes, chasis, películas, consumibles y equipo médico.',
    description: 'Todos nuestros insumos médicos, protección radiológica personal y equipamiento clínico reunidos en una experiencia de compra ágil o cotización directa.'
  },
  {
    id: 'vidrios-emplomados',
    title: 'Vidrios Emplomados',
    badge: '8MM · 10MM · 12MM // CHINA · FRANCIA · ALEMANIA',
    subtitle: 'Cristales de alta densidad óptica con equivalencia de 1.7 mm a 2.9 mm Pb.',
    description: 'El mismo estándar de blindaje óptico certificado en múltiples medidas de línea o corte personalizado para salas de Rayos X, Tomografía y Mastografía.'
  },
  {
    id: 'blindaje',
    title: 'Blindaje (Láminas de Plomo)',
    badge: '1.0MM · 1.5MM · 2.0MM PB // PUREZA 99.9%',
    subtitle: 'Lámina de plomo electrolítico para recubrimiento de muros, puertas y marcos.',
    description: 'Placas y rollos de densidad uniforme sin porosidad para proyectos hospitalarios, clínicas dentales y constructoras bajo norma NOM-229-SSA1.'
  }
];

export interface ClinicalReview {
  id: string;
  author: string;
  role: string;
  institution: string;
  city: string;
  rating: number;
  date: string;
  verified: boolean;
  productTag: string;
  comment: string;
  metricHighlight: string;
}

export const VERIFIED_REVIEWS: ClinicalReview[] = [
  {
    id: 'rev-1',
    author: 'Arq. Roberto Méndez Villalobos',
    role: 'Director de Obra Hospitalaria',
    institution: 'Constructora Médica del Bajío',
    city: 'Querétaro, Qro.',
    rating: 5,
    date: 'Hace 2 semanas',
    verified: true,
    productTag: 'Vidrio Emplomado 36"x72" 12mm + Lámina de Plomo 2mm',
    comment: 'Compramos 3 vidrios emplomados de 36x72 pulgadas en 12mm y 45 láminas de plomo de 2mm para dos salas de tomografía. Llegaron en huacal de madera perfectamente protegidos, pasaron las pruebas de levantamiento radiométrico de COFEPRIS al primer intento.',
    metricHighlight: 'Aprobación COFEPRIS 100% en primera inspección'
  },
  {
    id: 'rev-2',
    author: 'Dra. Elena Vázquez Cárdenas',
    role: 'Médico Radiólogo Titular',
    institution: 'Centro de Diagnóstico Imagenológico Avanzado',
    city: 'Guadalajara, Jal.',
    rating: 5,
    date: 'Hace 1 mes',
    verified: true,
    productTag: 'Conjunto Chaleco y Faldón Emplomado + Lentes 0.75mm Pb',
    comment: 'El conjunto de chaleco y faldón distribuye el peso de forma increíble durante procedimientos largos de fluoroscopía. Además la atención por WhatsApp fue inmediata, sin conmutadores, y nos enviaron factura el mismo día.',
    metricHighlight: 'Reducción del 60% en fatiga lumbar clínica'
  },
  {
    id: 'rev-3',
    author: 'Dr. Carlos Ortega Salinas',
    role: 'Cirujano Maxilofacial',
    institution: 'Clínica Dental & Ortodoncia Digital',
    city: 'Monterrey, N.L.',
    rating: 5,
    date: 'Hace 3 semanas',
    verified: true,
    productTag: 'Kit de Mandil y Collarín 0.5mm + Vidrio 12"x16"',
    comment: 'Equipamos nuestro nuevo gabinete de tomografía dental CBCT con ARXEM. El calculador de medidas nos ayudó a elegir exactamente el vidrio de 12x16" y el kit de mandil azul con collarín tiroideo tiene acabados de primera.',
    metricHighlight: 'Entrega en 48 hrs en Monterrey'
  },
  {
    id: 'rev-4',
    author: 'MVZ. Alejandro Torres',
    role: 'Director Clínico',
    institution: 'Hospital Veterinario Metropolitano',
    city: 'Ciudad de México',
    rating: 5,
    date: 'Hace 1 mes',
    verified: true,
    productTag: 'Guantes Emplomados 39cm + Mandil Mod. SV',
    comment: 'En veterinaria necesitamos sujetar a los pacientes durante las placas. Los guantes de 39cm de 0.5mm Pb y los mandiles con cierre de velcro son súper resistentes y fáciles de sanitizar.',
    metricHighlight: 'Uso intensivo diario > 25 estudios/día'
  }
];

export const PRODUCT_BENEFITS = [
  {
    code: 'BEN-01',
    title: 'Certificación NOM-229-SSA1-2002',
    description: 'Todos nuestros vidrios emplomados, láminas de plomo y prendas de protección cumplen estrictamente con los espesores equivalentes en plomo (mm Pb) exigidos por la Secretaría de Salud y COFEPRIS.'
  },
  {
    code: 'BEN-02',
    title: 'Embalaje Blindado en Huacal de Madera',
    description: 'Los vidrios emplomados viajan en cajas de madera de grado exportación con espuma de poliuretano de alta densidad para garantizar cero microfisuras hasta tu obra o hospital.'
  },
  {
    code: 'BEN-03',
    title: 'Atención Directa sin Conmutadores',
    description: 'Más de 14 años en México atendiendo de ingeniero a ingeniero y de especialista a médico. Cotizaciones formales en minutos y facturación fiscal CFDI 4.0 inmediata.'
  },
  {
    code: 'BEN-04',
    title: 'Importación Directa (Alemania, Francia, EE.UU. y China)',
    description: 'Trazabilidad total por lote de fabricación: vidrio óptico francés de 2.6 mm Pb, cristal alemán de 2.1 mm Pb, chasis alemanes velocidad 600 y mandiles americanos.'
  }
];

export interface CMSQuoteRecord {
  id: string;
  createdAt: string;
  type: 'VIDRIO_PERSONALIZADO' | 'BLINDAJE_PERSONALIZADO' | 'COTIZACION_PRODUCTO' | 'CAMPANA_VIDRIO';
  clientName: string;
  clientCompany: string;
  clientPhone: string;
  clientCity: string;
  summary: string;
  specs: Record<string, string | number>;
  estimatedTotalMXN: number;
  status: 'GUARDADO_EN_CMS' | 'ENVIADO_WHATSAPP';
}

export const WHATSAPP_PRIMARY = '525513135860'; // Real ARXEM WhatsApp: 55 1313 5860

export function getSavedCMSQuotes(): CMSQuoteRecord[] {
  try {
    const raw = localStorage.getItem('arxem_wix_cms_quotes');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveQuoteToCMS(record: Omit<CMSQuoteRecord, 'id' | 'createdAt'>): CMSQuoteRecord {
  const existing = getSavedCMSQuotes();
  const newRecord: CMSQuoteRecord = {
    ...record,
    id: `WIX-CMS-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toLocaleString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  const updated = [newRecord, ...existing];
  try {
    localStorage.setItem('arxem_wix_cms_quotes', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('arxem-cms-updated'));
  } catch {
    // ignore storage errors
  }
  return newRecord;
}

export function openWhatsAppWithQuote(message: string) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_PRIMARY}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

