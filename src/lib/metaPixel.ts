import type { CatalogProduct, ProductVariant } from '../data/catalogData';
import { getCatalogContentId } from './catalogFeed';

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

let pixelInitialized = false;

function ensureMetaPixel(): FbqFn | undefined {
  if (typeof window === 'undefined') return undefined;

  if (typeof window.fbq === 'function') {
    return window.fbq;
  }

  const pixelId = (
    (import.meta as unknown as { env?: Record<string, string | undefined> }).env
      ?.VITE_META_PIXEL_ID ?? ''
  ).trim();

  if (!pixelId || pixelInitialized) {
    return window.fbq;
  }

  pixelInitialized = true;

  const fbqStub: FbqFn = function (...args: unknown[]) {
    if (fbqStub.callMethod) {
      fbqStub.callMethod(...args);
    } else {
      fbqStub.queue?.push(args);
    }
  };
  fbqStub.queue = [];
  fbqStub.loaded = true;
  fbqStub.version = '2.0';
  fbqStub.push = (...args: unknown[]) => fbqStub(...args);

  window.fbq = fbqStub;
  if (!window._fbq) window._fbq = fbqStub;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  fbqStub('init', pixelId);
  return fbqStub;
}

function dispatchPixelEvent(
  eventName: string,
  payload?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return;

  const fbq = ensureMetaPixel();
  if (fbq) {
    if (payload) {
      fbq('track', eventName, payload);
    } else {
      fbq('track', eventName);
    }
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: `meta_${eventName}`,
      ...(payload ?? {})
    });
  }
}

export function trackPageView() {
  dispatchPixelEvent('PageView');
}

export function trackViewContent(
  product: CatalogProduct,
  variant?: ProductVariant | string | null
) {
  const contentId = getCatalogContentId(product, variant);
  const variantObj =
    variant && typeof variant === 'object'
      ? variant
      : typeof variant === 'string'
      ? product.variants.find((v) => v.id === variant || v.label === variant)
      : product.variants[0];

  const price = variantObj?.price ?? product.basePrice;
  const contentName = variantObj
    ? `${product.name} - ${variantObj.label}`
    : product.name;

  dispatchPixelEvent('ViewContent', {
    content_ids: [contentId],
    content_name: contentName,
    content_category: product.masterCategory,
    content_type: 'product',
    value: Number(price) || 0,
    currency: 'MXN'
  });
}

export function trackAddToCart(
  product: CatalogProduct,
  variantOrLabel?: ProductVariant | string | null,
  unitPrice?: number,
  quantity = 1
) {
  const contentId = getCatalogContentId(product, variantOrLabel);
  const resolvedVariant =
    variantOrLabel && typeof variantOrLabel === 'object'
      ? variantOrLabel
      : typeof variantOrLabel === 'string'
      ? product.variants.find(
          (v) => v.id === variantOrLabel || v.label === variantOrLabel
        )
      : product.variants[0];

  const unit = unitPrice ?? resolvedVariant?.price ?? product.basePrice;

  dispatchPixelEvent('AddToCart', {
    content_ids: [contentId],
    content_name: resolvedVariant
      ? `${product.name} - ${resolvedVariant.label}`
      : product.name,
    content_category: product.masterCategory,
    content_type: 'product',
    contents: [{ id: contentId, quantity }],
    value: Number((unit * quantity).toFixed(2)),
    currency: 'MXN'
  });
}

export function trackInitiateCheckout(
  items: Array<{
    product: CatalogProduct;
    variantLabel: string;
    unitPrice: number;
    quantity: number;
  }>,
  totalMXN: number
) {
  if (items.length === 0) return;

  const contents = items.map((item) => ({
    id: getCatalogContentId(item.product, item.variantLabel),
    quantity: item.quantity,
    item_price: item.unitPrice
  }));

  dispatchPixelEvent('InitiateCheckout', {
    content_ids: contents.map((c) => c.id),
    contents,
    content_type: 'product',
    num_items: items.reduce((acc, item) => acc + item.quantity, 0),
    value: Number(totalMXN.toFixed(2)),
    currency: 'MXN'
  });
}

export function trackLeadQuote(
  product: CatalogProduct,
  variantOrLabel?: ProductVariant | string | null,
  totalMXN?: number
) {
  const contentId = getCatalogContentId(product, variantOrLabel);
  dispatchPixelEvent('Lead', {
    content_ids: [contentId],
    content_name: product.name,
    content_category: product.masterCategory,
    content_type: 'product',
    value: Number((totalMXN ?? product.basePrice).toFixed(2)),
    currency: 'MXN'
  });
}
