import {
  CATALOG_PRODUCTS,
  type CatalogProduct,
  type ProductVariant
} from '../data/catalogData.js';

export type FeedFormat = 'xml' | 'csv' | 'tsv';
export type FeedMarketplace = 'facebook' | 'google';

export interface CatalogFeedItem {
  id: string;
  item_group_id: string;
  title: string;
  description: string;
  availability: 'in stock' | 'out of stock';
  condition: 'new';
  price: string;
  link: string;
  image_link: string;
  additional_image_links: string[];
  brand: string;
  mpn: string;
  identifier_exists: 'yes' | 'no';
  product_type: string;
  google_product_category: string;
  shipping_weight: string;
}

export interface GenerateFeedOptions {
  baseUrl: string;
  format?: FeedFormat;
  marketplace?: FeedMarketplace;
  expandVariants?: boolean;
  upstreamOverrides?: Map<string, Partial<CatalogFeedItem>>;
}

export interface GeneratedFeedResult {
  body: string;
  contentType: string;
  filename: string;
  itemCount: number;
  items: CatalogFeedItem[];
}

const UPPERCASE_PRESERVE_TOKENS = new Set([
  'ARXEM',
  'COFEPRIS',
  'NOM-229',
  'NOM-229-SSA1',
  'NOM-229-SSA1-2002',
  'TENS',
  'EMS',
  'DXA',
  'FUJI',
  'CBCT',
  'RX',
  'CT',
  'LED',
  'UV',
  'USA',
  'XL',
  'SV',
  'FB',
  'HR-U',
  '100H',
  '600',
  '400'
]);

const LOWERCASE_CONNECTORS = new Set([
  'de',
  'del',
  'y',
  'con',
  'para',
  'en',
  'a',
  'el',
  'la',
  'los',
  'las',
  'por',
  'sin'
]);

function stripHtmlTags(raw: string): string {
  return raw
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeTitle(raw: string): string {
  const cleaned = stripHtmlTags(raw);
  if (!cleaned) return 'Producto Radiológico ARXEM';

  const letters = cleaned.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑüÜ]/g, '');
  const isAllUpper = letters.length > 10 && cleaned === cleaned.toUpperCase();
  if (!isAllUpper) return cleaned;

  return cleaned
    .split(/\s+/)
    .map((word, idx) => {
      const bare = word.replace(/[.,;:()"]/g, '');
      const upperBare = bare.toUpperCase();
      if (UPPERCASE_PRESERVE_TOKENS.has(upperBare)) {
        return word;
      }
      if (upperBare === 'PB') {
        return word.replace(/pb/i, 'Pb');
      }
      const lower = word.toLowerCase();
      if (idx > 0 && LOWERCASE_CONNECTORS.has(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

function normalizeAvailability(
  inventory: string | undefined | null
): 'in stock' | 'out of stock' {
  const val = (inventory ?? '').trim().toUpperCase();
  if (!val || val === 'OUT_OF_STOCK' || val === 'OUT OF STOCK' || val === 'FALSE') {
    return 'out of stock';
  }
  const parsed = Number(val);
  if (!Number.isNaN(parsed)) {
    return parsed > 0 ? 'in stock' : 'out of stock';
  }
  return 'in stock';
}

function normalizeBrand(rawBrand: string | undefined | null): string {
  const trimmed = (rawBrand ?? '').trim();
  if (!trimmed || trimmed.toLowerCase() === 'arxem') {
    return 'ARXEM';
  }
  return trimmed;
}

function formatPriceMXN(price: number): string {
  const safePrice = Number.isFinite(price) && price > 0 ? price : 0;
  return `${safePrice.toFixed(2)} MXN`;
}

function normalizeUpstreamPrice(rawPrice: string): string | undefined {
  const cleaned = rawPrice.replace(/,/g, '').trim();
  const match = cleaned.match(/(\d+(?:\.\d+)?)/);
  if (!match) return undefined;
  const num = Number(match[1]);
  if (!Number.isFinite(num) || num <= 0) return undefined;
  const currencyMatch = cleaned.match(/\b([A-Z]{3})\b/);
  const currency = currencyMatch ? currencyMatch[1] : 'MXN';
  return `${num.toFixed(2)} ${currency}`;
}

function resolveAbsoluteUrl(url: string, baseUrl: string): string {
  const trimmed = (url ?? '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${cleanBase}${cleanPath}`;
}

function buildDescription(
  product: CatalogProduct,
  cleanTitle: string,
  variant?: ProductVariant
): string {
  const rawPlain = stripHtmlTags(product.plainText || product.descriptionHtml || '');
  const parts: string[] = [];

  if (rawPlain) {
    parts.push(rawPlain.endsWith('.') ? rawPlain : `${rawPlain}.`);
  }

  if (rawPlain.length < 60) {
    const variantPart = variant ? ` Medida/Opción: ${variant.label}.` : '';
    const leadPart = product.leadEquivalency
      ? ` Atenuación certificada: ${product.leadEquivalency}.`
      : '';
    const normPart = product.normCompliance
      ? ` Cumple ${product.normCompliance}.`
      : '';
    parts.push(
      `${cleanTitle}.${variantPart} Categoría: ${product.masterCategory} - ${product.subcategory}.${leadPart}${normPart} Distribución y envíos en todo México por ARXEM Radiología.`
    );
  } else if (variant) {
    parts.push(`Variante seleccionada: ${variant.label}.`);
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim().slice(0, 4500);
}

/**
 * Generates the canonical URL slug for a catalog product.
 * Strips the leading "Product_" prefix before slicing the 8-char UUID discriminator
 * so every product resolves to a unique URL.
 */
export function slugifyProduct(
  product: Pick<CatalogProduct, 'id' | 'name'>
): string {
  const base = product.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const shortId = product.id.replace(/^Product_/i, '').slice(0, 8);
  return `${base || 'producto'}-${shortId}`;
}

/**
 * Builds the frontend path for a product monograph (and optional variant deep link).
 */
export function buildProductPath(
  product: Pick<CatalogProduct, 'id' | 'name'>,
  variantId?: string | null
): string {
  const slug = slugifyProduct(product);
  if (variantId) {
    return `/producto/${slug}?variant=${encodeURIComponent(variantId)}`;
  }
  return `/producto/${slug}`;
}

/**
 * Returns the exact `id` used in the Meta / Google catalog feed so Meta Pixel
 * `content_ids` events (`ViewContent`, `AddToCart`, `InitiateCheckout`, `Lead`)
 * match the feed 1:1.
 */
export function getCatalogContentId(
  product: Pick<CatalogProduct, 'id' | 'variants'>,
  variantOrLabel?: ProductVariant | string | null
): string {
  if (variantOrLabel && typeof variantOrLabel === 'object' && 'id' in variantOrLabel) {
    if (variantOrLabel.id) return variantOrLabel.id;
  }

  if (typeof variantOrLabel === 'string' && variantOrLabel.trim()) {
    const target = variantOrLabel.trim();
    const matched = product.variants.find(
      (v) => v.id === target || v.label === target
    );
    if (matched) return matched.id;
  }

  if (product.variants && product.variants.length > 0) {
    return product.variants[0].id;
  }

  return product.id;
}

/**
 * Parses a remote Wix catalog TSV (`WIX_UPSTREAM_FEED_URL`) into an ID-indexed
 * map of live price/availability/field overrides.
 */
export function parseUpstreamTsvOverrides(
  tsvText: string
): Map<string, Partial<CatalogFeedItem>> {
  const map = new Map<string, Partial<CatalogFeedItem>>();
  const lines = tsvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return map;

  const headers = lines[0].split('\t').map((h) => h.trim().toLowerCase());
  const idx = (name: string) => headers.indexOf(name);

  const idCol = idx('id');
  if (idCol === -1) return map;

  const titleCol = idx('title');
  const descCol = idx('description');
  const availCol = idx('availability');
  const priceCol = idx('price');
  const imageCol = idx('image_link');
  const brandCol = idx('brand');
  const mpnCol = idx('mpn');

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    const itemId = (cols[idCol] ?? '').trim();
    if (!itemId) continue;

    const override: Partial<CatalogFeedItem> = {};
    if (titleCol !== -1 && cols[titleCol]?.trim()) {
      override.title = cols[titleCol].trim();
    }
    if (descCol !== -1 && cols[descCol]?.trim()) {
      override.description = cols[descCol].trim();
    }
    if (availCol !== -1 && cols[availCol]?.trim()) {
      const av = cols[availCol].trim().toLowerCase();
      if (av === 'out of stock' || av === 'out_of_stock') {
        override.availability = 'out of stock';
      } else if (av === 'in stock' || av === 'in_stock' || av === 'available for order') {
        override.availability = 'in stock';
      }
    }
    if (priceCol !== -1 && cols[priceCol]?.trim()) {
      const normalizedPrice = normalizeUpstreamPrice(cols[priceCol]);
      if (normalizedPrice) override.price = normalizedPrice;
    }
    if (imageCol !== -1 && cols[imageCol]?.trim()) {
      override.image_link = cols[imageCol].trim();
    }
    if (brandCol !== -1 && cols[brandCol]?.trim()) {
      override.brand = normalizeBrand(cols[brandCol]);
    }
    if (mpnCol !== -1 && cols[mpnCol]?.trim()) {
      override.mpn = cols[mpnCol].trim();
      override.identifier_exists = 'yes';
    }

    map.set(itemId, override);
  }

  return map;
}

/**
 * Builds the flat list of normalized catalog items from `CATALOG_PRODUCTS`,
 * optionally merged with live upstream overrides.
 */
export function buildCatalogFeedItems({
  baseUrl,
  expandVariants = true,
  upstreamOverrides
}: {
  baseUrl: string;
  expandVariants?: boolean;
  upstreamOverrides?: Map<string, Partial<CatalogFeedItem>>;
}): CatalogFeedItem[] {
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
  const items: CatalogFeedItem[] = [];

  for (const product of CATALOG_PRODUCTS) {
    const cleanName = normalizeTitle(product.name);
    const brand = normalizeBrand(product.brand);
    const allMedia = product.media
      .map((url) => resolveAbsoluteUrl(url, cleanBaseUrl))
      .filter(Boolean);
    const mainImage = allMedia[0] || `${cleanBaseUrl}/arxem-logo.png`;
    const extraImages = allMedia.slice(1, 10);
    const productType = `${product.masterCategory} > ${product.subcategory}`;

    const emitItem = (variant?: ProductVariant) => {
      const id = variant ? variant.id : product.id;
      const itemGroupId = variant ? product.id : '';
      const rawTitle = variant ? `${cleanName} - ${variant.label}` : cleanName;
      const rawPrice = variant ? variant.price : product.basePrice;
      const rawInv = variant ? variant.inventory : product.inventory;
      const rawSku = (variant?.sku || product.sku || '').trim();
      const weight = variant?.weight || product.weight || 1;
      const link = `${cleanBaseUrl}${buildProductPath(
        product,
        variant ? variant.id : undefined
      )}`;

      const baseItem: CatalogFeedItem = {
        id,
        item_group_id: itemGroupId,
        title: rawTitle.slice(0, 150),
        description: buildDescription(product, cleanName, variant),
        availability: normalizeAvailability(rawInv),
        condition: 'new',
        price: formatPriceMXN(rawPrice),
        link,
        image_link: mainImage,
        additional_image_links: extraImages,
        brand,
        mpn: rawSku,
        identifier_exists: rawSku ? 'yes' : 'no',
        product_type: productType,
        google_product_category: 'Health & Beauty > Health Care',
        shipping_weight: `${Number(weight) || 1} kg`
      };

      const override = upstreamOverrides?.get(id);
      if (override) {
        items.push({
          ...baseItem,
          ...override,
          // Always enforce our canonical Vercel domain product link
          link: baseItem.link
        });
      } else {
        items.push(baseItem);
      }
    };

    if (expandVariants && product.variants && product.variants.length > 0) {
      for (const variant of product.variants) {
        emitItem(variant);
      }
    } else {
      emitItem(undefined);
    }
  }

  return items;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function serializeFeedXml(
  items: CatalogFeedItem[],
  baseUrl: string,
  marketplace: FeedMarketplace
): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const feedTitle =
    marketplace === 'google'
      ? 'ARXEM Radiología - Google Merchant Catalog Feed'
      : 'ARXEM Radiología - Meta Commerce Catalog Feed';

  const xmlItems = items
    .map((item) => {
      const lines: string[] = [
        '    <item>',
        `      <g:id>${escapeXml(item.id)}</g:id>`
      ];

      if (item.item_group_id) {
        lines.push(`      <g:item_group_id>${escapeXml(item.item_group_id)}</g:item_group_id>`);
      }

      lines.push(
        `      <g:title>${escapeXml(item.title)}</g:title>`,
        `      <g:description>${escapeXml(item.description)}</g:description>`,
        `      <g:availability>${escapeXml(item.availability)}</g:availability>`,
        `      <g:condition>${escapeXml(item.condition)}</g:condition>`,
        `      <g:price>${escapeXml(item.price)}</g:price>`,
        `      <g:link>${escapeXml(item.link)}</g:link>`,
        `      <g:image_link>${escapeXml(item.image_link)}</g:image_link>`
      );

      for (const extraImg of item.additional_image_links) {
        lines.push(
          `      <g:additional_image_link>${escapeXml(extraImg)}</g:additional_image_link>`
        );
      }

      lines.push(`      <g:brand>${escapeXml(item.brand)}</g:brand>`);

      if (item.mpn) {
        lines.push(`      <g:mpn>${escapeXml(item.mpn)}</g:mpn>`);
      }

      lines.push(
        `      <g:identifier_exists>${escapeXml(item.identifier_exists)}</g:identifier_exists>`,
        `      <g:product_type>${escapeXml(item.product_type)}</g:product_type>`,
        `      <g:google_product_category>${escapeXml(item.google_product_category)}</g:google_product_category>`,
        `      <g:shipping_weight>${escapeXml(item.shipping_weight)}</g:shipping_weight>`,
        '    </item>'
      );

      return lines.join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">',
    '  <channel>',
    `    <title>${escapeXml(feedTitle)}</title>`,
    `    <link>${escapeXml(cleanBase)}</link>`,
    `    <description>${escapeXml('Catálogo oficial dinámico de ARXEM Radiología en Blindaje, Vidrio Emplomado, Protección y Equipos Médicos.')}</description>`,
    xmlItems,
    '  </channel>',
    '</rss>'
  ].join('\n');
}

const TABULAR_HEADERS = [
  'id',
  'item_group_id',
  'title',
  'description',
  'availability',
  'condition',
  'price',
  'link',
  'image_link',
  'additional_image_link',
  'brand',
  'mpn',
  'identifier_exists',
  'product_type',
  'google_product_category',
  'shipping_weight'
] as const;

function itemToRowCells(item: CatalogFeedItem): string[] {
  return [
    item.id,
    item.item_group_id,
    item.title,
    item.description,
    item.availability,
    item.condition,
    item.price,
    item.link,
    item.image_link,
    item.additional_image_links.join(','),
    item.brand,
    item.mpn,
    item.identifier_exists,
    item.product_type,
    item.google_product_category,
    item.shipping_weight
  ];
}

function escapeCsvCell(value: string): string {
  const clean = value.replace(/\r?\n|\r/g, ' ').trim();
  if (/[",]/.test(clean)) {
    return `"${clean.replace(/"/g, '""')}"`;
  }
  return clean;
}

function serializeFeedCsv(items: CatalogFeedItem[]): string {
  const rows = [
    TABULAR_HEADERS.join(','),
    ...items.map((item) => itemToRowCells(item).map(escapeCsvCell).join(','))
  ];
  return rows.join('\n');
}

function sanitizeTsvCell(value: string): string {
  return value.replace(/[\t\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function serializeFeedTsv(items: CatalogFeedItem[]): string {
  const rows = [
    TABULAR_HEADERS.join('\t'),
    ...items.map((item) => itemToRowCells(item).map(sanitizeTsvCell).join('\t'))
  ];
  return rows.join('\n');
}

/**
 * Generates a Meta Commerce or Google Merchant catalog feed in XML, CSV, or TSV format.
 */
export function generateCatalogFeed({
  baseUrl,
  format = 'xml',
  marketplace = 'facebook',
  expandVariants = true,
  upstreamOverrides
}: GenerateFeedOptions): GeneratedFeedResult {
  const items = buildCatalogFeedItems({
    baseUrl,
    expandVariants,
    upstreamOverrides
  });

  const prefix = marketplace === 'google' ? 'merchant' : 'meta';

  if (format === 'csv') {
    return {
      body: serializeFeedCsv(items),
      contentType: 'text/csv; charset=utf-8',
      filename: `${prefix}-catalog.csv`,
      itemCount: items.length,
      items
    };
  }

  if (format === 'tsv') {
    return {
      body: serializeFeedTsv(items),
      contentType: 'text/tab-separated-values; charset=utf-8',
      filename: `${prefix}-catalog.tsv`,
      itemCount: items.length,
      items
    };
  }

  return {
    body: serializeFeedXml(items, baseUrl, marketplace),
    contentType: 'application/xml; charset=utf-8',
    filename: `${prefix}-catalog.xml`,
    itemCount: items.length,
    items
  };
}
