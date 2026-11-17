import {
  generateCatalogFeed,
  parseUpstreamTsvOverrides,
  type FeedFormat,
  type FeedMarketplace
} from '../src/lib/catalogFeed.js';

interface FeedRequest {
  url?: string;
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
}

interface FeedResponse {
  statusCode: number;
  setHeader(name: string, value: string): unknown;
  end(chunk?: string): unknown;
}

function getHeader(
  headers: Record<string, string | string[] | undefined> | undefined,
  key: string
): string {
  const val = headers?.[key] ?? headers?.[key.toLowerCase()];
  if (Array.isArray(val)) return val[0] ?? '';
  return val ?? '';
}

function getEnv(name: string): string {
  const proc = (
    globalThis as unknown as {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process;
  return proc?.env?.[name]?.trim() ?? '';
}

function getParam(
  req: FeedRequest,
  searchParams: URLSearchParams,
  key: string
): string {
  const qVal = req.query?.[key];
  if (Array.isArray(qVal) && qVal[0]) return qVal[0];
  if (typeof qVal === 'string' && qVal) return qVal;
  return searchParams.get(key) ?? '';
}

function resolveBaseUrl(
  req: FeedRequest,
  searchParams: URLSearchParams
): string {
  const explicitDomain = getParam(req, searchParams, 'domain').trim();
  if (/^https?:\/\//i.test(explicitDomain)) {
    return explicitDomain.replace(/\/+$/, '');
  }

  const envSiteUrl = getEnv('SITE_URL') || getEnv('PUBLIC_SITE_URL');
  if (/^https?:\/\//i.test(envSiteUrl)) {
    return envSiteUrl.replace(/\/+$/, '');
  }

  const host =
    getHeader(req.headers, 'x-forwarded-host') ||
    getHeader(req.headers, 'host') ||
    getEnv('VERCEL_URL') ||
    'arxem.vercel.app';

  const cleanHost = host.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
  const forwardedProto = getHeader(req.headers, 'x-forwarded-proto')
    .split(',')[0]
    .trim();
  const isLocal =
    cleanHost.startsWith('localhost') || cleanHost.startsWith('127.');
  const proto = forwardedProto || (isLocal ? 'http' : 'https');

  return `${proto}://${cleanHost}`;
}

export default async function handler(req: FeedRequest, res: FeedResponse) {
  try {
    const rawHost =
      getHeader(req.headers, 'x-forwarded-host') ||
      getHeader(req.headers, 'host') ||
      'arxem.vercel.app';
    const tempOrigin = `https://${rawHost}`;
    const parsedUrl = new URL(req.url || '/api/feed', tempOrigin);
    const searchParams = parsedUrl.searchParams;
    const pathname = parsedUrl.pathname.toLowerCase();

    const baseUrl = resolveBaseUrl(req, searchParams);

    const mpParam = getParam(req, searchParams, 'marketplace').toLowerCase();
    const marketplace: FeedMarketplace =
      mpParam === 'google' ||
      mpParam === 'merchant' ||
      pathname.includes('merchant')
        ? 'google'
        : 'facebook';

    const fmtParam = getParam(req, searchParams, 'format').toLowerCase();
    let format: FeedFormat = marketplace === 'google' ? 'tsv' : 'xml';
    if (fmtParam === 'csv' || pathname.endsWith('.csv')) {
      format = 'csv';
    } else if (fmtParam === 'tsv' || pathname.endsWith('.tsv')) {
      format = 'tsv';
    } else if (fmtParam === 'xml' || pathname.endsWith('.xml')) {
      format = 'xml';
    }

    const expandVariants = getParam(req, searchParams, 'variants') !== 'false';

    // Optional live Wix upstream hydration when WIX_UPSTREAM_FEED_URL is set
    let upstreamOverrides;
    const upstreamUrl = getEnv('WIX_UPSTREAM_FEED_URL');
    if (upstreamUrl && typeof fetch === 'function') {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      try {
        const upstreamRes = await fetch(upstreamUrl, {
          signal: controller.signal,
          headers: { Accept: 'text/tab-separated-values, text/plain, */*' }
        });
        if (upstreamRes.ok) {
          const tsvText = await upstreamRes.text();
          upstreamOverrides = parseUpstreamTsvOverrides(tsvText);
        }
      } catch {
        // Fallback gracefully to bundled CATALOG_PRODUCTS on timeout/network failure
      } finally {
        clearTimeout(timeoutId);
      }
    }

    const result = generateCatalogFeed({
      baseUrl,
      format,
      marketplace,
      expandVariants,
      upstreamOverrides
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', result.contentType);
    res.setHeader(
      'Cache-Control',
      'no-store, no-cache, max-age=0, must-revalidate'
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Feed-Items', String(result.itemCount));

    if (req.method === 'HEAD') {
      res.end('');
      return;
    }

    res.end(result.body);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(
      JSON.stringify({
        error: 'Feed generation failed',
        message: err instanceof Error ? err.message : 'Unknown error'
      })
    );
  }
}
