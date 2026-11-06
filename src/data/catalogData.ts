// Auto-generated from catalog_products (33).csv with ARXEM taxonomy & metadata
export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  inventory: string;
  sku: string;
  weight: number;
}

export type StorePillar = 'catalogo-general' | 'vidrios-emplomados' | 'blindaje';
export type SectorSlug = 'dentistas' | 'clinicas' | 'veterinarias' | 'constructoras' | 'laboratorios';

export interface CatalogProduct {
  id: string;
  name: string;
  descriptionHtml: string;
  plainText: string;
  wixCategories: string[];
  ribbon: string;
  brand: string;
  basePrice: number;
  inventory: string;
  sku: string;
  weight: number;
  optionName: string;
  optionType: string;
  optionChoices: string[];
  variants: ProductVariant[];
  media: string[];
  masterCategory: string;
  subcategory: string;
  storePillar: StorePillar;
  sectors: SectorSlug[];
  leadEquivalency: string;
  saleMode: 'ecommerce' | 'quote' | 'both';
  rating: number;
  reviewCount: number;
  normCompliance: string;
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    "id": "Product_54d26402-184d-4fc8-991d-0bedfef80c45",
    "name": "Película dental HR-U verde Fuji 15x30 cm",
    "descriptionHtml": "<p>ANCHO 18 CMS. X 4 CMS. ALTO X 33 CMS. LARGO, 1.5 KGS.</p>",
    "plainText": "ANCHO 18 CMS. X 4 CMS. ALTO X 33 CMS. LARGO, 1.5 KGS.",
    "wixCategories": [
      "consumibles-para-rayos-x",
      "rayos-x"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 1538.16,
    "inventory": "22",
    "sku": "HR-U15X30",
    "weight": 1.5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_b6c48a96eef841b2b4af5540c89f970f~mv2.jpg"
    ],
    "masterCategory": "Rayos X y Radiología",
    "subcategory": "Películas Radiográficas",
    "storePillar": "catalogo-general",
    "sectors": [
      "dentistas",
      "clinicas",
      "laboratorios"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 14,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_34841520-1ac4-4a5c-968f-6466f22ddb7a",
    "name": "Película HR-U verde FUJI 100H",
    "descriptionHtml": "<p>ANCHO 35 CMS. X 5 CMS. ALTO X 40 CMS. LARGO</p>",
    "plainText": "ANCHO 35 CMS. X 5 CMS. ALTO X 40 CMS. LARGO",
    "wixCategories": [
      "consumibles-para-rayos-x",
      "rayos-x"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 1695.2,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 1,
    "optionName": "Medida",
    "optionType": "TEXT_CHOICES",
    "optionChoices": [
      "8\"x10\"",
      "10\"x12\"",
      "30cmx35cm",
      "14\"x14\"",
      "14\"x17\""
    ],
    "variants": [
      {
        "id": "Product_34841520-1ac4-4a5c-968f-6466f22ddb7a-1",
        "label": "8\"x10\"",
        "price": 1695.2,
        "inventory": "IN_STOCK",
        "sku": "",
        "weight": 2
      },
      {
        "id": "Product_34841520-1ac4-4a5c-968f-6466f22ddb7a-2",
        "label": "10\"x12\"",
        "price": 2335.2,
        "inventory": "IN_STOCK",
        "sku": "",
        "weight": 2
      },
      {
        "id": "Product_34841520-1ac4-4a5c-968f-6466f22ddb7a-3",
        "label": "30cmx35cm",
        "price": 3685.2,
        "inventory": "IN_STOCK",
        "sku": "",
        "weight": 3
      },
      {
        "id": "Product_34841520-1ac4-4a5c-968f-6466f22ddb7a-4",
        "label": "14\"x14\"",
        "price": 4024.2,
        "inventory": "IN_STOCK",
        "sku": "",
        "weight": 4
      },
      {
        "id": "Product_34841520-1ac4-4a5c-968f-6466f22ddb7a-5",
        "label": "14\"x17\"",
        "price": 4745.2,
        "inventory": "IN_STOCK",
        "sku": "",
        "weight": 4
      }
    ],
    "media": [
      "https://static.wixstatic.com/media/56b43b_b6c48a96eef841b2b4af5540c89f970f~mv2.jpg"
    ],
    "masterCategory": "Rayos X y Radiología",
    "subcategory": "Películas Radiográficas",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios",
      "veterinarias"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 21,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_ec33a435-ac02-4ed5-bd14-00abd2f46135",
    "name": "Chasis pantalla verde, vel.600 con ventana, manuf. Alemana",
    "descriptionHtml": "<p>CHASIS PARA PELÍCULA RADIOGRÁFICA , CON PANTALLAS VERDES, VEL. 600, CON VENTANA IDENTIFICADORA, MANUF. ALEMANA.</p>",
    "plainText": "CHASIS PARA PELÍCULA RADIOGRÁFICA , CON PANTALLAS VERDES, VEL. 600, CON VENTANA IDENTIFICADORA, MANUF. ALEMANA.",
    "wixCategories": [
      "rayos-x",
      "accesorios-para-rayos-x"
    ],
    "ribbon": "Piezas Únicas",
    "brand": "ARXEM",
    "basePrice": 4004,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 1,
    "optionName": "Tamaño",
    "optionType": "TEXT_CHOICES",
    "optionChoices": [
      "8\"x10\"",
      "10\"x12\"",
      "11\"x14\""
    ],
    "variants": [
      {
        "id": "Product_ec33a435-ac02-4ed5-bd14-00abd2f46135-1",
        "label": "8\"x10\"",
        "price": 4004,
        "inventory": "2",
        "sku": "",
        "weight": 2
      },
      {
        "id": "Product_ec33a435-ac02-4ed5-bd14-00abd2f46135-2",
        "label": "10\"x12\"",
        "price": 5144,
        "inventory": "2",
        "sku": "",
        "weight": 3
      },
      {
        "id": "Product_ec33a435-ac02-4ed5-bd14-00abd2f46135-3",
        "label": "11\"x14\"",
        "price": 6394,
        "inventory": "2",
        "sku": "",
        "weight": 3
      }
    ],
    "media": [
      "https://static.wixstatic.com/media/56b43b_ec3154811bdb44ffa7ce32f3bfd7c115~mv2.png"
    ],
    "masterCategory": "Rayos X y Radiología",
    "subcategory": "Chasis Radiográficos",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios",
      "veterinarias"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 28,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_0747cdc8-478d-4990-9be6-174f3b0ead2b",
    "name": "2 Galones de Revelador manual Mca. Norkim",
    "descriptionHtml": "<p>2 GALONES DE REVELADOR MANUAL, CADA GALON SIRVE PARA PREPARAR 19 LTS. MCA. NORKIM</p>",
    "plainText": "2 GALONES DE REVELADOR MANUAL, CADA GALON SIRVE PARA PREPARAR 19 LTS. MCA. NORKIM",
    "wixCategories": [
      "consumibles-para-rayos-x",
      "rayos-x"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 1497.6,
    "inventory": "2",
    "sku": "REMA2GLN",
    "weight": 10,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_e36a205b8a0946929d28abef0ff87eec~mv2.jpg"
    ],
    "masterCategory": "Rayos X y Radiología",
    "subcategory": "Reveladores y Fijadores",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 35,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_842116aa-6c06-4939-82a8-047d16bfdf04",
    "name": "Mandil Emplomado, E, medidas aprox.  69x95cm, 0.5 mm Pb, Con Bolsillo.",
    "descriptionHtml": "<p>Mandil emplomado mod. económico de con bolsillo&nbsp; medidas aprox.&nbsp;&nbsp;69 x 95 cm<br>Características:<br>Con bolsillo en la parte frontal.<br>Con cierre de velcro en costados<br>0.5 mm de protección.</p>",
    "plainText": "Mandil emplomado mod. económico de con bolsillo medidas aprox. 69 x 95 cm Características: Con bolsillo en la parte frontal. Con cierre de velcro en costados 0.5 mm de protección.",
    "wixCategories": [
      "hot-sale",
      "rayos-x",
      "protector-radiologia"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 2318.16,
    "inventory": "1",
    "sku": "ME6995",
    "weight": 5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_77cf443e2ad14c2d96f266aec11f3352~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Mandiles Emplomados",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "0.5 mm Pb frontal",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 42,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_2645501f-8214-4249-8478-dde47a65d6c2",
    "name": "Collarín emplomado Estandar 0.5 mm Pb",
    "descriptionHtml": "<p>1O CMS. ANCHO X 10 CMS. ALTO X 20 CMS. DE LARGO</p>",
    "plainText": "1O CMS. ANCHO X 10 CMS. ALTO X 20 CMS. DE LARGO",
    "wixCategories": [
      "rayos-x",
      "protector-radiologia"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 966.16,
    "inventory": "OUT_OF_STOCK",
    "sku": "CEE05",
    "weight": 0.5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_b4f69012f1754e79a4d20d1770381d87~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Collarines de Tiroides",
    "storePillar": "catalogo-general",
    "sectors": [
      "dentistas",
      "clinicas",
      "veterinarias"
    ],
    "leadEquivalency": "0.5 mm Pb",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 49,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_1555baa5-2f1e-4ddd-b366-e32513368f0b",
    "name": "Collarín emplomado de Lujo 0.5 mm. Pb. para protección de tiroides.",
    "descriptionHtml": "<p>MEDIDAS APROX. 1O CMS. ANCHO X 10 CMS. ALTO X 20 CMS. DE LARGO</p>",
    "plainText": "MEDIDAS APROX. 1O CMS. ANCHO X 10 CMS. ALTO X 20 CMS. DE LARGO",
    "wixCategories": [
      "rayos-x",
      "hot-sale",
      "protector-radiologia"
    ],
    "ribbon": "Recien Llegado",
    "brand": "HEALTH HOME",
    "basePrice": 1195,
    "inventory": "IN_STOCK",
    "sku": "CEDL",
    "weight": 0.5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_b0c5458bf5524b2cbb6e4f61922610d0~mv2.jpg",
      "https://static.wixstatic.com/media/56b43b_2024b24c3efb46f4aefe350b2d916be5~mv2.jpg"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Collarines de Tiroides",
    "storePillar": "catalogo-general",
    "sectors": [
      "dentistas",
      "clinicas",
      "veterinarias"
    ],
    "leadEquivalency": "0.5 mm Pb",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 56,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_e67ee433-9124-4144-a149-106331a44536",
    "name": "Guantes emplomados 0.5 mm. Pb Mediano de 35cms",
    "descriptionHtml": "<p>20 CMS. DE ANCHO X 5 CMS. ALTO X37 CMS. DE LARGO</p>",
    "plainText": "20 CMS. DE ANCHO X 5 CMS. ALTO X37 CMS. DE LARGO",
    "wixCategories": [
      "rayos-x",
      "protector-radiologia"
    ],
    "ribbon": "",
    "brand": "HEALTH HOME",
    "basePrice": 2318.16,
    "inventory": "1",
    "sku": "GEM35",
    "weight": 1.5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_81ba17a2e70640d9b2c70472eb6cd976~mv2.jpg",
      "https://static.wixstatic.com/media/56b43b_6f07ec2ae4f34fc487e7befd5222d4bd~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Guantes Emplomados",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "0.5 mm Pb",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 15,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_5780e46a-1169-4ea4-907b-d315b65cabc8",
    "name": "Guantes de cirugía atenuadores de radiación",
    "descriptionHtml": "<p>GUANTES DE CIRUGIA ATENUADORES DE RADIACIÓN, SIN PLOMO, ESTERILES, SIN POLVO, EXCELENTE FLEXIBILIDAD,espesor equivalente en plomo a 0.035 mm, espesor nominal de 0.35 mm,en números 6.5 al 9</p><p>&nbsp;</p>",
    "plainText": "GUANTES DE CIRUGIA ATENUADORES DE RADIACIÓN, SIN PLOMO, ESTERILES, SIN POLVO, EXCELENTE FLEXIBILIDAD,espesor equivalente en plomo a 0.035 mm, espesor nominal de 0.35 mm,en números 6.5 al 9",
    "wixCategories": [
      "rayos-x",
      "protector-radiologia"
    ],
    "ribbon": "Sobre Pedido",
    "brand": "ARXEM",
    "basePrice": 3582.8,
    "inventory": "1",
    "sku": "CADR",
    "weight": 0.5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_9fe65b94b4e7477fa691dfca6c58a053~mv2.jpg"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Guantes Emplomados",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "0.035 mm Pb Estéril",
    "saleMode": "quote",
    "rating": 5,
    "reviewCount": 22,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_c66d284b-ab8e-4540-820e-69975745b399",
    "name": "Juego de 3 Gonadas emplomadas 0.5 mm Pb",
    "descriptionHtml": "<p>15 CMS. ANCHO X 5 ALTO X 18 CMS. DE LARGO</p>",
    "plainText": "15 CMS. ANCHO X 5 ALTO X 18 CMS. DE LARGO",
    "wixCategories": [
      "rayos-x",
      "protector-radiologia"
    ],
    "ribbon": "",
    "brand": "HEALTH HOME",
    "basePrice": 1579.76,
    "inventory": "1",
    "sku": "S806A",
    "weight": 1,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_ab8a08b0805b4a9ebd80fe456979c3a6~mv2.png",
      "https://static.wixstatic.com/media/56b43b_495d2e9a78ad44719f122b228dfbd29d~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Protectores Gonadales",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios"
    ],
    "leadEquivalency": "0.5 mm Pb",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 29,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_41ee5924-5c88-4ec1-8515-f334fae797d3",
    "name": "Canula de Histerosalpingografía Acero inoxidable Pakistani",
    "descriptionHtml": "<p>CANULA DE JARCHO, PARA ESTUDIO DE HISTEROSALPINGOGRAFIA, DE ACERO INOXIDABLE ALEMAN CONSTA DE LLAVE, OLIVAS Y JERINGA DE VIDRIO, EN SU ESTUCHE DE MADERA</p><p>&nbsp;</p><p>7 CMS. ANCHO X 14 CMS. ALTO X 40 CMS. DE LARGO;</p>",
    "plainText": "CANULA DE JARCHO, PARA ESTUDIO DE HISTEROSALPINGOGRAFIA, DE ACERO INOXIDABLE ALEMAN CONSTA DE LLAVE, OLIVAS Y JERINGA DE VIDRIO, EN SU ESTUCHE DE MADERA 7 CMS. ANCHO X 14 CMS. ALTO X 40 CMS. DE LARGO;",
    "wixCategories": [
      "insumos-médicos"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 6330.48,
    "inventory": "1",
    "sku": "CJAIP",
    "weight": 1,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_248d9d37cc12443eb7662f89257b666c~mv2.png",
      "https://static.wixstatic.com/media/56b43b_b7e52d76a418464ab232909a8d68fd0c~mv2.png"
    ],
    "masterCategory": "Insumos Médicos",
    "subcategory": "Cánulas y Catéteres",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 36,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_ab766292-934a-420a-8c8e-d478006df4c0",
    "name": "Canula de Histerosalpingografía Acero inoxidable Aleman",
    "descriptionHtml": "<p>Canula de histerosalpingografía/ catéter fácil de utilizar y confiable para inyectar medios de contraste o salino en el útero para los procedimientos de histerosalpingografía y sonohisterografía</p>",
    "plainText": "Canula de histerosalpingografía/ catéter fácil de utilizar y confiable para inyectar medios de contraste o salino en el útero para los procedimientos de histerosalpingografía y sonohisterografía",
    "wixCategories": [
      "insumos-médicos"
    ],
    "ribbon": "Sobre Pedido",
    "brand": "ARXEM",
    "basePrice": 8131.76,
    "inventory": "IN_STOCK",
    "sku": "CJAIA",
    "weight": 1,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_3bc1f2780be54d898e09957d1a930e52~mv2.png"
    ],
    "masterCategory": "Insumos Médicos",
    "subcategory": "Cánulas y Catéteres",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios"
    ],
    "leadEquivalency": "",
    "saleMode": "quote",
    "rating": 5,
    "reviewCount": 43,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_3766fe14-450e-448f-80fe-41ff0345dd4c",
    "name": "Catéter para Histerosonografia c/balón, 30 cms. largo, USA",
    "descriptionHtml": "<p>CATÉTER PARA HISTEROSONOGRAFIA C/BALÓN 7 FR. 30 CMS. LARGO, PUNTA CERRADA, U.S.A. CAT. 703001</p>",
    "plainText": "CATÉTER PARA HISTEROSONOGRAFIA C/BALÓN 7 FR. 30 CMS. LARGO, PUNTA CERRADA, U.S.A. CAT. 703001",
    "wixCategories": [
      "insumos-médicos"
    ],
    "ribbon": "Sobre Pedido",
    "brand": "ARXEM",
    "basePrice": 2116.4,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 1,
    "optionName": "Tipo",
    "optionType": "TEXT_CHOICES",
    "optionChoices": [
      "fr 5 vol balon 1 mm punta abierta",
      "fr 7 vol balon 1.5 mm punta abierta",
      "fr 7 vol balon 1.5 mm punta cerrada"
    ],
    "variants": [
      {
        "id": "Product_3766fe14-450e-448f-80fe-41ff0345dd4c-1",
        "label": "fr 5 vol balon 1 mm punta abierta",
        "price": 2116.4,
        "inventory": "IN_STOCK",
        "sku": "",
        "weight": 1
      },
      {
        "id": "Product_3766fe14-450e-448f-80fe-41ff0345dd4c-2",
        "label": "fr 7 vol balon 1.5 mm punta abierta",
        "price": 2116.4,
        "inventory": "IN_STOCK",
        "sku": "",
        "weight": 1
      },
      {
        "id": "Product_3766fe14-450e-448f-80fe-41ff0345dd4c-3",
        "label": "fr 7 vol balon 1.5 mm punta cerrada",
        "price": 2116.4,
        "inventory": "IN_STOCK",
        "sku": "",
        "weight": 1
      }
    ],
    "media": [
      "https://static.wixstatic.com/media/56b43b_7b3dcff7d98a4ba9b565dcfb99956982~mv2.png"
    ],
    "masterCategory": "Insumos Médicos",
    "subcategory": "Cánulas y Catéteres",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios"
    ],
    "leadEquivalency": "",
    "saleMode": "quote",
    "rating": 4.8,
    "reviewCount": 50,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_289083d3-14bc-41eb-8fc7-98c6efc9e7fa",
    "name": "Película DI-HT Térmica FUJI 100H",
    "descriptionHtml": "<p>ANCHO 35 CMS. X 5 CMS. ALTO X 40 CMS. LARGO</p>",
    "plainText": "ANCHO 35 CMS. X 5 CMS. ALTO X 40 CMS. LARGO",
    "wixCategories": [
      "consumibles-para-rayos-x",
      "rayos-x"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 2298.4,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 1,
    "optionName": "Medida",
    "optionType": "TEXT_CHOICES",
    "optionChoices": [
      "8\"x10\"",
      "10\"x12\"",
      "14\"x17\""
    ],
    "variants": [
      {
        "id": "Product_289083d3-14bc-41eb-8fc7-98c6efc9e7fa-1",
        "label": "8\"x10\"",
        "price": 2298.4,
        "inventory": "2",
        "sku": "",
        "weight": 2
      },
      {
        "id": "Product_289083d3-14bc-41eb-8fc7-98c6efc9e7fa-2",
        "label": "10\"x12\"",
        "price": 2298.4,
        "inventory": "0",
        "sku": "",
        "weight": 2
      },
      {
        "id": "Product_289083d3-14bc-41eb-8fc7-98c6efc9e7fa-3",
        "label": "14\"x17\"",
        "price": 2298.4,
        "inventory": "0",
        "sku": "",
        "weight": 2
      }
    ],
    "media": [
      "https://static.wixstatic.com/media/56b43b_b6c48a96eef841b2b4af5540c89f970f~mv2.jpg"
    ],
    "masterCategory": "Rayos X y Radiología",
    "subcategory": "Películas Radiográficas",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios",
      "veterinarias"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 57,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_3d3c6792-f5b4-4b48-a094-4f514e608e10",
    "name": "Chasis pantalla verde, vel.400 con ventana, manuf. Alemana",
    "descriptionHtml": "<p>CHASIS PARA PELÍCULA RADIOGRÁFICA , CON PANTALLAS VERDES, VEL. 600, CON VENTANA IDENTIFICADORA, MANUF. ALEMANA.</p>",
    "plainText": "CHASIS PARA PELÍCULA RADIOGRÁFICA , CON PANTALLAS VERDES, VEL. 600, CON VENTANA IDENTIFICADORA, MANUF. ALEMANA.",
    "wixCategories": [
      "rayos-x",
      "accesorios-para-rayos-x"
    ],
    "ribbon": "Piezas Únicas",
    "brand": "ARXEM",
    "basePrice": 9110.4,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 1,
    "optionName": "Tamaño",
    "optionType": "TEXT_CHOICES",
    "optionChoices": [
      "14\"x14\"",
      "14\"x17\""
    ],
    "variants": [
      {
        "id": "Product_3d3c6792-f5b4-4b48-a094-4f514e608e10-1",
        "label": "14\"x14\"",
        "price": 9110.4,
        "inventory": "IN_STOCK",
        "sku": "",
        "weight": 3
      },
      {
        "id": "Product_3d3c6792-f5b4-4b48-a094-4f514e608e10-2",
        "label": "14\"x17\"",
        "price": 9490.4,
        "inventory": "IN_STOCK",
        "sku": "",
        "weight": 4
      }
    ],
    "media": [
      "https://static.wixstatic.com/media/56b43b_ec3154811bdb44ffa7ce32f3bfd7c115~mv2.png"
    ],
    "masterCategory": "Rayos X y Radiología",
    "subcategory": "Chasis Radiográficos",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios",
      "veterinarias"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 16,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224",
    "name": "Vidrio Emplomado importado de China",
    "descriptionHtml": "<p>VIDRIO EMPLOMADO IMPORTADO DE CHINA</p><p>&nbsp;</p><p>&nbsp;Videio emplomado importado de China de 8 MM de espesor, con (1.7-1.92) de protección:</p><p>10\"X10\" (20.32x25.40cms.) 8MM. (1.7-1.92) SKU-&nbsp;VE8C101</p><p>8\"X10\" (20.32x25.40cms.) 8MM. (1.7-1.92)&nbsp;SKU-VE8C8</p><p>10\"X12\" (25.40x30.48cms.) 8MM. (1.7-1.92)&nbsp; SKU-&nbsp;VE8C10</p><p>12\"X16\" (30.48x40.64cms.)8MM. (1.7-1.92)&nbsp; SKU-&nbsp;VE8C12</p><p>14\"X14\" (35.56x35.56cms.)8MM. (1.7-1.92)&nbsp; SKU-VE8C14</p><p>14\"X18\" (35.56x45.72cms.)8MM. (1.7-1.92)&nbsp; &nbsp;SKU-VE8C148</p><p>18\"X24\" (45.72x60.96cms.)8MM. (1.7-1.92)&nbsp; SKU-VE8C18</p><p>24\"X36\" (60.96.x91.44cms.)8MM. (1.7-1.92)&nbsp; SKU-&nbsp;VE8C24</p><p>36\"X36\" (91.44.8x91.44cms.)8MM. (1.7-1.92)&nbsp; SKU-VE8C36</p><p>&nbsp;</p><p>&nbsp;Videio emplomado importado de China de 10 MM de espesor, con (2-2.40) de protección:</p><p>36\"X36\" (91.44.8x91.44cms.)10 MM. (2-2.40) SKU-VE10C36.1</p><p>36\"X48\" (91.44.8x121.92cms.)10 MM. (2-2.40)&nbsp;SKU-VE10C364</p><p>&nbsp;</p><p>&nbsp;Videio emplomado importado de China de 12 MM de espesor, con (2-2.90) de protección:</p><p>36\"X36\" (91.44.8x91.44cms.)12 MM. (2.5-2.90)&nbsp; SKU-VE12C36</p><p>36\"X48\" (91.44.8x121.92cms.)12 MM. (2.5-2.90) SKU-VE12C364</p><p>36\"X72\" (91.44.8x182.88cms.)12 MM. (2.5-2.90)&nbsp; SKU-VE12C367</p>",
    "plainText": "VIDRIO EMPLOMADO IMPORTADO DE CHINA Videio emplomado importado de China de 8 MM de espesor, con (1.7-1.92) de protección: 10\"X10\" (20.32x25.40cms.) 8MM. (1.7-1.92) SKU- VE8C101 8\"X10\" (20.32x25.40cms.) 8MM. (1.7-1.92) SKU-VE8C8 10\"X12\" (25.40x30.48cms.) 8MM. (1.7-1.92) SKU- VE8C10 12\"X16\" (30.48x40.64cms.)8MM. (1.7-1.92) SKU- VE8C12 14\"X14\" (35.56x35.56cms.)8MM. (1.7-1.92) SKU-VE8C14 14\"X18\" (35.56x45.72cms.)8MM. (1.7-1.92) SKU-VE8C148 18\"X24\" (45.72x60.96cms.)8MM. (1.7-1.92) SKU-VE8C18 24\"X36\" (60.96.x91.44cms.)8MM. (1.7-1.92) SKU- VE8C24 36\"X36\" (91.44.8x91.44cms.)8MM. (1.7-1.92) SKU-VE8C36 Videio emplomado importado de China de 10 MM de espesor, con (2-2.40) de protección: 36\"X36\" (91.44.8x91.44cms.)10 MM. (2-2.40) SKU-VE10C36.1 36\"X48\" (91.44.8x121.92cms.)10 MM. (2-2.40) SKU-VE10C364 Videio emplomado importado de China de 12 MM de espesor, con (2-2.90) de protección: 36\"X36\" (91.44.8x91.44cms.)12 MM. (2.5-2.90) SKU-VE12C36 36\"X48\" (91.44.8x121.92cms.)12 MM. (2.5-2.90) SKU-VE12C364 36\"X72\" (91.44.8x182.88cms.)12 MM. (2.5-2.90) SKU-VE12C367",
    "wixCategories": [
      "protección-radiológica"
    ],
    "ribbon": "Bajo Existencia",
    "brand": "ARXEM",
    "basePrice": 3320,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 1,
    "optionName": "Tamaño",
    "optionType": "TEXT_CHOICES",
    "optionChoices": [
      "8\"x10\" 8mm espesor 1.7-1.92mm protección",
      "10\"x10\" 8mm espesor 1.7-1.92mm protección",
      "10\"x12\" 8mm espesor 1.7-1.92mm protección",
      "12\"x16\" 8mm espesor 1.7-1.92mm protección",
      "14\"x14\" 8mm espesor 1.7-1.92mm protección",
      "14\"x18\" 8mm espesor 1.7-1.92mm protección",
      "18\"x24\" 8mm espesor 1.7-1.92mm protección",
      "24\"x36\" 8mm espesor 1.7-1.92 protección",
      "36\"x36\" 8mm espesor 1.7-1.92mm protección",
      "36\"x36\" 10mm espesor 2.0-2.40 mm protección",
      "36\"x36\" 12mm espesor 2.5-2.9mm protección",
      "36\"x48\" 10mm espesor 2.0-2.90mm protección",
      "36\"x48\" 12mm espesor 2.5-2.90mm protección",
      "36\"x72\" 12mm espesor 2.5-2.9mm protección"
    ],
    "variants": [
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-1",
        "label": "8\"x10\" 8mm espesor 1.7-1.92mm protección",
        "price": 3320,
        "inventory": "IN_STOCK",
        "sku": "VE8C8",
        "weight": 4
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-2",
        "label": "10\"x10\" 8mm espesor 1.7-1.92mm protección",
        "price": 3900,
        "inventory": "IN_STOCK",
        "sku": "VE8C101",
        "weight": 5
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-3",
        "label": "10\"x12\" 8mm espesor 1.7-1.92mm protección",
        "price": 4480,
        "inventory": "IN_STOCK",
        "sku": "VE8C10",
        "weight": 5
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-4",
        "label": "12\"x16\" 8mm espesor 1.7-1.92mm protección",
        "price": 6880,
        "inventory": "IN_STOCK",
        "sku": "VE8C12",
        "weight": 7
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-5",
        "label": "14\"x14\" 8mm espesor 1.7-1.92mm protección",
        "price": 7000,
        "inventory": "IN_STOCK",
        "sku": "VE8C14",
        "weight": 8
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-6",
        "label": "14\"x18\" 8mm espesor 1.7-1.92mm protección",
        "price": 8680,
        "inventory": "IN_STOCK",
        "sku": "VE8C148",
        "weight": 9
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-7",
        "label": "18\"x24\" 8mm espesor 1.7-1.92mm protección",
        "price": 14760,
        "inventory": "IN_STOCK",
        "sku": "VE8C18",
        "weight": 14
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-8",
        "label": "24\"x36\" 8mm espesor 1.7-1.92 protección",
        "price": 27940,
        "inventory": "IN_STOCK",
        "sku": "VE8C24",
        "weight": 30
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-9",
        "label": "36\"x36\" 8mm espesor 1.7-1.92mm protección",
        "price": 42500,
        "inventory": "IN_STOCK",
        "sku": "VE8C36",
        "weight": 39
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-10",
        "label": "36\"x36\" 10mm espesor 2.0-2.40 mm protección",
        "price": 55161.96,
        "inventory": "IN_STOCK",
        "sku": "VE10C36.1",
        "weight": 42
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-11",
        "label": "36\"x36\" 12mm espesor 2.5-2.9mm protección",
        "price": 51580,
        "inventory": "IN_STOCK",
        "sku": "VE12C36",
        "weight": 60
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-12",
        "label": "36\"x48\" 10mm espesor 2.0-2.90mm protección",
        "price": 61860,
        "inventory": "IN_STOCK",
        "sku": "VE10C364",
        "weight": 65
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-13",
        "label": "36\"x48\" 12mm espesor 2.5-2.90mm protección",
        "price": 68700,
        "inventory": "IN_STOCK",
        "sku": "VE12C364",
        "weight": 75
      },
      {
        "id": "Product_b2c5150a-1805-46c2-9707-f2b9c610c224-14",
        "label": "36\"x72\" 12mm espesor 2.5-2.9mm protección",
        "price": 118459.8,
        "inventory": "IN_STOCK",
        "sku": "VE12C367",
        "weight": 135
      }
    ],
    "media": [
      "https://static.wixstatic.com/media/56b43b_3ba8d390a05c4efbae3eb60bbcd8917e~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "1.7 - 1.92 mm Pb (8mm espesor)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 23,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_fb2f130e-c7b3-49b6-bddb-082bebd837e6",
    "name": "Chasis lanex fast mca. Kodak 14 x 17”",
    "descriptionHtml": "",
    "plainText": "",
    "wixCategories": [
      "accesorios-para-rayos-x"
    ],
    "ribbon": "Pieza Única",
    "brand": "ARXEM",
    "basePrice": 11648,
    "inventory": "1",
    "sku": "",
    "weight": 1,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_098b4157f70d4ab48e0bc4a0443ed7e7~mv2.png"
    ],
    "masterCategory": "Rayos X y Radiología",
    "subcategory": "Chasis Radiográficos",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios",
      "veterinarias"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 30,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_f9da77ec-eb96-4a44-817e-04fe3280237b",
    "name": "Gel para transductor  Konix Turkuaz",
    "descriptionHtml": "",
    "plainText": "",
    "wixCategories": [
      "insumos-médicos"
    ],
    "ribbon": "Sobre Pedido",
    "brand": "ARXEM",
    "basePrice": 709.28,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 6,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_0f44a8cddfdd49b98d51c6a5cd7f6b67~mv2.jpg"
    ],
    "masterCategory": "Insumos Médicos",
    "subcategory": "Gel para Ultrasonido",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios",
      "veterinarias"
    ],
    "leadEquivalency": "",
    "saleMode": "quote",
    "rating": 5,
    "reviewCount": 37,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_c8f6ede7-55fc-46a7-9f39-9114e1f12b87",
    "name": "Colchón de presión alterna con sistema de burbujas mod.1",
    "descriptionHtml": "",
    "plainText": "",
    "wixCategories": [
      "salud-y-bienestar"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 1295.84,
    "inventory": "IN_STOCK",
    "sku": "COL-CC001",
    "weight": 4,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_c8254d4e8a564bab9664ce2de40252f0~mv2.png"
    ],
    "masterCategory": "Equipos Médicos",
    "subcategory": "Equipos de Rehabilitación",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 44,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_87ff33a3-c563-4e23-b5e0-6f054f07253e",
    "name": "Electroestimulador, TENS EMS 2  CANALES, ALEMAN EM41",
    "descriptionHtml": "",
    "plainText": "",
    "wixCategories": [
      "salud-y-bienestar"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 1268.8,
    "inventory": "IN_STOCK",
    "sku": "EM41",
    "weight": 1,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_980d8c980d7c408ab3d366deb1807ba1~mv2.jpeg"
    ],
    "masterCategory": "Equipos Médicos",
    "subcategory": "Equipos de Rehabilitación",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 51,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_d76d16cb-377f-4643-808b-5ff0cc14b8b2",
    "name": "Electroestimulador, TENS EMS 4 CANALES, ALEMAN EM80",
    "descriptionHtml": "",
    "plainText": "",
    "wixCategories": [
      "salud-y-bienestar"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 3334.24,
    "inventory": "IN_STOCK",
    "sku": "EM80",
    "weight": 1,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_e8afea1b0a054d80b6cc15db7da286a8~mv2.jpg"
    ],
    "masterCategory": "Equipos Médicos",
    "subcategory": "Equipos de Rehabilitación",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 58,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_f29311d6-19f0-4d6a-b38a-707130eadfbe",
    "name": "Almohadilla eléctrica para espalda y cuello",
    "descriptionHtml": "",
    "plainText": "",
    "wixCategories": [
      "salud-y-bienestar"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 1804.4,
    "inventory": "IN_STOCK",
    "sku": "HK58",
    "weight": 3,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_2328fe7ec6f744199570878d7b3c4868~mv2.jpg"
    ],
    "masterCategory": "Equipos Médicos",
    "subcategory": "Equipos de Rehabilitación",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 17,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_355a4dc1-59a8-4a53-bcae-e40c27feaf05",
    "name": "Tamiz Auditivo Portatil, Automatico, Madsen Alpha",
    "descriptionHtml": "",
    "plainText": "",
    "wixCategories": [
      "salud-y-bienestar"
    ],
    "ribbon": "Sobre Pedido",
    "brand": "ARXEM",
    "basePrice": 113472.32,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 4,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_843debb647d940f792b6878ee0aaa092~mv2.png"
    ],
    "masterCategory": "Equipos Médicos",
    "subcategory": "Equipos de Diagnóstico",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios"
    ],
    "leadEquivalency": "",
    "saleMode": "quote",
    "rating": 4.9,
    "reviewCount": 24,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_bb8bc4dd-3f14-4650-804d-aff36ba146df",
    "name": "Estuche de laringoscopio 6 hojas macintosh/miller mod. Combime",
    "descriptionHtml": "",
    "plainText": "",
    "wixCategories": [
      "equipo-médico-diferentes-especialidades"
    ],
    "ribbon": "Sujeto a Existencia",
    "brand": "ARXEM",
    "basePrice": 2856.88,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 3,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_1d38b2fdd1ec41cc96f7be9e3dbecf3c~mv2.jpg"
    ],
    "masterCategory": "Equipos Médicos",
    "subcategory": "Equipos de Diagnóstico",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 31,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_0cb2d418-21df-4e37-9dda-ea6a4f4496aa",
    "name": "Colposcopio con Brazo Pantográfico de Led",
    "descriptionHtml": "",
    "plainText": "",
    "wixCategories": [
      "equipo-médico-diferentes-especialidades"
    ],
    "ribbon": "Sujeto a Existencia",
    "brand": "ARXEM",
    "basePrice": 83928,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 15,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_d9c6f0d54f6e4029ba3e1fcbfade4e17~mv2.jpg",
      "https://static.wixstatic.com/media/56b43b_c2bfc8a46acc440e9d77e778cebc9686~mv2.jpg"
    ],
    "masterCategory": "Equipos Médicos",
    "subcategory": "Equipos de Ginecología",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios"
    ],
    "leadEquivalency": "",
    "saleMode": "quote",
    "rating": 4.8,
    "reviewCount": 38,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_7b3c1ccf-3623-4375-b435-606e9615f041",
    "name": "Densitometro Oseo Dxa, Cuerpo Completo Mca. Osteosys",
    "descriptionHtml": "",
    "plainText": "",
    "wixCategories": [
      "equipo-médico-diferentes-especialidades"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 729435.2,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 100,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_28f4376543134818bd65fd51eafcc49d~mv2.jpg"
    ],
    "masterCategory": "Equipos Médicos",
    "subcategory": "Equipos de Diagnóstico",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios"
    ],
    "leadEquivalency": "",
    "saleMode": "quote",
    "rating": 4.9,
    "reviewCount": 45,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_1d10b4f7-9b46-4689-9295-c8defe561fcf",
    "name": "Vidrio Emplomado importado de Francia",
    "descriptionHtml": "<p>VIDRIO EMPLOMADO 10&nbsp;MM. DE ESPESOR; 2.6&nbsp;DE PROTECCION, IMPORTADO DE&nbsp; FRANCIA</p><p>12\"X12\" (30.48x30.48cms.)&nbsp; &nbsp;VE10F12</p><p>16\"X16\" (40.64x40.64cms.)&nbsp;&nbsp;VE10F16</p><p>20\"X20\" (50.8x50.8cms.) &nbsp; &nbsp; &nbsp; &nbsp;VE10F20</p><p>24\"X24\" (60.96x60.96cms.) &nbsp; VE10F24</p><p>24\"X36\" (60.96.x91.44cms.) &nbsp;VE10F243 &nbsp;&nbsp;</p><p>32\"X40\" (81.28.8x101.60cms.)&nbsp;VE10F32</p><p>36\"X36\" (91.44.8x91.44cms.)&nbsp; &nbsp;VE10F36</p>",
    "plainText": "VIDRIO EMPLOMADO 10 MM. DE ESPESOR; 2.6 DE PROTECCION, IMPORTADO DE FRANCIA 12\"X12\" (30.48x30.48cms.) VE10F12 16\"X16\" (40.64x40.64cms.) VE10F16 20\"X20\" (50.8x50.8cms.) VE10F20 24\"X24\" (60.96x60.96cms.) VE10F24 24\"X36\" (60.96.x91.44cms.) VE10F243 32\"X40\" (81.28.8x101.60cms.) VE10F32 36\"X36\" (91.44.8x91.44cms.) VE10F36",
    "wixCategories": [
      "protección-radiológica"
    ],
    "ribbon": "Bajo Existencia",
    "brand": "ARXEM",
    "basePrice": 8944,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 1,
    "optionName": "Vidrio Emplomado Importado de Francia",
    "optionType": "TEXT_CHOICES",
    "optionChoices": [
      "Vidrio Emplomado 12\"X12\" de 10mm de espesor import",
      "Vidrio Emplomado 16\"X16\" de 10mm de espesor import",
      "Vidrio Emplomado 20\"X20\" de 10mm de espesor import",
      "Vidrio Emplomado 24\"X24\" de 10mm de espesor import",
      "Vidrio Emplomado 24\"X36\" de 10mm de espesor import",
      "Vidrio Emplomado 32\"X40\" de 10mm de espesor import",
      "Vidrio Emplomado 36\"X36\" de 10mm de espesor import"
    ],
    "variants": [
      {
        "id": "Product_1d10b4f7-9b46-4689-9295-c8defe561fcf-1",
        "label": "Vidrio Emplomado 12\"X12\" de 10mm de espesor import",
        "price": 8944,
        "inventory": "IN_STOCK",
        "sku": "VE10F12",
        "weight": 8
      },
      {
        "id": "Product_1d10b4f7-9b46-4689-9295-c8defe561fcf-2",
        "label": "Vidrio Emplomado 16\"X16\" de 10mm de espesor import",
        "price": 15745.6,
        "inventory": "IN_STOCK",
        "sku": "VE10F16",
        "weight": 12
      },
      {
        "id": "Product_1d10b4f7-9b46-4689-9295-c8defe561fcf-3",
        "label": "Vidrio Emplomado 20\"X20\" de 10mm de espesor import",
        "price": 24627.2,
        "inventory": "IN_STOCK",
        "sku": "VE10F20",
        "weight": 15
      },
      {
        "id": "Product_1d10b4f7-9b46-4689-9295-c8defe561fcf-4",
        "label": "Vidrio Emplomado 24\"X24\" de 10mm de espesor import",
        "price": 35526.4,
        "inventory": "IN_STOCK",
        "sku": "VE10F24",
        "weight": 25
      },
      {
        "id": "Product_1d10b4f7-9b46-4689-9295-c8defe561fcf-5",
        "label": "Vidrio Emplomado 24\"X36\" de 10mm de espesor import",
        "price": 55016,
        "inventory": "IN_STOCK",
        "sku": "VE10F243",
        "weight": 32
      },
      {
        "id": "Product_1d10b4f7-9b46-4689-9295-c8defe561fcf-6",
        "label": "Vidrio Emplomado 32\"X40\" de 10mm de espesor import",
        "price": 78808.08,
        "inventory": "IN_STOCK",
        "sku": "VE10F32",
        "weight": 45
      },
      {
        "id": "Product_1d10b4f7-9b46-4689-9295-c8defe561fcf-7",
        "label": "Vidrio Emplomado 36\"X36\" de 10mm de espesor import",
        "price": 79803.36,
        "inventory": "IN_STOCK",
        "sku": "VE10F36",
        "weight": 42
      }
    ],
    "media": [
      "https://static.wixstatic.com/media/56b43b_3ba8d390a05c4efbae3eb60bbcd8917e~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.6 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 52,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_31ab39e4-00b7-49aa-9a49-bb12886db40c",
    "name": "Collarín emplomado Biogenesis de 0.5 mm Pb",
    "descriptionHtml": "<p>Collarin Unitalla</p>",
    "plainText": "Collarin Unitalla",
    "wixCategories": [
      "rayos-x",
      "protector-radiologia",
      "hot-sale"
    ],
    "ribbon": "",
    "brand": "BIOGENESIS",
    "basePrice": 1660,
    "inventory": "IN_STOCK",
    "sku": "CEB05",
    "weight": 0.5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_d585150307b443b99ac0fa761185c398~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Collarines de Tiroides",
    "storePillar": "catalogo-general",
    "sectors": [
      "dentistas",
      "clinicas",
      "veterinarias"
    ],
    "leadEquivalency": "0.5 mm Pb",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 59,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_11a4fb21-87ff-4118-826c-992417856edb",
    "name": "Vidrio Emplomado 36\"X72\" de 12mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 36\"X72\" (91.44.8x182.88cms.) de 12mm DE ESPESOR, (2.5-2.90) PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 36\"X72\" (91.44.8x182.88cms.) de 12mm DE ESPESOR, (2.5-2.90) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 123198.19,
    "inventory": "IN_STOCK",
    "sku": "VE12C367",
    "weight": 135,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.5 - 2.9 mm Pb (12mm espesor)",
    "saleMode": "quote",
    "rating": 4.9,
    "reviewCount": 18,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_6dab3fc6-6b09-46cf-9b1f-0a352886cdfc",
    "name": "Vidrio Emplomado 36\"X48\" de 12mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 36\"X48\" (91.44.8x121.92cms.) de 12mm DE ESPESOR, (2.5-2.90) PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 36\"X48\" (91.44.8x121.92cms.) de 12mm DE ESPESOR, (2.5-2.90) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 71448,
    "inventory": "IN_STOCK",
    "sku": "VE12C364",
    "weight": 75,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.5 - 2.9 mm Pb (12mm espesor)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 25,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_ef595b60-ffe7-4606-9edb-a9291990ecf4",
    "name": "Vidrio Emplomado 36\"X48\" de 10mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 36\"X48\" (91.44.8x121.92cms.) de 10mm DE ESPESOR, (2-2.40) PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 36\"X48\" (91.44.8x121.92cms.) de 10mm DE ESPESOR, (2-2.40) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 64334.4,
    "inventory": "IN_STOCK",
    "sku": "VE10C364",
    "weight": 65,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.0 - 2.4 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 32,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_bfcf9843-e663-4a9a-8a8d-dbb77ca54643",
    "name": "Vidrio Emplomado 36\"X36\" de 12mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 36\"X36\" (91.44.8x91.44cms.) de 12mm DE ESPESOR, (2.5-2.90) PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 36\"X36\" (91.44.8x91.44cms.) de 12mm DE ESPESOR, (2.5-2.90) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 53643.2,
    "inventory": "IN_STOCK",
    "sku": "VE12C36",
    "weight": 60,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.5 - 2.9 mm Pb (12mm espesor)",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 39,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_93124e5c-63d8-4f50-b6f1-cc30ad9b8b81",
    "name": "Vidrio Emplomado 36\"X36\" de 10mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 36\"X36\" (91.44.8x91.44cms.) de 10mm DE ESPESOR, (2-2.40) PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 36\"X36\" (91.44.8x91.44cms.) de 10mm DE ESPESOR, (2-2.40) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 48505.6,
    "inventory": "IN_STOCK",
    "sku": "VE10C36.1",
    "weight": 42,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.0 - 2.4 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 46,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_df558835-1a8d-403b-a5ad-d7e317a4f630",
    "name": "Vidrio Emplomado 36\"X36\" de 8mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 36\"X36\" (91.44.8x91.44cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 36\"X36\" (91.44.8x91.44cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 44200,
    "inventory": "IN_STOCK",
    "sku": "VE8C36",
    "weight": 39,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "1.7 - 1.92 mm Pb (8mm espesor)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 53,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_7824790f-4a0d-4609-b51c-1baf2e7dc503",
    "name": "Vidrio Emplomado 24\"X36\" de 8mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 24\"X36\" (60.96.x91.44cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 24\"X36\" (60.96.x91.44cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 29057.6,
    "inventory": "IN_STOCK",
    "sku": "VE8C24",
    "weight": 30,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "1.7 - 1.92 mm Pb (8mm espesor)",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 60,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_45433f55-4f20-4a78-ad76-49232b0c157a",
    "name": "Vidrio Emplomado 18\"X24\" de 8mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 18\"X24\" (45.72x60.96cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 18\"X24\" (45.72x60.96cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 15350.4,
    "inventory": "IN_STOCK",
    "sku": "VE8C18",
    "weight": 14,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "1.7 - 1.92 mm Pb (8mm espesor)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 19,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_6eac4b13-edff-4152-88f2-7b451ec9eb9a",
    "name": "Vidrio Emplomado 14\"X18\" de 8mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 14\"X18\" (35.56x45.72cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 14\"X18\" (35.56x45.72cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 9027.2,
    "inventory": "IN_STOCK",
    "sku": "VE8C148",
    "weight": 9,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "1.7 - 1.92 mm Pb (8mm espesor)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 26,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_6322124c-0df3-4ae7-b9ef-72d7e542163c",
    "name": "Vidrio Emplomado 14\"X14\" de 8mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 14\"X14\" (35.56x35.56cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 14\"X14\" (35.56x35.56cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 7280,
    "inventory": "IN_STOCK",
    "sku": "VE8C14",
    "weight": 8,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "1.7 - 1.92 mm Pb (8mm espesor)",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 33,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_b355e1f0-866a-4593-aca0-f83485b23d08",
    "name": "Vidrio Emplomado 12\"X16\" de 8mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 12\"X16\" (30.48x40.64cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 12\"X16\" (30.48x40.64cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 7155.2,
    "inventory": "IN_STOCK",
    "sku": "VE8C12",
    "weight": 7,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "1.7 - 1.92 mm Pb (8mm espesor)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 40,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_97945bac-4378-4963-a01a-8bc53436fd81",
    "name": "Vidrio Emplomado 10\"X12\" de 8mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 10\"X12\" (25.40x30.48cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 10\"X12\" (25.40x30.48cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 4659.2,
    "inventory": "IN_STOCK",
    "sku": "VE8C10",
    "weight": 5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "1.7 - 1.92 mm Pb (8mm espesor)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 47,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_fcc3b6c3-d3e2-47ba-91e7-18e0a4a8956f",
    "name": "Concentrado de Oxigeno de 5Lts, Grado Medico con Ruedas OLV-10",
    "descriptionHtml": "<p>Concentrador de Oxigeno de 10Lts<br>El concentrador de oxígeno OLV-10 provee de la combinación perfecta de Lujo y concentración de oxígeno para encontrar la solución más simple a la necesidad de la aplicación de oxigenoterapia en el hogar, adecuado para cualquier miembro de la familia.<br>Características destacadas:<br>•\tConcentrador de oxígeno grado médico para uso doméstico con capacidad de 10 L/min<br>•\tGran pantalla LCD de las horas de trabajo totales y el tiempo de trabajo actual<br>•\tFunción de temporización (10 min - 480 min)<br>•\tCortador de corriente reiniciable<br>•\tEl sistema espacio de aire de 5 etapas (filtro HEPA y filtro de bacterias) mantienen alejadas la mayoría de las impurezas, bacterias y PM 2.5.<br>•\tEl compresor sin aceite súper silencioso garantiza un 30% más de vida útil<br>•\tLarga vida útil, adecuada para un funcionamiento las 24 horas sin parar<br>•\tUltra silencioso, &lt;50dB<br>Características Técnicas:<br>•\tTasa de flujo: 0-10 L/min<br>•\tPureza de oxígeno 93% ± 3%<br>•\tConsumo de energía: 550 W<br>•\tPresión de salida: 20 Kpa 60 Kpa<br>•\tNivel de ruido menor a 50 dB<br>•\tPeso Neto: 20 Kg<br>•\tDimensiones: 344 x 306 x 565 (mm)<br>•\t110V 15V, 60Hz ± 1Hz</p>",
    "plainText": "Concentrador de Oxigeno de 10Lts El concentrador de oxígeno OLV-10 provee de la combinación perfecta de Lujo y concentración de oxígeno para encontrar la solución más simple a la necesidad de la aplicación de oxigenoterapia en el hogar, adecuado para cualquier miembro de la familia. Características destacadas: • Concentrador de oxígeno grado médico para uso doméstico con capacidad de 10 L/min • Gran pantalla LCD de las horas de trabajo totales y el tiempo de trabajo actual • Función de temporización (10 min - 480 min) • Cortador de corriente reiniciable • El sistema espacio de aire de 5 etapas (filtro HEPA y filtro de bacterias) mantienen alejadas la mayoría de las impurezas, bacterias y PM 2.5. • El compresor sin aceite súper silencioso garantiza un 30% más de vida útil • Larga vida útil, adecuada para un funcionamiento las 24 horas sin parar • Ultra silencioso, &lt;50dB Características Técnicas: • Tasa de flujo: 0-10 L/min • Pureza de oxígeno 93% ± 3% • Consumo de energía: 550 W • Presión de salida: 20 Kpa 60 Kpa • Nivel de ruido menor a 50 dB • Peso Neto: 20 Kg • Dimensiones: 344 x 306 x 565 (mm) • 110V 15V, 60Hz ± 1Hz",
    "wixCategories": [],
    "ribbon": "",
    "brand": "HANDY",
    "basePrice": 31215.6,
    "inventory": "IN_STOCK",
    "sku": "CO-OLV10",
    "weight": 20,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_998a3dc7c360413f9a9cd8e208bc1bd9~mv2.png",
      "https://static.wixstatic.com/media/45119e_ae36a8d7220545db8052f2d55f57b65a~mv2.png",
      "https://static.wixstatic.com/media/45119e_aff519b92aff4de5af3903ba3daeb9d1~mv2.webp",
      "https://static.wixstatic.com/media/45119e_ebf1e34796fc4198baae666f54331164~mv2.webp",
      "https://static.wixstatic.com/media/45119e_f93f078a9ce94dfda4ac1bc6aaca65d1~mv2.jpg",
      "https://static.wixstatic.com/media/45119e_f6bb21ca72d141cda218e8dc276ad766~mv2.webp"
    ],
    "masterCategory": "Equipos Médicos",
    "subcategory": "Equipos de Oxigenoterapia",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 54,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_ff66c402-2b18-429a-85a3-3082b0575104",
    "name": "Concentrado de Oxigeno y Nebulizador de 5Lts, Grado Medico con Ruedas OLV-8F",
    "descriptionHtml": "<p>CONCENTRADOR DE OXÍGENO, OLV8F<br>Descripción:<br>El concentrador de oxígeno estacionario OLV8F proporciona un alto rendimiento con un diseño avanzado. Es fácil de usar de cara al paciente y debido a su avanzada tecnología que integran en un solo equipo las funciones de concentración de oxígeno y nebulizador.<br>Características:<br>• Concentrador de oxígeno y nebulizador, 2 en 1.<br>• Equipo silencioso, compacto y fácil de operar.<br>• Cuenta con una función de timer de apagado automático.<br>• Puede operarse con control remoto para un fácil acceso.<br>• Cuenta con alarma contra fallas de presión, sobrecalentamiento de compresor y por baja concentración de oxígeno.<br>• La válvula de alivio de presión del compresor ayuda al dispositivo a estar más seguro<br>Especificaciones Técnicas:<br>•\tFlujo de oxígeno: 0.5 ~ 5L /min. Potencia de entrada: 400 VA.<br>•\tConcentración de oxígeno: 95.5% ~ 87%. Presión de salida: 40 ~ 70kPa.<br>•\tRuido de operación: ≤48dB. Peso: 15.5 kg.<br>•\tDimensión: 50 cm x W 39 cm x D 24.5 cm<br>*Los accesorios pueden variar, sin previo aviso.”</p>",
    "plainText": "CONCENTRADOR DE OXÍGENO, OLV8F Descripción: El concentrador de oxígeno estacionario OLV8F proporciona un alto rendimiento con un diseño avanzado. Es fácil de usar de cara al paciente y debido a su avanzada tecnología que integran en un solo equipo las funciones de concentración de oxígeno y nebulizador. Características: • Concentrador de oxígeno y nebulizador, 2 en 1. • Equipo silencioso, compacto y fácil de operar. • Cuenta con una función de timer de apagado automático. • Puede operarse con control remoto para un fácil acceso. • Cuenta con alarma contra fallas de presión, sobrecalentamiento de compresor y por baja concentración de oxígeno. • La válvula de alivio de presión del compresor ayuda al dispositivo a estar más seguro Especificaciones Técnicas: • Flujo de oxígeno: 0.5 ~ 5L /min. Potencia de entrada: 400 VA. • Concentración de oxígeno: 95.5% ~ 87%. Presión de salida: 40 ~ 70kPa. • Ruido de operación: ≤48dB. Peso: 15.5 kg. • Dimensión: 50 cm x W 39 cm x D 24.5 cm *Los accesorios pueden variar, sin previo aviso.”",
    "wixCategories": [],
    "ribbon": "",
    "brand": "HANDY",
    "basePrice": 13860.08,
    "inventory": "IN_STOCK",
    "sku": "CO-OLV8F",
    "weight": 16,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_e2ad40e6a1314680b4d59cddab6376cb~mv2.webp",
      "https://static.wixstatic.com/media/45119e_28332cee80ac4219b42fd38e8f356005~mv2.webp",
      "https://static.wixstatic.com/media/45119e_3e0c540d75b347da9f422c16c26059e0~mv2.webp",
      "https://static.wixstatic.com/media/45119e_b549984d94d64954939c38279f7bf00f~mv2.webp",
      "https://static.wixstatic.com/media/45119e_917ff5d53ff94e79b2c4f3b7a00b3e95~mv2.webp",
      "https://static.wixstatic.com/media/45119e_8e3e799fa4194307af96e09acf59a551~mv2.webp"
    ],
    "masterCategory": "Equipos Médicos",
    "subcategory": "Equipos de Oxigenoterapia",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 61,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_4d425d7b-4725-4b36-9fe1-ac329bede520",
    "name": "Concentrado de Oxigeno Estacionario de 5Lts, Grado Medico con Ruedas OLV-5",
    "descriptionHtml": "<p>Concentrado de Oxigeno Estacionario<br>El concentrador de oxígeno OLV-5 provee de la combinación perfecta de flujo y concentración de oxígeno para encontrar la solución más simple a la necesidad de la aplicación de oxigenoterapia en el hogar, adecuado para cualquier miembro de la familia.<br>Descripción<br>El Concentrador de oxígeno OLV-5 Olive utiliza el aire como materia prima y separa directamente el oxígeno del nitrógeno a temperatura normal, lo cual produce oxígeno de alta pureza.<br>También es adecuado para personas de mediana edad y Tercera edad, personas con mal estado físico, mujeres embarazadas y otras personas que puedan sufrir diferentes grados de Hipoxia fisiológica.<br>Además, ayuda a eliminar la fatiga y restaurar la función somática después de un pesado esfuerzo físico o mental.<br>Características destacadas:<br>•\tTamiz molecular CECA importado de Francia<br>•\tAlta pureza de oxígeno 93% ±3% Vida útil 2 10,000 horas<br>•\tApto para 24 horas de trabajo continuo Ligero a 5,4 kg<br>•\tBajo nivel de ruido, menos de 45db<br>•\tCE ISO aprobado<br>•\tMarca: HANDY<br>Características Técnicas:<br>•\tOxigeno de pureza: 293% ±3 (V/V) Voltaje AC110V± 15V, 60Hz ± 1Hz<br>•\tPresión de salida: 20kPa -60kPa Velocidad de flujo: 0-5 L/min .Peso neto: 22kg<br>•\tNivel de sonido: menos de 45db Consumo de energía: 300 vatios<br>•\t-Dimensión: 490 x 270 x 560 (mm)<br>Incluye:<br>•\tConcentrador OLV-5<br>•\tManual de usuario<br>•\t-Kit para puesta en marcha<br>•\tVaso humidificador Puntas nasales<br>•\t•Filtro de polvo<br>\"Los accesorios pueden variar sin previo aviso”</p>",
    "plainText": "Concentrado de Oxigeno Estacionario El concentrador de oxígeno OLV-5 provee de la combinación perfecta de flujo y concentración de oxígeno para encontrar la solución más simple a la necesidad de la aplicación de oxigenoterapia en el hogar, adecuado para cualquier miembro de la familia. Descripción El Concentrador de oxígeno OLV-5 Olive utiliza el aire como materia prima y separa directamente el oxígeno del nitrógeno a temperatura normal, lo cual produce oxígeno de alta pureza. También es adecuado para personas de mediana edad y Tercera edad, personas con mal estado físico, mujeres embarazadas y otras personas que puedan sufrir diferentes grados de Hipoxia fisiológica. Además, ayuda a eliminar la fatiga y restaurar la función somática después de un pesado esfuerzo físico o mental. Características destacadas: • Tamiz molecular CECA importado de Francia • Alta pureza de oxígeno 93% ±3% Vida útil 2 10,000 horas • Apto para 24 horas de trabajo continuo Ligero a 5,4 kg • Bajo nivel de ruido, menos de 45db • CE ISO aprobado • Marca: HANDY Características Técnicas: • Oxigeno de pureza: 293% ±3 (V/V) Voltaje AC110V± 15V, 60Hz ± 1Hz • Presión de salida: 20kPa -60kPa Velocidad de flujo: 0-5 L/min .Peso neto: 22kg • Nivel de sonido: menos de 45db Consumo de energía: 300 vatios • -Dimensión: 490 x 270 x 560 (mm) Incluye: • Concentrador OLV-5 • Manual de usuario • -Kit para puesta en marcha • Vaso humidificador Puntas nasales • •Filtro de polvo \"Los accesorios pueden variar sin previo aviso”",
    "wixCategories": [],
    "ribbon": "",
    "brand": "HANDY",
    "basePrice": 74443.2,
    "inventory": "IN_STOCK",
    "sku": "CO-OLV5",
    "weight": 22,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_4627b903eace4682a43ff5a021e7215a~mv2.png",
      "https://static.wixstatic.com/media/45119e_9a256a7c7efb4db49dcb2cbd49231b61~mv2.webp",
      "https://static.wixstatic.com/media/45119e_2008b916be174e95a0af57dff4aa30bf~mv2.webp",
      "https://static.wixstatic.com/media/45119e_bd52e7be65a14f1e8ee3818bf6aad722~mv2.webp"
    ],
    "masterCategory": "Equipos Médicos",
    "subcategory": "Equipos de Oxigenoterapia",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 20,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_41e1d745-5d95-4d91-a646-1593a8d7721f",
    "name": "Vidrio Emplomado 1.10x1.20m de 8mm de espesor importado de Alemania",
    "descriptionHtml": "<p>Vidrio Emplomado 1.10 x 1.20M. CON 8 MM. ;2.1 PROTECCION importado de Alemania <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 1.10 x 1.20M. CON 8 MM. ;2.1 PROTECCION importado de Alemania El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 137841.6,
    "inventory": "IN_STOCK",
    "sku": "VE8A1.10",
    "weight": 65,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.1 mm Pb (8mm espesor)",
    "saleMode": "quote",
    "rating": 4.9,
    "reviewCount": 27,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_d7a9dd49-87bd-4e3a-9481-f01432a8a02e",
    "name": "Vidrio Emplomado .60x1.10m de 8mm de espesor importado de Alemania",
    "descriptionHtml": "<p>Vidrio Emplomado .60 x 1.10M. CON 8 MM. ;2.1 PROTECCION importado de Alemania <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado .60 x 1.10M. CON 8 MM. ;2.1 PROTECCION importado de Alemania El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 74443.2,
    "inventory": "IN_STOCK",
    "sku": "VE8A.60",
    "weight": 50,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.1 mm Pb (8mm espesor)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 34,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_058f924d-e3b5-4925-9e81-10a33d8d2b0f",
    "name": "Vidrio Emplomado 24\"x24\" de 10mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 24\"X24\" (60.96x60.96cms.)  de 10mm DE ESPESOR,2.3 PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 24\"X24\" (60.96x60.96cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 32512.68,
    "inventory": "IN_STOCK",
    "sku": "VE10C24",
    "weight": 25,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.0 - 2.4 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 41,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_35553bda-fd23-422c-9328-6f33701f9a3d",
    "name": "Vidrio Emplomado 42\"x60\" de 10mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 42\"X60\" (106.68.8x152.40cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 42\"X60\" (106.68.8x152.40cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 131497.6,
    "inventory": "IN_STOCK",
    "sku": "VE10C42",
    "weight": 1,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.0 - 2.4 mm Pb (10mm espesor)",
    "saleMode": "quote",
    "rating": 4.9,
    "reviewCount": 48,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_88aff20f-a2e0-4f62-b096-22dcab0d44b0",
    "name": "Vidrio Emplomado 36\"x36\" de 10mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 36\"X36\" (91.44.8x91.44cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 36\"X36\" (91.44.8x91.44cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 66774.24,
    "inventory": "IN_STOCK",
    "sku": "VE10C36",
    "weight": 42,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.0 - 2.4 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 55,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_7755abab-ba79-4c71-a7a0-9c8e1584eaf5",
    "name": "Vidrio Emplomado 32\"x40\" de 10mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 32\"X40\" (81.28.8x101.60cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 32\"X40\" (81.28.8x101.60cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 65899.6,
    "inventory": "IN_STOCK",
    "sku": "VE10C324",
    "weight": 45,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.0 - 2.4 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 14,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_dc4d5f18-c577-4531-8f8c-73eab1b70662",
    "name": "Vidrio Emplomado 24\"x36\" de 10mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 24\"X36\" (60.96.x91.44cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 24\"X36\" (60.96.x91.44cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 44697.12,
    "inventory": "IN_STOCK",
    "sku": "VE10C243",
    "weight": 32,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.0 - 2.4 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 21,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_df3aaaaf-6f95-4485-87e1-0c08461bc25a",
    "name": "Vidrio Emplomado 20\"x20\" de 10mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 20\"X20\" (50.8x50.8cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 20\"X20\" (50.8x50.8cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 20633.6,
    "inventory": "IN_STOCK",
    "sku": "VE10C20",
    "weight": 15,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.0 - 2.4 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 28,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_cb45f1eb-809a-4146-92af-d2fb4c272406",
    "name": "Vidrio Emplomado 16\"x20\" de 10mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 16\"X20\" (40.64x50.80cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 16\"X20\" (40.64x50.80cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 16536,
    "inventory": "IN_STOCK",
    "sku": "VE10C162",
    "weight": 12,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.0 - 2.4 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 35,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_48ff9eed-c851-4473-8d15-af28dcdf53c7",
    "name": "Vidrio Emplomado 16\"x16\" de 10mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 16\"X16\" (40.64x40.64cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 16\"X16\" (40.64x40.64cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 13166.4,
    "inventory": "IN_STOCK",
    "sku": "VE10C16",
    "weight": 12,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.0 - 2.4 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 42,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_04203bf9-ea22-49ae-a205-a816efe21da8",
    "name": "Vidrio Emplomado 12\"x12\" de 10mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 12\"X12\" (25.40x30.48cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 12\"X12\" (25.40x30.48cms.) de 10mm DE ESPESOR,2.3 PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 7508.8,
    "inventory": "IN_STOCK",
    "sku": "VE10C12",
    "weight": 8,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.0 - 2.4 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 49,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_c450530a-4ddf-475f-a447-3a1b3c975e99",
    "name": "Vidrio Emplomado 36\"x36\" de 10mm de espesor importado de Francia",
    "descriptionHtml": "<p>Vidrio Emplomado 36\"X36\" (91.44.8x91.44cms.) de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 36\"X36\" (91.44.8x91.44cms.) de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 79803.36,
    "inventory": "IN_STOCK",
    "sku": "VE10F36",
    "weight": 42,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.6 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 56,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_7787c8f2-0191-41a4-9a4b-5e645de680ce",
    "name": "Vidrio Emplomado 32\"x40\" de 10mm de espesor importado de Francia",
    "descriptionHtml": "<p>Vidrio Emplomado 32\"X40\" (81.28.8x101.60cms.)  de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 32\"X40\" (81.28.8x101.60cms.) de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 78808.08,
    "inventory": "IN_STOCK",
    "sku": "VE10F32",
    "weight": 45,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.6 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 15,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_8955a5b2-f487-414f-9270-6e1aa033a9de",
    "name": "Vidrio Emplomado 24\"x36\" de 10mm de espesor importado de Francia",
    "descriptionHtml": "<p>Vidrio Emplomado 24\"X36\" (60.96.x91.44cms.) de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 24\"X36\" (60.96.x91.44cms.) de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 55016,
    "inventory": "IN_STOCK",
    "sku": "VE10F243",
    "weight": 32,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.6 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 22,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_40a3ca53-8ecc-4e0d-95a1-6ac0155ebea0",
    "name": "Vidrio Emplomado 24\"x24\" de 10mm de espesor importado de Francia",
    "descriptionHtml": "<p>Vidrio Emplomado 24\"X24\" (60.96x60.96cms.) de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 24\"X24\" (60.96x60.96cms.) de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [
      "vidrio-emplomado"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 35526.4,
    "inventory": "IN_STOCK",
    "sku": "VE10F24",
    "weight": 25,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.6 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 29,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_d69a15bc-2ff1-454f-8d2c-4ba50e4885d3",
    "name": "Vidrio Emplomado 20\"x20\" de 10mm de espesor importado de Francia",
    "descriptionHtml": "<p>Vidrio Emplomado 20\"x20\" (50.8x50.8cms.)  de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 20\"x20\" (50.8x50.8cms.) de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 24627.2,
    "inventory": "IN_STOCK",
    "sku": "VE10F20",
    "weight": 15,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.6 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 36,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_2b78d558-6751-4d65-8a3f-55591c587806",
    "name": "Vidrio Emplomado 16\"x16\" de 10mm de espesor importado de Francia",
    "descriptionHtml": "<p>Vidrio Emplomado 16\"x16\" (40.64x40.64cms.) de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 16\"x16\" (40.64x40.64cms.) de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 15745.6,
    "inventory": "IN_STOCK",
    "sku": "VE10F16",
    "weight": 12,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.6 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 43,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_02956613-ec65-4eae-8a42-b7f35ab4ac3c",
    "name": "Vidrio Emplomado 12\"x12\" de 10mm de espesor importado de Francia",
    "descriptionHtml": "<p>Vidrio Emplomado 12\"x12\" (30.48x30.48cms.)  de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia <br>El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 12\"x12\" (30.48x30.48cms.) de 10mm DE ESPESOR,2.6 PROTECCION importado de Francia El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 8944,
    "inventory": "IN_STOCK",
    "sku": "VE10F12",
    "weight": 8,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "2.6 mm Pb (10mm espesor)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 50,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_6f9a6fbc-09cf-44bd-a95f-29e713a028b6",
    "name": "Colgador de Pared para 5 ganchos en Acero Inoxidable",
    "descriptionHtml": "<p>Colgador de pared para 5 ganchos en acero inoxidable 304, Base porta gancho fabricado con lamina de acero cal 18, con sistema para fijación de colgadores, con perforaciones para fijación a pared Colgadores fabricados con barra maciza de acero inoxidable de Ø 9.5 mm, movimiento giratorio 90 grados izquierda o derecha sobre su eje, MEDIDAS APROX.  16.5 CMS. ALTO X 50 CMS. DE ANCHO X 49 CMS. DE LARGO. MANUF. NAL.</p>",
    "plainText": "Colgador de pared para 5 ganchos en acero inoxidable 304, Base porta gancho fabricado con lamina de acero cal 18, con sistema para fijación de colgadores, con perforaciones para fijación a pared Colgadores fabricados con barra maciza de acero inoxidable de Ø 9.5 mm, movimiento giratorio 90 grados izquierda o derecha sobre su eje, MEDIDAS APROX. 16.5 CMS. ALTO X 50 CMS. DE ANCHO X 49 CMS. DE LARGO. MANUF. NAL.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 4448.08,
    "inventory": "IN_STOCK",
    "sku": "CPP5",
    "weight": 6,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_d4719138a73f47e7adeca0da245394b8~mv2.png"
    ],
    "masterCategory": "Accesorios de Protección",
    "subcategory": "Colgadores para Mandiles",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "Acero Inoxidable 304",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 57,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_a2487132-53dc-4b3b-8fc0-fcebbeae0960",
    "name": "Colgador Móvil de 10 ganchos de Acero Inoxidable para mandil emplomado",
    "descriptionHtml": "<p>Colgador móvil de 10 ganchos para mandiles emplomados, en acero inoxidable, estructura fabricada en acero inoxidable 201, base porta gancho, acero inoxidable 430, ganchos fabricados acero inoxidable 304, con sistema de fijación, movimientos de los ganchos giro 90°. rodajas de hule termoplástico color gris de ø50 mm. medidas aproximadas: 145 cm de alto x 50 cm de ancho, 57 cm de largo, 15.50 kgs  MANUF. NACIONAL</p>",
    "plainText": "Colgador móvil de 10 ganchos para mandiles emplomados, en acero inoxidable, estructura fabricada en acero inoxidable 201, base porta gancho, acero inoxidable 430, ganchos fabricados acero inoxidable 304, con sistema de fijación, movimientos de los ganchos giro 90°. rodajas de hule termoplástico color gris de ø50 mm. medidas aproximadas: 145 cm de alto x 50 cm de ancho, 57 cm de largo, 15.50 kgs MANUF. NACIONAL",
    "wixCategories": [
      "colgador-para-ganchos"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 10124.4,
    "inventory": "IN_STOCK",
    "sku": "CMG10",
    "weight": 16,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_49f9658adb55414d8b106914296dc158~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Mandiles Emplomados",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "0.5 mm Pb frontal",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 16,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_d4356762-3222-4deb-b0d5-8bd14015c952",
    "name": "Kit de revelación y fijador Reforzado Manual para 19Lts",
    "descriptionHtml": "<p>Kit Revelador y fijador para preparar 19Lts, PARA PROCESO MANUAL, Marca: NORKIM</p>",
    "plainText": "Kit Revelador y fijador para preparar 19Lts, PARA PROCESO MANUAL, Marca: NORKIM",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Norkim",
    "basePrice": 1640.08,
    "inventory": "IN_STOCK",
    "sku": "KRVM19",
    "weight": 5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_b2dffd01235f4d9481f43535787afced~mv2.webp"
    ],
    "masterCategory": "Rayos X y Radiología",
    "subcategory": "Reveladores y Fijadores",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 23,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_5128cd00-a46e-47bc-9fad-8de5fd8dba3a",
    "name": "Kit de revelación y fijador Reforzado Normat para 38Lts",
    "descriptionHtml": "<p>Kit Revelador y fijador para preparar 38 Lts, PARA PROCESO MANUAL, Marca: NORKIM</p>",
    "plainText": "Kit Revelador y fijador para preparar 38 Lts, PARA PROCESO MANUAL, Marca: NORKIM",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Norkim",
    "basePrice": 3098.16,
    "inventory": "IN_STOCK",
    "sku": "KRVR38",
    "weight": 12,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_d79179bfc64c4cf9ac015d03ac4aced6~mv2.png"
    ],
    "masterCategory": "Rayos X y Radiología",
    "subcategory": "Reveladores y Fijadores",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "laboratorios",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 30,
    "normCompliance": "ISO 13485 / Grado Médico"
  },
  {
    "id": "Product_7c435ae1-4c42-4b9f-ae26-92b15f0dcf0e",
    "name": "Lamina de Plomo para Blindaje de 1.10x2.10mts en 2mm",
    "descriptionHtml": "<p>Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción<br>Medida: 1.10x2.10mts en 2mm de espesor</p>",
    "plainText": "Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción Medida: 1.10x2.10mts en 2mm de espesor",
    "wixCategories": [
      "lamina-de-plomo"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 6504.16,
    "inventory": "IN_STOCK",
    "sku": "LPE11210",
    "weight": 56,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_1bebd625a36c4d0da43096ac9567df13~mv2.png",
      "https://static.wixstatic.com/media/45119e_b64638df91c14a8f9cfd817d529b6aaf~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Láminas de Plomo",
    "storePillar": "blindaje",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "2.0 mm Pb (Pureza 99.9%)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 37,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_7b81c6eb-85f4-48dd-8e76-0532606714f9",
    "name": "Lamina de Plomo para Blindaje de 1x2.10mts en 2mm",
    "descriptionHtml": "<p>Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción<br>Medida: 1x2.10mts en 2mm de espesor</p>",
    "plainText": "Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción Medida: 1x2.10mts en 2mm de espesor",
    "wixCategories": [
      "lamina-de-plomo"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 5938.4,
    "inventory": "IN_STOCK",
    "sku": "LPE12102",
    "weight": 51,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_1bebd625a36c4d0da43096ac9567df13~mv2.png",
      "https://static.wixstatic.com/media/45119e_b64638df91c14a8f9cfd817d529b6aaf~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Láminas de Plomo",
    "storePillar": "blindaje",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "2.0 mm Pb (Pureza 99.9%)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 44,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_eca46483-cd28-4489-87e1-b3e4ec35641f",
    "name": "Lamina de Plomo para Blindaje de 1x2mts en 2mm",
    "descriptionHtml": "<p>Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción<br>Medida: 1x2mts en 2mm de espesor</p>",
    "plainText": "Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción Medida: 1x2mts en 2mm de espesor",
    "wixCategories": [
      "lamina-de-plomo"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 5655.52,
    "inventory": "IN_STOCK",
    "sku": "LPE122",
    "weight": 48,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_1bebd625a36c4d0da43096ac9567df13~mv2.png",
      "https://static.wixstatic.com/media/45119e_b64638df91c14a8f9cfd817d529b6aaf~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Láminas de Plomo",
    "storePillar": "blindaje",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "2.0 mm Pb (Pureza 99.9%)",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 51,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_0a2ec616-fe87-45a0-a5f7-140396e7daff",
    "name": "Lamina de Plomo para Blindaje de 1x1mts en 2mm",
    "descriptionHtml": "<p>Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción<br>Medida: 1x1mts en 2mm de espesor</p>",
    "plainText": "Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción Medida: 1x1mts en 2mm de espesor",
    "wixCategories": [
      "lamina-de-plomo"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 2942.16,
    "inventory": "IN_STOCK",
    "sku": "LPE112",
    "weight": 24,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_1bebd625a36c4d0da43096ac9567df13~mv2.png",
      "https://static.wixstatic.com/media/45119e_b64638df91c14a8f9cfd817d529b6aaf~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Láminas de Plomo",
    "storePillar": "blindaje",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "2.0 mm Pb (Pureza 99.9%)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 58,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_e3ab00a6-3845-4d90-8cdc-8513cd9e0306",
    "name": "Lamina de Plomo para Blindaje de 1x2mts en 1.5mm",
    "descriptionHtml": "<p>Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción<br>Medida: 1x2mts en 1.5mm de espesor</p>",
    "plainText": "Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción Medida: 1x2mts en 1.5mm de espesor",
    "wixCategories": [
      "lamina-de-plomo"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 4298.32,
    "inventory": "IN_STOCK",
    "sku": "LPE125",
    "weight": 36,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_1bebd625a36c4d0da43096ac9567df13~mv2.png",
      "https://static.wixstatic.com/media/45119e_b64638df91c14a8f9cfd817d529b6aaf~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Láminas de Plomo",
    "storePillar": "blindaje",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "1.5 mm Pb (Pureza 99.9%)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 17,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_9d33c17f-34fa-42dd-8236-1fa12947c3d2",
    "name": "Lamina de Plomo para Blindaje de 1x1mts en 1.5mm",
    "descriptionHtml": "<p>Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción<br>Medida: 1x1mts en 1.5mm de espesor</p>",
    "plainText": "Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción Medida: 1x1mts en 1.5mm de espesor",
    "wixCategories": [
      "lamina-de-plomo"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 2316.08,
    "inventory": "IN_STOCK",
    "sku": "LPE11",
    "weight": 18,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_1bebd625a36c4d0da43096ac9567df13~mv2.png",
      "https://static.wixstatic.com/media/45119e_b64638df91c14a8f9cfd817d529b6aaf~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Láminas de Plomo",
    "storePillar": "blindaje",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "1.5 mm Pb (Pureza 99.9%)",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 24,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_953c6d72-57af-4c53-8dfe-9f787175bcb1",
    "name": "Lamina de Plomo para Blindaje de 1x2.10mts en 1mm",
    "descriptionHtml": "<p>Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción<br>Medida: 1x2.10mts en 1mm de espesor</p>",
    "plainText": "Las láminas de plomo fabricadas por cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción Medida: 1x2.10mts en 1mm de espesor",
    "wixCategories": [
      "lamina-de-plomo"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 3076.32,
    "inventory": "IN_STOCK",
    "sku": "LPE1210",
    "weight": 25,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_1bebd625a36c4d0da43096ac9567df13~mv2.png",
      "https://static.wixstatic.com/media/45119e_b64638df91c14a8f9cfd817d529b6aaf~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Láminas de Plomo",
    "storePillar": "blindaje",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "1.0 mm Pb (Pureza 99.9%)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 31,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_f3503a49-b47c-4ca3-9322-ca2ca310e54e",
    "name": "Lamina de Plomo para Blindaje de 1x2mts en 1mm",
    "descriptionHtml": "<p>Las láminas de plomo fabricadas por, cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción<br>Medida: 1x2mts en 1mm de espesor</p>",
    "plainText": "Las láminas de plomo fabricadas por, cubren los requerimientos del mercado en lo que se refiere a la protección y al blindaje radiológico, aislamiento contra la corrosión, barrera sonora, así como diversas protecciones hidrófugas. El plomo es ideal para este tipo de aplicaciones, ya que cuenta con una densidad uniforme, alto nivel de estabilidad y un importante grado de flexibilidad en su aflicción Medida: 1x2mts en 1mm de espesor",
    "wixCategories": [
      "lamina-de-plomo"
    ],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 2942.16,
    "inventory": "IN_STOCK",
    "sku": "LPE12",
    "weight": 24,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_1bebd625a36c4d0da43096ac9567df13~mv2.png",
      "https://static.wixstatic.com/media/45119e_b64638df91c14a8f9cfd817d529b6aaf~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Láminas de Plomo",
    "storePillar": "blindaje",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "1.0 mm Pb (Pureza 99.9%)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 38,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_dcadbd02-a0db-496d-bb3e-945a80f4e634",
    "name": "Guantes emplomados 0.5 mm. Pb Grandes de 39cms",
    "descriptionHtml": "<p>Guante emplomado grande de 0.5mm y 390mm de largo<br>Tamaño Grande.<br>0.5 Mm y 390mm de Largo.<br>Marca: : HEALTH HOME</p>",
    "plainText": "Guante emplomado grande de 0.5mm y 390mm de largo Tamaño Grande. 0.5 Mm y 390mm de Largo. Marca: : HEALTH HOME",
    "wixCategories": [
      "rayos-x",
      "protector-radiologia"
    ],
    "ribbon": "",
    "brand": "HEALTH HOME",
    "basePrice": 2537.6,
    "inventory": "IN_STOCK",
    "sku": "GEG39",
    "weight": 2,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_2fde5581f7a8441cafa189e46063a9f6~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Guantes Emplomados",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "0.5 mm Pb",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 45,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_f8aceaa0-7bb8-4bcd-9ac1-02ce25b8d5b0",
    "name": "Lentes Emplomados de 0.75mm, Pb con Estuche",
    "descriptionHtml": "<p>Lentes sin graduación con protección equivalente a 0.75 mm Pb, para uso adulto<br>Armazón de color: de color: Ámbar<br>Marca: HEALTH HOME<br>Incluyen estuche de guarda y paño de limpieza anti rayaduras.</p>",
    "plainText": "Lentes sin graduación con protección equivalente a 0.75 mm Pb, para uso adulto Armazón de color: de color: Ámbar Marca: HEALTH HOME Incluyen estuche de guarda y paño de limpieza anti rayaduras.",
    "wixCategories": [
      "lentes-emplomados"
    ],
    "ribbon": "",
    "brand": "HEALTH HOME",
    "basePrice": 2555.28,
    "inventory": "IN_STOCK",
    "sku": "LE07",
    "weight": 0.5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_a7f950711a214024bef2af47741e73e4~mv2.png",
      "https://static.wixstatic.com/media/45119e_2a914755d4d74a1f99501e1bf5038219~mv2.png",
      "https://static.wixstatic.com/media/45119e_0b6f1c558ab34357a4c45766a605474d~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Lentes Emplomados",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "0.75 mm Pb",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 52,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_83a0c742-0f70-44e6-8710-ff9d28ad411a",
    "name": "Lentes Emplomados de 0.5mm, Pb con Estuche",
    "descriptionHtml": "<p>Lentes sin graduación con protección equivalente a 0.5 mm de Pb, con cristales de protección lateral, para uso adulto<br>Armazón de color: Ámbar<br>Marca: HEALTH HOME<br>Incluyen estuche de guarda y paño de limpieza anti rayaduras.</p>",
    "plainText": "Lentes sin graduación con protección equivalente a 0.5 mm de Pb, con cristales de protección lateral, para uso adulto Armazón de color: Ámbar Marca: HEALTH HOME Incluyen estuche de guarda y paño de limpieza anti rayaduras.",
    "wixCategories": [
      "lentes-emplomados",
      "lentes"
    ],
    "ribbon": "",
    "brand": "HEALTH HOME",
    "basePrice": 2195.44,
    "inventory": "IN_STOCK",
    "sku": "LE05",
    "weight": 0.5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_a7f950711a214024bef2af47741e73e4~mv2.png",
      "https://static.wixstatic.com/media/45119e_2a914755d4d74a1f99501e1bf5038219~mv2.png",
      "https://static.wixstatic.com/media/45119e_0b6f1c558ab34357a4c45766a605474d~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Lentes Emplomados",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "dentistas",
      "veterinarias"
    ],
    "leadEquivalency": "0.50 mm Pb",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 59,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_44b05011-7568-4e4b-bcd2-164f1042725c",
    "name": "KIT DE MANDIL Y COLLARIN EMPLOMADO DE .5 PROTECCION, COLOR AZUL",
    "descriptionHtml": "<p>KIT DE MANDIL Y COLLARIN EMPLOMADO DE .5 PROTECCION, COLOR AZUL</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><ul><li><p>Collarín emplomado medidas aprox.&nbsp;&nbsp;10 cms.ancho x 10 cms alto x 20 cms de largo.</p></li><li><p>Mandil emplomado mod. E,&nbsp;&nbsp;con bolsillo&nbsp; medidas aprox.&nbsp;&nbsp;69 x 95 cm</p></li></ul><p>Características:<br>Con bolsillo en la parte frontal.<br>Con cierre de velcro en costados<br>0.5 mm de protección.</p><p>&nbsp;</p>",
    "plainText": "KIT DE MANDIL Y COLLARIN EMPLOMADO DE .5 PROTECCION, COLOR AZUL Collarín emplomado medidas aprox. 10 cms.ancho x 10 cms alto x 20 cms de largo. Mandil emplomado mod. E, con bolsillo medidas aprox. 69 x 95 cm Características: Con bolsillo en la parte frontal. Con cierre de velcro en costados 0.5 mm de protección.",
    "wixCategories": [
      "rayos-x",
      "protector-radiologia",
      "hot-sale"
    ],
    "ribbon": "Recien Llegado",
    "brand": "HEALTH HOME",
    "basePrice": 3408,
    "inventory": "IN_STOCK",
    "sku": "KTMECL-2023",
    "weight": 5.5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/56b43b_77cf443e2ad14c2d96f266aec11f3352~mv2.png",
      "https://static.wixstatic.com/media/45119e_0aa4b53af8bc41bf8944ab5a476d7217~mv2.jpg",
      "https://static.wixstatic.com/media/45119e_05398877cc854504b09d62f9e5ec5868~mv2.jpg"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Kits de Protección",
    "storePillar": "catalogo-general",
    "sectors": [
      "dentistas",
      "clinicas",
      "veterinarias"
    ],
    "leadEquivalency": "0.5 mm Pb",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 18,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_52c974b9-f7d2-4aa8-a818-9d17494fd731",
    "name": "Vidrio Emplomado 10\"X10\" de 8mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 10\"X10\" (20.32x25.40cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 10\"X10\" (20.32x25.40cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 4056,
    "inventory": "IN_STOCK",
    "sku": "VE8C101",
    "weight": 5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "1.7 - 1.92 mm Pb (8mm espesor)",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 25,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_fd78aa69-03cd-4028-9391-9d6e50099ba4",
    "name": "Vidrio Emplomado 8\"X10\" de 8mm de espesor importado de China",
    "descriptionHtml": "<p>Vidrio Emplomado 8\"X10\" (20.32x25.40cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.</p>",
    "plainText": "Vidrio Emplomado 8\"X10\" (20.32x25.40cms.) de 8mm DE ESPESOR, (1.7-1.92) PROTECCION importado de China El vidrio emplomado es parte fundamental de los materiales para la construcción de salas de rayos x. El vidrio emplomado se utiliza para salas de rayos x, salas de tomografía, mastografía o hemodinamia con el fin de proveer protección contra rayos x. El vidrio emplomado permite al personal médico tener contacto visual con el paciente mientras se encuentra protegido de la radiación siendo así una excelente opción. El vidrio emplomado tiene la densidad óptima para evitar el paso de la radiación y según el grosor del vidrio es la protección equivalente en plomo que provee.",
    "wixCategories": [],
    "ribbon": "",
    "brand": "Arxem",
    "basePrice": 3452.8,
    "inventory": "IN_STOCK",
    "sku": "VE8C8",
    "weight": 4,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_699dcf64c72f4f7486cf774d46fd5703~mv2.png",
      "https://static.wixstatic.com/media/45119e_217ab7019e9749bab82c3c7ab8d99154~mv2.png",
      "https://static.wixstatic.com/media/45119e_c2525acfc50b44a0818c956558f6822a~mv2.png"
    ],
    "masterCategory": "Blindaje Radiológico",
    "subcategory": "Vidrios Emplomados",
    "storePillar": "vidrios-emplomados",
    "sectors": [
      "constructoras",
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "1.7 - 1.92 mm Pb (8mm espesor)",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 32,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_00334918-3abf-48e9-bde5-b6b8652c724f",
    "name": "Mandil Emplomado,0.5 mm de Plomo, cierre con cintillas acabado en nylon",
    "descriptionHtml": "<p>Mandil emplomado, Mod. E,&nbsp;&nbsp; 0.5 mm de plomo,manuf. U.S.A 61 cm de ancho por 96 cm de largo (24*38” ),cierre con Cintillas(no velcro), acabado en nylon, peso aprox. 4.5-5 kgs..</p><p>&nbsp;</p><p>Colores:<br>Azul rey</p><p>Verde diamante</p>",
    "plainText": "Mandil emplomado, Mod. E, 0.5 mm de plomo,manuf. U.S.A 61 cm de ancho por 96 cm de largo (24*38” ),cierre con Cintillas(no velcro), acabado en nylon, peso aprox. 4.5-5 kgs.. Colores: Azul rey Verde diamante",
    "wixCategories": [
      "rayos-x",
      "protector-radiologia"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 4794,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 1,
    "optionName": "Color",
    "optionType": "SWATCH_CHOICES",
    "optionChoices": [
      "#4A5FDB:Azul Rey",
      "#25CA0D:Verde Diamante"
    ],
    "variants": [
      {
        "id": "Product_00334918-3abf-48e9-bde5-b6b8652c724f-1",
        "label": "Azul Rey",
        "price": 4794,
        "inventory": "IN_STOCK",
        "sku": "ME-Mo-E-A",
        "weight": 5
      },
      {
        "id": "Product_00334918-3abf-48e9-bde5-b6b8652c724f-2",
        "label": "Verde Diamante",
        "price": 4794,
        "inventory": "IN_STOCK",
        "sku": "ME-Mo-E.-V",
        "weight": 5
      }
    ],
    "media": [
      "https://static.wixstatic.com/media/45119e_450429fa9d224ab1bd392b08c79fe60e~mv2.png",
      "https://static.wixstatic.com/media/45119e_bd85f70f660044ecbbb169d9f9650d99~mv2.png",
      "https://static.wixstatic.com/media/45119e_c7b6586141e740449d556e7010885bbe~mv2.png",
      "https://static.wixstatic.com/media/45119e_09aed7bba2784d2a91c0c659e4883065~mv2.png",
      "https://static.wixstatic.com/media/45119e_c0bad0352dee4f33a4ba1db4d8b80920~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Mandiles Emplomados",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "0.5 mm Pb frontal",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 39,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_e008539c-89e6-4e3a-acdf-aab5434b9549",
    "name": "Mandil Emplomado Mod SV, 0.5mm de Plomo, cierre con velcro, acabado en Nylon",
    "descriptionHtml": "<p>Mandil emplomado, Mod. SV,&nbsp;&nbsp; 0.5 mm de plomo,manuf. U.S.A 61 cm de ancho por 96 cm de largo (24”x38” ),cierre con &nbsp;velcro, acabado en nylon, peso aprox. 4.5-5 kgs..</p><p>Color:</p><p>Azul</p><p>Verde diamante</p><p>Morado Diamante&nbsp;</p><p>Plateado</p>",
    "plainText": "Mandil emplomado, Mod. SV, 0.5 mm de plomo,manuf. U.S.A 61 cm de ancho por 96 cm de largo (24”x38” ),cierre con velcro, acabado en nylon, peso aprox. 4.5-5 kgs.. Color: Azul Verde diamante Morado Diamante Plateado",
    "wixCategories": [
      "rayos-x",
      "protector-radiologia"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 5311,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 1,
    "optionName": "Color",
    "optionType": "SWATCH_CHOICES",
    "optionChoices": [
      "#73DCFF:Azul",
      "#25CA0D:Verde Diamante",
      "#7865B4:Morado Diamante",
      "#989595:Plateado"
    ],
    "variants": [
      {
        "id": "Product_e008539c-89e6-4e3a-acdf-aab5434b9549-1",
        "label": "Azul",
        "price": 5311,
        "inventory": "IN_STOCK",
        "sku": "ME-Mo-SV-A",
        "weight": 5
      },
      {
        "id": "Product_e008539c-89e6-4e3a-acdf-aab5434b9549-2",
        "label": "Verde Diamante",
        "price": 5311,
        "inventory": "IN_STOCK",
        "sku": "ME-Mo-SV-V",
        "weight": 5
      },
      {
        "id": "Product_e008539c-89e6-4e3a-acdf-aab5434b9549-3",
        "label": "Morado Diamante",
        "price": 5311,
        "inventory": "IN_STOCK",
        "sku": "ME-Mo-SV-M",
        "weight": 5
      },
      {
        "id": "Product_e008539c-89e6-4e3a-acdf-aab5434b9549-4",
        "label": "Plateado",
        "price": 5311,
        "inventory": "IN_STOCK",
        "sku": "ME-Mo-SV-P",
        "weight": 5
      }
    ],
    "media": [
      "https://static.wixstatic.com/media/45119e_f3ce7d6ffcef4004a81407243b9922ec~mv2.png",
      "https://static.wixstatic.com/media/45119e_ffac304bfef84871bb1cc2e913c863f0~mv2.png",
      "https://static.wixstatic.com/media/45119e_ec3412f244554ae891a10fd05ca5f046~mv2.png",
      "https://static.wixstatic.com/media/45119e_3739d8e47d514327a9d06409c380df3e~mv2.png",
      "https://static.wixstatic.com/media/45119e_2b69353235bb4f8fbaeb1991246a07f7~mv2.png",
      "https://static.wixstatic.com/media/45119e_f695a00681b64f12906dd30ddec08d8b~mv2.png",
      "https://static.wixstatic.com/media/45119e_09aed7bba2784d2a91c0c659e4883065~mv2.png",
      "https://static.wixstatic.com/media/45119e_974dccbaf5c444f38176c892ac0f8fba~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Mandiles Emplomados",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "0.5 mm Pb frontal",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 46,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_6838885b-359d-4db1-8d15-7e652afa892a",
    "name": "Mandil emplomado Mod SQR, 0.5 mm de plomo, cierre con broche, acabado en Nylon",
    "descriptionHtml": "<p>Mandil emplomado, Mod. SQR,&nbsp;&nbsp; 0.5 mm de plomo,manuf. U.S.A 61 cm de ancho por 96 cm de largo (24”x38” ),cierre con &nbsp;broche, acabado en nylon, peso aprox. 4.5-5 kgs..</p><p>&nbsp;</p><p>Color</p><p>Plata diamante</p><p>Estampado Azul</p><p>Estamapdo de Colores</p><p>Azul diamante</p><p>Verde diamante&nbsp;</p>",
    "plainText": "Mandil emplomado, Mod. SQR, 0.5 mm de plomo,manuf. U.S.A 61 cm de ancho por 96 cm de largo (24”x38” ),cierre con broche, acabado en nylon, peso aprox. 4.5-5 kgs.. Color Plata diamante Estampado Azul Estamapdo de Colores Azul diamante Verde diamante",
    "wixCategories": [
      "protector-radiologia",
      "rayos-x"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 5311,
    "inventory": "IN_STOCK",
    "sku": "",
    "weight": 1,
    "optionName": "Color",
    "optionType": "SWATCH_CHOICES",
    "optionChoices": [
      "#25CA0D:Verde Diamante",
      "#989595:Plateado",
      "#547DAE:Azul Diamante",
      "#395596:Estampado Azul",
      "#BD49DB:Estampado de colores"
    ],
    "variants": [
      {
        "id": "Product_6838885b-359d-4db1-8d15-7e652afa892a-1",
        "label": "Verde Diamante",
        "price": 5311,
        "inventory": "IN_STOCK",
        "sku": "ME-Mo-SQR-V",
        "weight": 5
      },
      {
        "id": "Product_6838885b-359d-4db1-8d15-7e652afa892a-2",
        "label": "Plateado",
        "price": 5311,
        "inventory": "IN_STOCK",
        "sku": "ME-Mo-SQR-P",
        "weight": 5
      },
      {
        "id": "Product_6838885b-359d-4db1-8d15-7e652afa892a-3",
        "label": "Azul Diamante",
        "price": 5311,
        "inventory": "IN_STOCK",
        "sku": "ME-Mo-SQR-A",
        "weight": 5
      },
      {
        "id": "Product_6838885b-359d-4db1-8d15-7e652afa892a-4",
        "label": "Estampado Azul",
        "price": 5311,
        "inventory": "IN_STOCK",
        "sku": "ME-Mo-SQR-EA",
        "weight": 5
      },
      {
        "id": "Product_6838885b-359d-4db1-8d15-7e652afa892a-5",
        "label": "Estampado de colores",
        "price": 5311,
        "inventory": "IN_STOCK",
        "sku": "ME-Mo-SQR-EC",
        "weight": 5
      }
    ],
    "media": [
      "https://static.wixstatic.com/media/45119e_ca77e9093e4c4eafbae473bebe6a7959~mv2.png",
      "https://static.wixstatic.com/media/45119e_6c365eca52fb42398a0fdf812b70c2a8~mv2.png",
      "https://static.wixstatic.com/media/45119e_00d866fd2796417ea8b1ebdc53ec0a93~mv2.png",
      "https://static.wixstatic.com/media/45119e_b1a988f4129e459a81578df64e360dcb~mv2.png",
      "https://static.wixstatic.com/media/45119e_e5a8d544c3b0436cbc75e08bc29e9a0f~mv2.png",
      "https://static.wixstatic.com/media/45119e_2b69353235bb4f8fbaeb1991246a07f7~mv2.png",
      "https://static.wixstatic.com/media/45119e_77d8cf0fa0704e4d9c5d63e5100de164~mv2.png",
      "https://static.wixstatic.com/media/45119e_f695a00681b64f12906dd30ddec08d8b~mv2.png",
      "https://static.wixstatic.com/media/45119e_8e4d3bde3100446f9dc4f5f8766fbc38~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Mandiles Emplomados",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "0.5 mm Pb frontal",
    "saleMode": "both",
    "rating": 4.8,
    "reviewCount": 53,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_9753d4a5-e0f7-4966-a8da-3c6881f50cf8",
    "name": "Conjunto de Chaleco y Faldon emplomados, cierre con velcro acabado en Nylon",
    "descriptionHtml": "<p>Chaleco-falda emplomados;</p><p>Chaleco: &nbsp;0.5 mm de plomo al frente y 0.3 mm espalda,</p><p>falda; 0.3 mm de plomo al frente y 0.3mm. espalda.</p><p>Cierre con velcro, en nylon, MEDIANO.</p><p>Medidas aprox. de chaleco 45 cms ancho, 58 altura,extendido 116 cms ancho.FALDON 40-62 cms ancho, 53 cms&nbsp; altura,&nbsp; extendido 160 cms. en nylon, manuf. U.S.A.&nbsp;</p>",
    "plainText": "Chaleco-falda emplomados; Chaleco: 0.5 mm de plomo al frente y 0.3 mm espalda, falda; 0.3 mm de plomo al frente y 0.3mm. espalda. Cierre con velcro, en nylon, MEDIANO. Medidas aprox. de chaleco 45 cms ancho, 58 altura,extendido 116 cms ancho.FALDON 40-62 cms ancho, 53 cms altura, extendido 160 cms. en nylon, manuf. U.S.A.",
    "wixCategories": [
      "protector-radiologia",
      "rayos-x"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 14384,
    "inventory": "IN_STOCK",
    "sku": "ME-Mo.CyF",
    "weight": 10,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_32ed9f53c70740d09d5c176e774244a0~mv2.png",
      "https://static.wixstatic.com/media/45119e_a2ed865a058f459c8966cf7ec7d92b6f~mv2.png",
      "https://static.wixstatic.com/media/45119e_8af5f6934ad24ae0afd5295398b4c0f5~mv2.png",
      "https://static.wixstatic.com/media/45119e_0ae607b3bb824e4ba782c522339b743f~mv2.png",
      "https://static.wixstatic.com/media/45119e_91b3c587978d4978b832b6919737ee9f~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Mandiles Emplomados",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "0.5 mm Pb frontal",
    "saleMode": "both",
    "rating": 4.9,
    "reviewCount": 60,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  },
  {
    "id": "Product_c6036809-5c8c-451b-b433-42090fb5643a",
    "name": "Mandil Emplomado FB, 0.5mm de plomo, con resorte en la espalda, cierre de velcro",
    "descriptionHtml": "<p>Mandil emplomado Mod. FB, 0.5 mm de plomo,&nbsp; resorte en parte espalda media, para una mejor distribución del peso, cierre con velcro al frente en la cintura, acabado en nylon,manuf. U.S.A</p>",
    "plainText": "Mandil emplomado Mod. FB, 0.5 mm de plomo, resorte en parte espalda media, para una mejor distribución del peso, cierre con velcro al frente en la cintura, acabado en nylon,manuf. U.S.A",
    "wixCategories": [
      "protector-radiologia",
      "rayos-x"
    ],
    "ribbon": "",
    "brand": "ARXEM",
    "basePrice": 8528,
    "inventory": "IN_STOCK",
    "sku": "ME-Mo-FB",
    "weight": 5,
    "optionName": "",
    "optionType": "",
    "optionChoices": [],
    "variants": [],
    "media": [
      "https://static.wixstatic.com/media/45119e_51466a0bc5a94c4da1b50367a3b762bc~mv2.png",
      "https://static.wixstatic.com/media/45119e_70b911f08e6d472eaf0dce2aabc41c7b~mv2.png",
      "https://static.wixstatic.com/media/45119e_0ea5a322ec7c4fe6891eb236d4662443~mv2.png",
      "https://static.wixstatic.com/media/45119e_bc8677c41be040aeabfc28a1a690c4e1~mv2.png",
      "https://static.wixstatic.com/media/45119e_c261bb52606640b181c92fed2b83d3c8~mv2.png"
    ],
    "masterCategory": "Protección Radiológica",
    "subcategory": "Mandiles Emplomados",
    "storePillar": "catalogo-general",
    "sectors": [
      "clinicas",
      "dentistas",
      "veterinarias",
      "laboratorios"
    ],
    "leadEquivalency": "0.5 mm Pb frontal",
    "saleMode": "both",
    "rating": 5,
    "reviewCount": 19,
    "normCompliance": "NOM-229-SSA1-2002 / COFEPRIS"
  }
];
