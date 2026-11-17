import path from 'path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import {
  generateCatalogFeed,
  type FeedFormat,
  type FeedMarketplace
} from './src/lib/catalogFeed'

function arxemCatalogFeedPlugin(): Plugin {
  const attachFeedMiddleware = (middlewares: {
    use: (
      handler: (
        req: {
          url?: string
          method?: string
          headers: Record<string, string | string[] | undefined>
        },
        res: {
          statusCode: number
          setHeader: (name: string, value: string) => void
          end: (chunk?: string) => void
        },
        next: () => void
      ) => void
    ) => void
  }) => {
    middlewares.use((req, res, next) => {
      const parsed = new URL(req.url || '/', 'http://localhost:5173')
      const pathname = parsed.pathname.toLowerCase()

      if (pathname !== '/api/feed' && !pathname.startsWith('/catalog-feed/')) {
        next()
        return
      }

      const fwdHost = req.headers['x-forwarded-host']
      const hostHdr = req.headers.host
      const rawHost =
        (Array.isArray(fwdHost) ? fwdHost[0] : fwdHost) ||
        (Array.isArray(hostHdr) ? hostHdr[0] : hostHdr) ||
        'localhost:5173'
      const proto =
        rawHost.startsWith('localhost') || rawHost.startsWith('127.')
          ? 'http'
          : 'https'
      const domainParam = parsed.searchParams.get('domain')
      const baseUrl =
        domainParam && /^https?:\/\//i.test(domainParam)
          ? domainParam.replace(/\/+$/, '')
          : `${proto}://${rawHost}`

      const mpParam = parsed.searchParams.get('marketplace')?.toLowerCase() ?? ''
      const marketplace: FeedMarketplace =
        mpParam === 'google' ||
        mpParam === 'merchant' ||
        pathname.includes('merchant')
          ? 'google'
          : 'facebook'

      const fmtParam = parsed.searchParams.get('format')?.toLowerCase() ?? ''
      let format: FeedFormat = marketplace === 'google' ? 'tsv' : 'xml'
      if (fmtParam === 'csv' || pathname.endsWith('.csv')) format = 'csv'
      else if (fmtParam === 'tsv' || pathname.endsWith('.tsv')) format = 'tsv'
      else if (fmtParam === 'xml' || pathname.endsWith('.xml')) format = 'xml'

      const expandVariants = parsed.searchParams.get('variants') !== 'false'

      const result = generateCatalogFeed({
        baseUrl,
        format,
        marketplace,
        expandVariants
      })

      res.statusCode = 200
      res.setHeader('Content-Type', result.contentType)
      res.setHeader(
        'Cache-Control',
        'no-store, no-cache, max-age=0, must-revalidate'
      )
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('X-Feed-Items', String(result.itemCount))
      res.end(req.method === 'HEAD' ? '' : result.body)
    })
  }

  return {
    name: 'arxem-catalog-feed',
    configureServer(server) {
      attachFeedMiddleware(server.middlewares)
    },
    configurePreviewServer(server) {
      attachFeedMiddleware(server.middlewares)
    }
  }
}

export default defineConfig({
  plugins: [react(), arxemCatalogFeedPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true
  }
})
